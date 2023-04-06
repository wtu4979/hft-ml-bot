import "./Login.css";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const login = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3001/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response);
        const { apiKey, secretApiKey } = response.data;
        navigate("/dashboard", {
          state: { apiKey: apiKey, secretApiKey: secretApiKey },
        });
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Invalid username or password.");
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <input
          type={"text"}
          placeholder={"Username"}
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
        <button type={"submit"} onClick={(event) => login(event)}>
          Login
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
