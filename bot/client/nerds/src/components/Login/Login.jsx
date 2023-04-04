import "./Login.css";

import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [password, setpasswordReg] = useState('');
  const [email, setemailReg] = useState('');
  const Navigate = useNavigate();
  
  const submitHandler = (e) => {

    e.preventDefault();
    
    console.log(e);
    
    }
    
  const login = () => {
    
       axios.post('http://localhost:3001/login', 
        {email:email,password:password}).then((response) =>{
          console.log({response});
          Navigate('/Dashboard');

        });
  }




  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type={"text"}
          placeholder={"Username"}
          onChange= {(e)=>{
            setemailReg(e.target.value);}}
            value={email}
          
        />
        <input
          type={"password"}
          placeholder={"Password"}
          onChange= {(e)=>{
            setpasswordReg(e.target.value);}}
            value={password}
        />
        <button type={"submit"} onClick={login}>
          Login
        </button>
       
      </form>
    </div>
  );
};

export default Login;
