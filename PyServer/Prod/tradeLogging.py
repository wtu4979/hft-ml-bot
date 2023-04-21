import os


def log_trade(asset, predicted_price, actual_price, action, amount, timestamp):
    # Create the folder if it doesn't exist
    folder_path = "tradeLogs"
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # Set the path for the log file within the folder
    log_file_path = os.path.join(folder_path, "trade_log.csv")

    # Check if the log file exists, and write the header row if it doesn't
    if not os.path.isfile(log_file_path):
        with open(log_file_path, "w") as log_file:
            log_file.write("Asset,Predicted Price,Actual Price,Action,Amount,Time\n")

    # Write the trade details to the log file
    with open(log_file_path, "a") as log_file:
        log_file.write(f"{asset},{predicted_price},{actual_price},{action},{amount},{timestamp}\n")
