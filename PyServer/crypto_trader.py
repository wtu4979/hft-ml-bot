import requests
from alpaca.broker import MarketOrderRequest
from alpaca.trading import TradingClient

ALPACA_API_KEY_ID = "PKLSXDNKJ2JE3PR6I61W"
ALPACA_API_SECRET_KEY = "aR47EfBnERxsio14AhedTU0KzywJzGxTQT6eFkKq"

trading_client = TradingClient(ALPACA_API_KEY_ID, ALPACA_API_SECRET_KEY, paper=True)


import requests

def get_current_price(symbol):
    url = f"https://api.cryptowat.ch/markets/binance/{symbol.lower()}usdt/price"
    response = requests.get(url)
    data = response.json()
    price = data["result"]["price"]
    return price


def traderFunct(symbol, whatToDo, amount):
    # Set up trading client and market order requests
    normalized_symbol = f"{symbol.upper()}USD"
    symbol = f"{symbol.upper()}/USD"
    market_order_data_auto = MarketOrderRequest(
        symbol=normalized_symbol,
        qty=amount,
        side="buy",
        time_in_force="gtc",
    )
    market_order_sell_auto = MarketOrderRequest(
        symbol=normalized_symbol,
        qty=amount,
        side="sell",
        time_in_force="gtc",
    )

    # Define function to get position for the given symbol
    def get_position(symbol):
        positions = trading_client.get_all_positions()
        for p in positions:
            if p.symbol == symbol:
                return float(p.qty)
        return 0

    # Buy or sell based on whatToDo parameter
    if whatToDo == "buy":
        trading_client.submit_order(order_data=market_order_data_auto)
        print(f"Bought {amount} {symbol}")
    elif whatToDo == "sell":
        position = get_position(normalized_symbol)
        if position >= amount:
            trading_client.submit_order(order_data=market_order_sell_auto)
            print(f"Sold {amount} {symbol}")
        else:
            print(f"Not enough {symbol} in portfolio to sell {amount}. Current position is {position}")
    else :
        print(f"Holding {symbol}")


