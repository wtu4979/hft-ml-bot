import "./Login.css"
import React, {useState} from "react";
import axios from "axios";

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');

  const login = () =>{
    axios.post("http://localhost:3001/Signup",{
      email: email,
      password: password
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className="login">
        <h1>Login</h1>
        <form>
            <input type={"email"} placeholder={'Email'} onChange={(e) => {
              setemail(e.target.value);
            }}/>
            <input type={'password'} placeholder={'Password'} onChange= { (e) => {
              setpassword(e.target.value);
            }}/>
            <button type={'submit'} onClick={login}>Login</button>
        </form>
    </div>
  )
}

export default Login