import React from "react";
import { Button } from "react-bootstrap";
import "./ChatInterface.css";

const send = () => {
  console.log("Send Button Pressed");
};

const ChatInterface = () => {
  return (
    <>
      <div className="discussionBox parent">
        <div className="col-sm-4 userBox userText">
          <p>Active Users</p>
          <p>#General</p>
          <p>#Art</p>
          <p>#Sports</p>
        </div>

        <div className="flex child">
          <div></div>
          <div>
            <div className="input-group">
              <textarea
                type="text"
                className="form-control messageBox"
                rows="3"
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
    </>
  );
};

export default ChatInterface;
