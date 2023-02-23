import unittest
import os
import sys
import pandas as pd


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))


from alpaca_script import get_pause, get_position, get_sma, get_signal, get_bars

NORMALIZED_SYMBOL = "DOGEUSD"
SYMBOL = "DOGE/USD"

class TestAlpacaScript(unittest.TestCase):
    def test_get_position_no_positions(self):
        self.assertEqual(get_position("AAPL"), 0)

    def test_get_sma(self):
        series = pd.Series([1, 2, 3, 4, 5])
        self.assertEqual(get_sma(series, 3).iloc[-1], 4)



