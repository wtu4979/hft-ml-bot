import time
import random
from crypto_trader import get_current_price, trader_function
from machineModel import make_prediction


def run_N_times_every_M_minutes(n, m):
    for i in range(n):
        # Function goes here

        # Print a message
        print(f'Task completed {i + 1} times, every ' + str(m) + ' minute')

        # Wait for m minutes before running again
        time.sleep(m * 60)


def run_N_times_every_S_seconds(n, s):
    for i in range(n):
        # Function goes here

        # Print a message
        print(f'Task completed {i + 1} times, every ' + str(s) + ' seconds')

        # Wait for m minutes before running again
        time.sleep(s * 1)


def run_N_times_every_S_seconds_with_function(n, s, model, asset):
    for i in range(n):
        # Function goes here
        current_price = get_current_price(asset)

        # uncomment later, using dummy values
        # prediction = make_prediction(current_price, model)

        prediction = random_array_value()
        trader_function(asset, prediction, random_value())

        # Print a message
        print(f'Task completed {i + 1} times, every ' + str(s) + ' seconds')

        # Wait for s minutes before running again
        time.sleep(s * 1)


## Only needed for testing, short cirtcuiting to dummy values
def random_value():
    return random.randint(50, 100)


def random_array_value():
    array = ['buy', 'sell', 'hold']
    return random.choice(array)
