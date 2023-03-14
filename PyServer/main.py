from dataToCsv import get_crypto_data
from machineModel import make_prediction, train_model
from schedulerRedux import run_N_times_every_S_seconds_with_function


def main():
    # Example usage
    crypto_data = get_crypto_data("doge")
    crypto_data.to_csv("crypto_data.csv")
    # print(crypto_data)

    model = train_model("crypto_data.csv")

    # needs to get done every X minute
    run_N_times_every_S_seconds_with_function(100, 30, model, 'doge')






if __name__ == '__main__':
    main()
