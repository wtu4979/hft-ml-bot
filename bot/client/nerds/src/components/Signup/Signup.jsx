import "./Signup.css";
import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secretApiKey, setSecretApiKey] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [message, setMessage] = useState("");

  const register = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/register", {
        username: username,
        secretApiKey : secretApiKey,
        password: password,
        apiKey: apiKey,
      })
      .then((response) => {
        if (response.data.success) {
          setMessage("Registration successful! Go Log In!");
        } else {
          setMessage("Failed to create account, username taken.");
        }
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred. Please try again.");
      });
  };

  return (
    <div className="Signup">
      <h1>Signup</h1>
      <form onSubmit={register}>
        <input
          type={"text"}
          placeholder={"Fullname"}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type={"password"}
          placeholder={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type={"text"}
          placeholder={"API-Key"}
          onChange={(e) => {
            setApiKey(e.target.value);
          }}
        />
        <input
          type={"text"}
          placeholder={"API-Secret-Key"}
          onChange={(e) => {
            setSecretApiKey(e.target.value);
          }}
        />
        <button type={"submit"}>
          SignUp
        </button>
         <a href="https://app.alpaca.markets/login" target={'_blank'} rel="noreferrer">Get your API Keys</a>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Signup;
