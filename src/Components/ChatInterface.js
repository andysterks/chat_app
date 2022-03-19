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

let theMessage = "";

const handleSubmit = (e) => {
  e.preventDefault();
  e.target.reset();
};

const ChatInterface = () => {
  function displayTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, 0);
    const newHour = (hours % 12 || 12).toString();
    const minutes = date.getMinutes().toString().padStart(2, 0);

    const amPM = hours < "12" || hours === "24" ? "AM" : "PM";

    return `${newHour}:${minutes} ${amPM}`;
  }

  let theTime = displayTime();

  let userEmily = {
    id: "2",
    name: "Emily Thorne",
    messages: [
      {
        text: "Some say that our lives are defined by the sum of our choices.\
      But it isn’t really our choices that distinguish who we are. \
      It’s our commitment to them.",
      },
      {
        text: "Confucius once said, 'Before you embark on a journey of revenge, dig two graves'",
      },
    ],
  };

  let userSelf = {
    id: "1",
    name: "You",
    messages: [
      {
        text: "Wow...that's a little deep for an early morning, is it not? 😅",
      },
      {
        text: "Your blood sugar sounds low, let's get breakfast at the Stowaway!",
      },
    ],
  };

  let userJack = {
    id: "3",
    name: "Jack Porter",
    messages: [
      { text: "@Emily - Babe, calm down! " },
      { text: "@Emily - We agreed, no revenge before breakfast!" },
    ],
  };

  let users = [userEmily, userSelf, userJack];

  const theUsers =
    users &&
    users.map((user, index) => {
      return (
        <div
          className="chat-container"
          style={
            user.name === "You" ? { background: "#e45437" } : { background: "" }
          }
          key={index}
        >
          <div
            className="card-header d-flex justify-content-between p-3"
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.3" }}
          >
            <p className="fw-bold mb-0">{user?.name}</p>
            <p className=" small mb-0">
              <i>{theTime}</i>
            </p>
          </div>
          <div className="card-body">
            <p className="mb-0 mx-auto p-2">{user.messages[1].text}</p>
          </div>
        </div>
      );
    });

  return (
    <>
      <div id="container">
        <div className="text-center mx-auto" id="navbar">
          #General
        </div>

        <div className="userBox col-3 userText">
          <p className="text-center p-3 mt-2">Active Users</p>
          <p className="text-center ">Topics</p>
          <Button
            className="p-2 d-flex justify-content-center align-items-center mx-auto mb-4"
            autoFocus="True"
          >
            General
          </Button>
          <Button className="p-2 d-flex text-center mx-auto mb-4">Art</Button>
          <Button className="p-2 d-flex text-center mx-auto mb-4">Film</Button>
          <Button className="p-2 d-flex text-center mx-auto mb-4">Music</Button>
          <Button className="p-2 d-flex text-center mx-auto mb-5">
            Sports
          </Button>

          <Button
            className="p-3 d-flex text-center mx-auto logoutBtn"
            as={Link}
            to="/"
          >
            Logout
          </Button>
        </div>

        <div className="parent">
          <div className="discussionBox" id="chatBox">
            {theUsers}
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
            <Button type="submit" className="btn sendBtn" onClick={send}>
              SEND
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
