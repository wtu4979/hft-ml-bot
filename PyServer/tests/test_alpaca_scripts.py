import unittest
import sys
sys.path.append('..')

from alpaca_script import (get_position, get_signal, get_pause, get_sma, get_bars)

class TestMain(unittest.TestCase):

    def test_get_position(self):
        # Test that get_position returns 0 if no position exists
        self.assertEqual(get_position("DOGE/USD"), 0)
        # Test that get_position returns a float if a position exists
        self.assertIsInstance(get_position("DOGEUSD"), float)

    def test_get_signal(self):
        # Test that get_signal returns True if the fast moving average is greater than the slow moving average
        self.assertTrue(get_signal([10, 20, 30], [5, 15, 25]))
        # Test that get_signal returns False if the fast moving average is less than the slow moving average
        self.assertFalse(get_signal([30, 20, 10], [25, 15, 5]))
        # Test that get_signal returns False if the fast moving average is equal to the slow moving average
        self.assertFalse(get_signal([10, 20, 30], [10, 20, 30]))

    def test_get_pause(self):
        # Test that get_pause returns an integer
        self.assertIsInstance(get_pause(), int)

    def test_get_sma(self):
        # Test that get_sma returns a pandas Series object
        self.assertIsInstance(get_sma([10, 20, 30], 2), pd.Series)
        # Test that get_sma calculates the moving average correctly
        self.assertTrue((get_sma([10, 20, 30], 2) == pd.Series([np.nan, 15, 25])).all())

    def test_get_bars(self):
        # Test that get_bars returns a pandas DataFrame object
        self.assertIsInstance(get_bars("DOGE/USD"), pd.DataFrame)
        # Test that get_bars adds two new columns for the fast and slow moving averages
        bars = get_bars("DOGE/USD")
        self.assertIn('sma_fast', bars.columns)
        self.assertIn('sma_slow', bars.columns)

if __name__ == '__main__':
    unittest.main()
