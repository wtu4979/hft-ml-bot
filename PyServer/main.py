from sklearn.model_selection import train_test_split

import Prod.ltsmUpdated as lu

# Download data
data = lu.download_data()

# Add indicators to the data
data = lu.add_indicators(data)

# Scale the data
data_scaled, sc_input, sc_target = lu.scale_data(data)

# Prepare the data for training and testing
X, y = lu.prepare_data(data_scaled)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create the model
input_shape = (30, 18) # Instead of (X_train.shape[1], X_train.shape[2])
model = lu.create_model(input_shape)

# Train and evaluate the model
trained_model, mape = lu.train_and_evaluate_model(model, X_train, y_train, X_test, y_test)

# Plot the predictions
y_pred = trained_model.predict(X_test)
lu.plot_predictions(y_test, y_pred)

# Run the prediction and trading function every 60 seconds
lu.run_every_10_seconds(trained_model, sc_input, sc_target)
