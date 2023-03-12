import {useRef,useState} from "react";
import "./Lscontainer.css"
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

const Lscontainer = () => {
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

export default Lscontainer