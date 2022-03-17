import React from "react";
import { Button } from "react-bootstrap";
import "./ChatInterface.css";

const send = () => {
  let message = document.getElementById("messageBox");
  let chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = message.value;
  console.log(message.value);
};

const ChatInterface = () => {
  return (
    <>
      <div id="container">
        <div className="userBox col-3 userText">
          <p className="text-center p-3">Active Users</p>
          <p className="text-center ">Topics</p>
          <Button className="p-2 d-flex justify-content-center align-items-center mx-auto mb-4">
            General
          </Button>
          <Button className="p-2 d-flex text-center mx-auto mb-4">Art</Button>
          <Button className="p-2 d-flex text-center mx-auto mb-4">Sports</Button>
          <Button className="p-2 d-flex text-center mx-auto">Music</Button>
        </div>

        <div className="parent">
          <div className="discussionBox p-5" id="chatBox"></div>

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
                />
              </div>
            </div>
            <Button type="button" className="btn" onClick={send}>
              SEND
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
