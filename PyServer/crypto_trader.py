import datetime
import logging
import os
import random
from logging.handlers import TimedRotatingFileHandler

import requests
import alpaca.broker
from alpaca.trading import TradingClient

ALPACA_API_KEY_ID = "PKLSXDNKJ2JE3PR6I61W"
ALPACA_API_SECRET_KEY = "aR47EfBnERxsio14AhedTU0KzywJzGxTQT6eFkKq"

trading_client = TradingClient(ALPACA_API_KEY_ID, ALPACA_API_SECRET_KEY, paper=True)

def setup_logger():
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(message)s')

    log_directory = "logs"
    if not os.path.exists(log_directory):
        os.mkdir(log_directory)
    log_filename = os.path.join(log_directory, datetime.datetime.now().strftime('%Y-%m-%d') + ".log")
    file_handler = TimedRotatingFileHandler(log_filename, when="midnight", backupCount=7)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)

    return logger

logger = setup_logger()

def get_current_price(symbol):
    url = f"https://api.cryptowat.ch/markets/binance/{symbol.lower()}usdt/price"
    response = requests.get(url)
    data = response.json()
    price = data["result"]["price"]
    return price

def get_position(symbol):
    positions = trading_client.get_all_positions()
    for p in positions:
        if p.symbol == symbol:
            return float(p.qty)
    return 0

def trader_function(symbol, what_to_do, amount):
    normalized_symbol = f"{symbol.upper()}USD"
    symbol = f"{symbol.upper()}/USD"


    market_order_data_auto = alpaca.broker.MarketOrderRequest(
        symbol=normalized_symbol,
        qty=amount,
        side="buy",
        time_in_force="gtc",
    )
    market_order_sell_auto = alpaca.broker.MarketOrderRequest(
        symbol=normalized_symbol,
        qty=amount,
        side="sell",
        time_in_force="gtc",
    )

    if what_to_do == "buy":
        trading_client.submit_order(order_data=market_order_data_auto)
        logger.info(f"Bought {amount} {symbol}. Current position is {get_position(normalized_symbol)}")
        print(f"Bought {amount} {symbol}")
    elif what_to_do == "sell":
        position = get_position(normalized_symbol)
        if position >= amount:
            trading_client.submit_order(order_data=market_order_sell_auto)
            logger.info(f"Sold {amount} {symbol}. Current position is {get_position(normalized_symbol)}")
            print(f"Sold {amount} {symbol}")
        else:
            logger.info(f"Not enough {symbol} in portfolio to sell {amount}. Current position is {get_position(normalized_symbol)}")
            print(f"Not enough {symbol} in portfolio to sell {amount}. Current position is {get_position(normalized_symbol)}")
    else:
        logger.info(f"Holding {symbol}")
        print(f"Holding {symbol}")
