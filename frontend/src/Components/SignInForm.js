import React from "react";
import "./SignInForm.css";
import "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import chatIcon from "../img/chat-app-icon.png";
import userIcon from "../img/userIcon.png";
import pwdIcon from "../img/passwordIcon.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const [loginForm, setLoginForm] = useState({
  //   username: '',
  //   password: ''
  // });

  const handleClick = () => {
    const data = {
      username: username,
      password: password,
    };

    axios
      .post("http://localhost:5000/api/token", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then(({ res }) => {
        console.log({ res }.status);
        return { res }.json;
      })
      .then((data) => {
        console.log("This came from the backend", data);
        sessionStorage.setItem("token", data.access_token);
      })
      .catch((error) => {
        console.log("An error was caught!", error);
      });
  };

  return (
    <div className="wrapper">
      <div className="text-center pa-3">
        <img src={chatIcon} className="chatIcon" alt="chat-icon"></img>
      </div>
      <div className="text-center mt4 name">Sign in to ChatSpace</div>
      <form className="p-3 mt-3 text-center">
        <div className="form-field d-flex align-items-center">
          {" "}
          <span>
            {" "}
            <img className="userIcon" alt="userIcon" src={userIcon} />{" "}
          </span>{" "}
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
        </div>
        <div className="form-field d-flex align-items-center">
          {" "}
          <span>
            <img className="pwdIcon" alt="pwdIcon" src={pwdIcon} />
          </span>{" "}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <Button className="btn mt-3 p-2 loginBtn" onClick={handleClick}>
          Login
        </Button>
      </form>
      <div className="text-center fs-6 p-3">
        {" "}
        Not a member? <a href="#">Sign Up</a>
      </div>
      {/* <div className="text-center p-2" style={{fontSize: "13px"}}> <a href="#">Forgot Password</a></div> */}
      {/* <div className="text-center fs-6"> Or <a href="#">Continue as Guest</a></div> */}
    </div>
  );
};

export default SignInForm;
