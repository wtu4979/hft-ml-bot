import "./Signup.css"
import React, {useState} from "react";
import axios from "axios";



  return (
    <div className="Signup">
      <h1>Signup</h1>
      <form>
            <input type={"text"} placeholder={'Fullname'}/ >
            <input type={"email"} placeholder={'Email'} />
            <input type={'password'} placeholder={'Password'} />
            <input type={'password'} placeholder={'ConfirmPassword'} />
            <input type={'text'} placeholder={'API-Secret-Keys'}/>
            <button type={'submit'}  >SignUp</button>
      </form>
    </div>
  )
}

export default Signup