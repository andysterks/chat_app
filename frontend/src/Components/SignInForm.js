import React from "react";
import "./SignInForm.css";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import chatIcon from "../img/chat-app-icon.png";
import userIcon from "../img/userIcon.png";
import pwdIcon from "../img/passwordIcon.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [wrongDetails, setWrongDetails] = useState(false);

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleClick = () => {
    const data = {
      username: username,
      password: password,
    };

    axios
      .post("/api/token", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res;
      })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        navigate("/chat");
        window.location.reload();
      })
      .catch((error) => {
        console.log("There was an error!", error);
        setWrongDetails(true);
      });
  };

  return (
    <div className="wrapper">
      <div className="text-center pa-3">
        <img src={chatIcon} className="chatIcon" alt="chat-icon"></img>
      </div>
      <div className="text-center mt4 name">Sign in to ChatSpace</div>
      {wrongDetails ? (
        <p className="text-center mt-4 wrongDetails">
          Please enter a valid username and/or password
        </p>
      ) : (
        ""
      )}
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
            type={passwordShown ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                handleClick();
              }
            }}
            value={password}
          ></input>
          <span className="passwordEyeIcon">
            <FontAwesomeIcon
              icon={passwordShown ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
            />
          </span>
        </div>
        <Button className="btn mt-3 p-2 loginBtn" onClick={handleClick}>
          Login
        </Button>
      </form>

      <div className="text-center fs-6 p-3">
        {" "}
        Not a member? <a href="/register">Sign Up</a>
      </div>
      {/* <div className="text-center p-2" style={{fontSize: "13px"}}> <a href="#">Forgot Password</a></div> */}
    </div>
  );
};

export default SignInForm;
