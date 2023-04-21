import numpy as np
import pandas as pd
import yfinance as yf
import pandas_ta as ta
from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from keras.models import Sequential, load_model
from keras.layers import LSTM, Dense, Dropout, Bidirectional
from keras.optimizers import Adam
from keras.callbacks import EarlyStopping
import schedule
import time
import datetime
import os
import copy
import pytz
import matplotlib.pyplot as plt
import csv

from Prod.tradeLogging import log_trade
from crypto_trader import trader_function


def download_data(ticker='DOGE-USD', start_date='2023-04-10', end_date='2023-04-15', interval='1m'):
    return yf.download(tickers=ticker, start=start_date, end=end_date, interval=interval)

def add_indicators(data):
    data['RSI'] = ta.rsi(data.Close, length=15)
    data['EMAF'] = ta.ema(data.Close, length=20)
    data['EMAM'] = ta.ema(data.Close, length=100)
    data['EMAS'] = ta.ema(data.Close, length=150)
    macd_indicators = ta.macd(data['Close'])
    data = pd.concat([data, macd_indicators], axis=1)
    bbands = ta.bbands(data.Close)
    data = pd.concat([data, bbands], axis=1)
    stoch = ta.stoch(data.High, data.Low, data.Close)
    data = pd.concat([data, stoch], axis=1)
    data['Target'] = data['Adj Close'].shift(-1)
    data.dropna(inplace=True)
    data.drop(['Volume', 'Close'], axis=1, inplace=True)
    return data

def scale_data(data):
    sc_input = MinMaxScaler(feature_range=(0, 1))
    sc_target = MinMaxScaler(feature_range=(0, 1))

    data_input = data.drop(columns=["Target"])
    data_target = data["Target"]

    data_input_scaled = sc_input.fit_transform(data_input)
    data_target_scaled = sc_target.fit_transform(data_target.values.reshape(-1, 1))

    data_scaled = np.concatenate((data_input_scaled, data_target_scaled), axis=1)
    return data_scaled, sc_input, sc_target

def prepare_data(data_scaled, backcandles=30):
    X = []
    for j in range(data_scaled.shape[1] - 1):
        X.append([data_scaled[i - backcandles:i, j] for i in range(backcandles, data_scaled.shape[0])])
    X = np.moveaxis(X, [0], [2])

    y = data_scaled[backcandles:, -1]
    y = y.reshape((len(y), 1))

    return X, y

def create_model(input_shape):
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=input_shape))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50))
    model.add(Dropout(0.2))
    model.add(Dense(units=1))
    model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mape'])
    return model


def calculate_mape(y_true, y_pred):
    y_pred, y_true = np.array(y_pred), np.array(y_true)
    mape = np.mean(np.abs((y_true-y_pred) / y_true))*100
    return mape

def train_and_evaluate_model(model, X_train, y_train, X_test, y_test, model_path='model.h5'):
    # if os.path.exists(model_path):
    #     print("Loading existing model...")
    #     model = load_model(model_path)
    # else:
    print("Training new model...")
    adam = Adam()
    model.compile(optimizer=adam, loss='mse')
    model.fit(x=X_train, y=y_train, batch_size=32, epochs=50, shuffle=True, validation_split=0.1)
    model.save(model_path)

    y_pred = model.predict(X_test)
    mape = calculate_mape(y_test, y_pred)
    print(str(mape) + "% difference")

    return model, mape


def plot_predictions(y_test, y_pred):
    plt.figure(figsize=(16, 8))
    plt.plot(y_test, color='black', label='Test')
    plt.plot(y_pred, color='green', label='pred')
    plt.legend()
    plt.show()

def predict_and_trade(model, sc_input, sc_target, backcandles=60):
    local_sc_input = copy.deepcopy(sc_input)
    current_data = yf.download(tickers='DOGE-USD', period='1d', interval='1m')

    current_data = add_indicators(current_data)
    current_data = current_data.drop(columns=['Target'])  # Remove the 'Target' column
    current_data_scaled = local_sc_input.transform(current_data)

    X_pred = []
    for j in range(current_data_scaled.shape[1]):
        X_pred.append(current_data_scaled[-backcandles:, j])
    X_pred = np.array(X_pred)
    X_pred = X_pred.reshape((1, backcandles, current_data_scaled.shape[1]))

    prediction = model.predict(X_pred)
    prediction_unscaled = sc_target.inverse_transform(prediction)

    actual_price = current_data.iloc[-1]['Adj Close']
    current_timestamp = datetime.datetime.now()
    pst = pytz.timezone('America/Los_Angeles')
    current_timestamp_pst = current_timestamp.astimezone(pst)
    formatted_timestamp = current_timestamp_pst.strftime('%m/%d/%Y %I:%M %p')

    print(f'{formatted_timestamp} PST - Predicted price: ${prediction_unscaled[0][0]}, Actual price: ${actual_price}')

    return prediction_unscaled, actual_price


def run_every_10_seconds(model, sc_input, sc_target):
    while True:
        predictedPrice, actualPrice = predict_and_trade(model, sc_input, sc_target)
        current_timestamp = datetime.datetime.now()
        pst = pytz.timezone('America/Los_Angeles')
        current_timestamp_pst = current_timestamp.astimezone(pst)
        formatted_timestamp = current_timestamp_pst.strftime('%m/%d/%Y %I:%M %p')

        asset = 'DOGE-USD'
        action = None
        amount = 10

        if actualPrice > predictedPrice:
            action = "sell"
            trader_function('doge', action, amount)
        elif actualPrice < predictedPrice:
            action = "buy"
            trader_function('doge', action, amount)

        if action is not None:
            log_trade(asset, predictedPrice, actualPrice, action, amount, formatted_timestamp)

        time.sleep(60)  # Sleep for 60 seconds

