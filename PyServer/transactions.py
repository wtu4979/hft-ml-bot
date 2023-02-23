import dummyValues


def currentStatements(name):
    currentCash = "Cash : " + str(dummyValues.cashAmount)
    currentShares = "Shares : " + str(dummyValues.amountOfShares)
    return name, currentCash, currentShares


def buy(stock):
    dummyValues.cashAmount -= 1
    dummyValues.amountOfShares += 3
    print(currentStatements(stock))


def sell(stock):
    dummyValues.cashAmount += 1
    dummyValues.amountOfShares -= 3
    print(currentStatements(stock))
