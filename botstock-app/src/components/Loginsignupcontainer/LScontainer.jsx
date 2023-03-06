import {useRef,useState} from "react";
import "./LScontainer.css"
import Login from "../login/Login";
import Signup from "../Signup/SIgnup";

const LScontainer = () => {
  const[login,setLogin] = useState(true);

  const lsContainerRef = useRef(null);

  const handleClick = () =>{
    setLogin(!login);
    lsContainerRef.current.classList.toggle("active");
  }

  return (
    <div className="login-signup-container" ref={lsContainerRef}>
      <Login/>
      <div className="side-div">
        <button type="button" onClick={handleClick}> {login ? "Signup" : "Login"}</button>
        </div>
      <Signup/>
    </div>
  )
}

export default LScontainer