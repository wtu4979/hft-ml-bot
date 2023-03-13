from alpaca.trading.client import TradingClient
import pandas as pd
import os

api_key = os.environ['PKFR600O8L2NQWNSUEWX']
api_secret = os.environ['pecHKs89xtRhI1JYIBctKE4oAqnn76BcsDikHOyh']

# paper=True enables paper trading
trading_client = TradingClient(api_key, api_secret, paper=True)
account_positions = trading_client.get_all_positions()
positions_dict = [dict(item) for item in account_positions]

df = pd.DataFrame.from_records(positions_dict)
df.head()


#should pull positions from the portfolio
