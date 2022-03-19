import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./ChatInterface.css";
import { Link } from "react-router-dom";

const ChatInterface = () => {
  window.setTimeout(function () {
    let element = document.getElementById("chatBox");
    element.scrollTop = element.scrollHeight;
  });

  const topicChange = (id) => {
    let topicBox = document.getElementById(id);
    setTopic(topicBox.id);
  };

  const [topic, setTopic] = useState("General");

  const [messages, setMessages] = useState([
    {
      text: "Some say that our lives are defined by the sum of our choices.\
    But it isn’t really our choices that distinguish who we are. \
    It’s our commitment to them.",
      user: { id: "2", name: "Emily Thorne" },
    },
    {
      text: "Wow...that's a little deep for an early morning, is it not? 😅",
      user: { id: "1", name: "You" },
    },
    {
      text: "@Emily - Babe, calm down! 😩",
      user: { id: "3", name: "Jack Porter" },
    },
    {
      text: "Confucius once said, 'Before you embark on a journey of revenge, dig two graves",
      user: { id: "2", name: "Emily Thorne" },
    },
    {
      text: "Your blood sugar sounds low, let's get breakfast at the Stowaway!",
      user: { id: "1", name: "You" },
    },
    {
      text: "@Emily - We agreed, no revenge before breakfast!",
      user: { id: "3", name: "Jack Porter" },
    },
  ]);

  const send = () => {
    let message = document.getElementById("messageBox");
    const newMessage = { text: message.value, user: { id: "1", name: "You" } };
    setMessages([...messages, newMessage]);
    message.value = "";
  };

  function displayTime() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, 0);
    const newHour = (hours % 12 || 12).toString();
    const minutes = date.getMinutes().toString().padStart(2, 0);

    const amPM = hours < "12" || hours === "24" ? "AM" : "PM";

    return `${newHour}:${minutes} ${amPM}`;
  }

  let theTime = displayTime();

  const theMessages =
    messages &&
    messages.map((message, index) => {
      return (
        <div
          className="chat-container"
          style={
            message.user.name === "You"
              ? { background: "#e45437" }
              : { background: "" }
          }
          key={index}
        >
          <div
            className="card-header d-flex justify-content-between p-3"
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.3" }}
          >
            <p className="fw-bold mb-0">{message?.user.name}</p>
            <p className=" small mb-0">
              <i>{theTime}</i>
            </p>
          </div>
          <div className="card-body">
            <p className="mb-0 mx-auto p-2">{message.text}</p>
          </div>
        </div>
      );
    });

  return (
    <>
      <div id="container">
        <div className="text-center mx-auto" id="navbar">
          {topic}
        </div>

        <div className="userBox col-3 userText">
          <p className="text-center p-3 mt-2">Active Users</p>
          <p className="text-center ">Topics</p>
          <Button
            className="p-2 d-flex justify-content-center align-items-center mx-auto mb-4"
            autoFocus="True"
            id="General"
            onClick={(e) => {
              topicChange(e.target.id);
            }}
          >
            General
          </Button>
          <Button
            className="p-2 d-flex text-center mx-auto mb-4"
            id="Art"
            onClick={(e) => {
              topicChange(e.target.id);
            }}
          >
            Art
          </Button>
          <Button
            className="p-2 d-flex text-center mx-auto mb-4"
            id="Film & TV"
            onClick={(e) => {
              topicChange(e.target.id);
            }}
          >
            Film & TV
          </Button>
          <Button
            className="p-2 d-flex text-center mx-auto mb-4"
            id="Music"
            onClick={(e) => {
              topicChange(e.target.id);
            }}
          >
            Music
          </Button>
          <Button
            className="p-2 d-flex text-center mx-auto mb-5"
            id="Sports"
            onClick={(e) => {
              topicChange(e.target.id);
            }}
          >
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
            {theMessages}
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
                    }
                  }}
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
