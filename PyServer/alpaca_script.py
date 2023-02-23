import math
import time
from datetime import datetime, timedelta

from alpaca.broker import MarketOrderRequest
from alpaca.data import TimeFrame, StockHistoricalDataClient
from alpaca.data.historical import CryptoHistoricalDataClient
from alpaca.data.requests import CryptoBarsRequest, StockLatestQuoteRequest
from alpaca.trading import TradingClient

from pprint import pprint

NORMALIZED_SYMBOL = "DOGEUSD"
SYMBOL = "DOGE/USD"

SMA_FAST = 12
SMA_SLOW = 24
QTY_PER_TRADE = 36

BUY_AMOUNT = 32
SELL_AMOUNT = 18

trading_client = TradingClient("PKLSXDNKJ2JE3PR6I61W", "aR47EfBnERxsio14AhedTU0KzywJzGxTQT6eFkKq", paper=True)
past_client = StockHistoricalDataClient("PKLSXDNKJ2JE3PR6I61W", "aR47EfBnERxsio14AhedTU0KzywJzGxTQT6eFkKq");

market_order_data_auto = MarketOrderRequest(
    symbol=NORMALIZED_SYMBOL,
    qty=BUY_AMOUNT,
    side='buy',
    time_in_force='gtc'
)

market_order_sell_auto = MarketOrderRequest(
    symbol=NORMALIZED_SYMBOL,
    qty=SELL_AMOUNT,
    side='sell',
    time_in_force='gtc'
)


def get_pause():
    now = datetime.now()
    next_min = now.replace(second=0, microsecond=0) + timedelta(minutes=1)
    pause = math.ceil((next_min - now).seconds)
    print(f"Sleep for {pause}")
    return pause


def get_position(symbol):
    positions = trading_client.get_all_positions()
    for p in positions:
        if p.symbol == symbol:
            return float(p.qty)
    return 0


# returns a series with the moving range
def get_sma(serires, periods):
    return serires.rolling(periods).mean()


# checks if we should buy, (fast ma > slow ma)
def get_signal(fast, slow):
    print(f"Fast {fast[-1]} / Slow : {slow[-1]}")
    return fast[-1] > slow[-1]


# get up-to-date 1 minute data from the Alpaca api and add the moving average
def get_bars(symbol):
    request_params = CryptoBarsRequest(
        symbol_or_symbols=[symbol],
        timeframe=TimeFrame.Minute
    )
    bars = CryptoHistoricalDataClient().get_crypto_bars(request_params).df
    # print(bars)
    # bars = bars[bars.exchange == 'CBSE']
    bars[f'sma_fast'] = get_sma(bars.close, SMA_FAST)
    bars[f'sma_slow'] = get_sma(bars.close, SMA_SLOW)

    return bars


def functionalDriver(howlong):
    for i in range(0, howlong):
        # Get Data
        bars = get_bars(symbol=SYMBOL)

        # Check Positions
        position = get_position(symbol=NORMALIZED_SYMBOL)
        should_buy = get_signal(bars.sma_fast, bars.sma_slow)
        print(f"Position: {position} / Should Buy : {should_buy}")

        if position != 0 and should_buy == True:
            # We buy
            trading_client.submit_order(order_data=market_order_data_auto)
            print(f"Symbol : {SYMBOL} / Side : Buy / Quantity : {BUY_AMOUNT}")

        elif position > 20 and should_buy == False:
            trading_client.submit_order(order_data=market_order_sell_auto)
            print(f"Symbol : {SYMBOL} / Side : Sell / Quantity : {SELL_AMOUNT}")

        time.sleep(get_pause())
        print("*" * 20)

def getAssetInfo():
    multisymbol_request_params = StockLatestQuoteRequest(symbol_or_symbols=["SPY", "GLD", "TLT"])

    latest_multisymbol_quotes = past_client.get_stock_latest_quote(multisymbol_request_params)

    gld_latest_ask_price = latest_multisymbol_quotes["GLD"]

    pprint(gld_latest_ask_price)
