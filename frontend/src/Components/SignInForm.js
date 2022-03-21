import React from "react";
import "./SignInForm.css";
import "react-bootstrap";
import chatIcon from "../img/chat-app-icon.png";
import userIcon from '../img/userIcon.png'
import pwdIcon from '../img/passwordIcon.png'
import {Link} from "react-router-dom"
import { Button } from "react-bootstrap";

const SignInForm = () => {
  return (
    
      <div className="wrapper">
     
              <div className="text-center pa-3"><img src={chatIcon} className="chatIcon" alt="chat-icon"></img></div>
              <div className="text-center mt4 name">Sign in to ChatSpace</div>
             <form className="p-3 mt-3 text-center">
               <div className="form-field d-flex align-items-center"> <span> <img className="userIcon" alt="userIcon" src={userIcon}/> </span> <input type="text" name="userName" id="userName" placeholder="Username"></input></div>
               <div className="form-field d-flex align-items-center"> <span><img className="pwdIcon" alt="pwdIcon" src={pwdIcon}/></span> <input type="password" name="password" id="password" placeholder="Password"></input></div>
               <Button className="btn mt-3 p-2 loginBtn" as={Link} to="chat">Login</Button>
                </form>
                <div className="text-center fs-6 p-3"> Not a member? <a href="#">Sign Up</a></div>
                {/* <div className="text-center p-2" style={{fontSize: "13px"}}> <a href="#">Forgot Password</a></div> */}
                {/* <div className="text-center fs-6"> Or <a href="#">Continue as Guest</a></div> */}
           </div>
  );
};

export default SignInForm;
