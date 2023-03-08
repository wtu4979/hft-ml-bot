import pandas as pd
import requests
import time as t

def get_crypto_data(symbol):
    end = int(t.time())
    start = end - 15 * 24 * 60 * 60  # 15 days ago

    url = f"https://api.cryptowat.ch/markets/bitstamp/{symbol.lower()}usd/ohlc?periods=86400&after={start}&before={end}"
    response = requests.get(url)
    data = response.json()["result"]["86400"]
    df = pd.DataFrame(data,
                      columns=["CloseTime", "OpenPrice", "HighPrice", "LowPrice", "ClosePrice", "Volume", "QuoteVolume"])
    df["CloseTime"] = pd.to_datetime(df["CloseTime"], unit="s")
    df.set_index("CloseTime", inplace=True)
    return df


