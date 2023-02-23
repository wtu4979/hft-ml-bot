import time
import transactions
import assetCaller
import ML


def main_driver():
    starttime = time.time()
    numerOfLoops = 3
    timeDelay = 2.0
    assetName = 'DOGE-USD'

    print(transactions.currentStatements(assetName))

    while numerOfLoops != 0:
        curretValue = assetCaller.getCurrentValue(assetName)
        print(curretValue)
        decision = ML.getDecision(curretValue)

        if decision:
            transactions.buy(assetName)
        else:
            transactions.sell(assetName)

        numerOfLoops += -1
        time.sleep(timeDelay - ((time.time() - starttime) % timeDelay))
