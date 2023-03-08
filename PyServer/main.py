from PyServer.crypto_trader import traderFunct
from PyServer.machineModel import make_prediction
from alpaca_script import functionalDriver, getAssetInfo, get_todays_trades_crypto, get_current_price


def main():
    # getAssetInfo()
    # Example usage: get today's Bitcoin trades
    # get_todays_trades_crypto('BTC/USD')
    # functionalDriver(5)

    # symbol = "btcusd"
    # price = get_current_price(symbol)
    # print(f"The current price of {symbol.upper()} is {price:.2f}")
    #
    # current_price = price
    # recommendation = make_prediction(current_price)
    # print(f"The recommendation is to {recommendation}")

    # Example usage
    symbol = "dogeusd"
    price = get_current_price(symbol)
    print(price)
    traderFunct("DOGE", "buy", 547)
    print(f"Current price of DOGE: {price}")


if __name__ == '__main__':
    main()
