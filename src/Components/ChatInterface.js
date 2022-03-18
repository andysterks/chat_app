import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ChatInterface.css";
import { Link } from "react-router-dom";

const send = () => {
  let message = document.getElementById("messageBox");
  let chatBox = document.getElementById("chatBox");
  // chatBox.innerHTML = message.value;
  theMessage = message.value;
  console.log(theMessage);
  message.value = "";
};

let name = "Emily Thorne";
let time = "9.30pm";
let date = "3/18/22";
let theMessage =
  "Some say that our lives are defined by the sum of our choices.\
   But it isn’t really our choices that distinguish who we are. \
   It’s our commitment to them.";

const handleSubmit = (e) => {
  e.preventDefault();
  e.target.reset();
};

const ChatInterface = () => {
  return (
    <>
      <div id="container">
        <div className="userBox col-3 userText">
          <p className="text-center p-3">Active Users</p>
          <p className="text-center ">Topics</p>
          <Button
            className="p-2 d-flex justify-content-center align-items-center mx-auto mb-4 active"
            active
          >
            General
          </Button>
          <Button className="p-2 d-flex text-center mx-auto mb-4">Art</Button>
          <Button className="p-2 d-flex text-center mx-auto mb-4">
            Sports
          </Button>
          <Button className="p-2 d-flex text-center mx-auto mb-5">Music</Button>

          <Button
            className="p-3 d-flex text-center mx-auto logoutBtn"
            as={Link}
            to="/"
          >
            Logout
          </Button>
        </div>

        <div className="parent">
          <div className="discussionBox p-5" id="chatBox"></div>

          {/* the message container  */}

          <div className=" chat-container">
            <div
              className="card-header d-flex justify-content-between p-3"
              style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.3" }}
            >
              <p className="fw-bold mb-0">{name}</p>
              <p className=" small mb-0">
                <i>{time}</i>
              </p>
            </div>
            <div className="card-body">
              <p className="mb-0 mx-auto p-2">{theMessage}</p>
            </div>
          </div>

          <div className="flex child">
            <div>
              <div className="input-group">
                <textarea
                  id="messageBox"
                  type="text"
                  className="form-control messageBox"
                  rows="2"
                  cols="500"
                  placeholder="Type Your Message"
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      send();
                      e.target.value = "";
                    }
                  }}
                  onSubmit={handleSubmit}
                />
              </div>
            </div>
            <Button type="submit" className="btn" onClick={send}>
              SEND
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
