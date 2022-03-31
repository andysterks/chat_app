import React from "react";
import "./SignInForm.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import chatIcon from "../img/chat-app-icon.png";
import userIcon from "../img/userIcon.png";
import pwdIcon from "../img/passwordIcon.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullPassword, setFullPassword] = useState(true);
  const [wrongDetails, setWrongDetails] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const pushToken = (data) => { 
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
      });
  };

  const handleClick = () => {
    const data = {
      username: username,
      password: password,
    };

    if (username.length >= 4 && password.length >= 4) {
      axios
        .post("/api/users", data, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          return res;
        })
        .then((res) => {
          pushToken(data);
          navigate("/chat");
          window.location.reload();
        })
        .catch((error) => {
          console.log("There was an error!", error);
          setWrongDetails(true);
        });
    } else {
      setFullPassword(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="text-center pa-3">
        <img src={chatIcon} className="chatIcon" alt="chat-icon"></img>
      </div>
      <div className="text-center mt4 name">Sign Up for ChatSpace</div>
      {!fullPassword ? (
        <p className="text-center mt-4 wrongDetails">
          Username and/or password must be at least 4 characters
        </p>
      ) : (
        ""
      )}
      {wrongDetails ? (
        <p className="text-center mt-4 wrongDetails">
          Username is already taken. Please choose another.
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
            minlength="4"
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
            minlength="4"
            maxLength="15"
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => {
              if (e.key == "Enter") {
                handleClick();
              }
            }}
            value={password}
          ></input>
          <span className="passwordIcon">
            <FontAwesomeIcon
              icon={passwordShown ? faEye : faEyeSlash}
              onClick={togglePasswordVisibility}
            />
          </span>
        </div>
        <Button className="btn mt-3 p-2 loginBtn" onClick={handleClick}>
          Register
        </Button>
      </form>

      <div className="text-center fs-6 p-3">
        {" "}
        Already a member? <a href="/">Log In</a>
      </div>
    </div>
  );
};

export default RegisterForm;