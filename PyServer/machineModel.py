import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix


def train_model(csv_path):
    # load the CSV data
    df = pd.read_csv(csv_path)

    # convert the CloseTime column to a datetime object
    df["CloseTime"] = pd.to_datetime(df["CloseTime"])

    # create a new column for the target variable (i.e., the label we want to predict)
    df["Target"] = np.where(df["ClosePrice"].shift(-1) > df["ClosePrice"], 1, 0)

    # drop the last row since it has no target value
    df.drop(df.tail(1).index, inplace=True)

    # set the input features and target variable
    X = df.drop(["Target", "CloseTime"], axis=1)
    y = df["Target"]

    # split the data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # create the random forest classifier
    rf = RandomForestClassifier(n_estimators=100, random_state=42)

    # fit the model on the training data
    rf.fit(X_train, y_train)

    # Evaluate model performance
    y_pred = rf.predict(X_test)
    print(confusion_matrix(y_test, y_pred))
    print(classification_report(y_test, y_pred, zero_division=1))

    return rf


# define the function to make predictions
def make_prediction(current_price, model):
    # create a new dataframe with the current price as the only feature
    new_data = pd.DataFrame({
        "OpenPrice": [current_price],
        "HighPrice": [current_price],
        "LowPrice": [current_price],
        "ClosePrice": [current_price],
        "Volume": [0],
        "QuoteVolume": [0]
    })

    # predict the target value using the model
    prediction = model.predict(new_data)[0]

    # map the prediction to a string
    if prediction == 1:
        return "Buy"
    elif prediction == 0:
        return "Hold"
    else:
        return "Sell"
