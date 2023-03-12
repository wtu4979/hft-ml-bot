import "./Signup.css"
import React, {useState} from "react";
import axios from "axios";

const Signup = () => {
  const [fullnameReg, setfullnameReg] = useState('');
  const [passwordReg, setpasswordReg] = useState('');
  const [emailReg, setemailReg] = useState('');
  const [confpasswordReg, setconfpasswordReg] = useState('');
  const [api_keyReg, setapi_keyReg] =useState('');

  const Signup = () => {
    axios.post('http://localhost:3001/Signup', {
      fullname: fullnameReg,
      email: emailReg,
      password: passwordReg,
      confpassword: confpasswordReg,
      api_key: api_keyReg
    }).then((response) =>{
      console.log(response);
    });
  };

  return (
    <div className="Signup">
      <h1>Signup</h1>
      <form>
            <input type={"text"} placeholder={'Fullname'} onChange={(e)=>{
              setfullnameReg(e.target.value);}}/>
            <input type={"email"} placeholder={'Email'} onChange= {(e)=>{
              setemailReg(e.target.value);}}/>
            <input type={'password'} placeholder={'Password'} onChange= {(e)=>{
              setpasswordReg(e.target.value);}}/>
            <input type={'password'} placeholder={'ConfirmPassword'} onChange= {(e)=>{
              setconfpasswordReg(e.target.value);}}/>
            <input type={'text'} placeholder={'API-Secret-Keys'}onChange= {(e)=>{
              setapi_keyReg(e.target.value);}}/>
            <button type={'submit'} onClick={Signup} >SignUp</button>
      </form>
    </div>
  )
}

export default Signup