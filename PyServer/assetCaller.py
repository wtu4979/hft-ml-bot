import yfinance as yf
import dummyValues


def getLatestValue_Old(name):
    tickers = [name]
    for ticker in tickers:
        ticker_yahoo = yf.Ticker(ticker)
        data = ticker_yahoo.history()
        last_quote = data['Close'].iloc[-1]
        # transactions.sell()
        return ticker, last_quote, dummyValues.cashAmount


def getCurrentValue(name):
    tickers = [name]
    for ticker in tickers:
        ticker_yahoo = yf.Ticker(ticker)
        data = ticker_yahoo.history()
        last_quote = data['Close'].iloc[-1]
        return last_quote
