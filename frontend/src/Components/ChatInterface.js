import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./ChatInterface.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "./useToken";

const ChatInterface = () => {
  window.setTimeout(function () {
    let element = document.getElementById("chatBox");
    element.scrollTop = element.scrollHeight;
  });

  const [topic, setTopic] = useState("General");

  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);

  const {removeToken} = useToken();

  let navigate = useNavigate()
  

  const getUserInfo = (user_id) => {
    return users.find((user) => user.id === user_id )
  };

  async function getMessages() {
    await axios.get(`api/messages/${topic}`).then((res) => {
      setMessages(res.data);
      // console.log(res.data);
     
    });
  }
  // async function getUsers() {
  //   await axios.get("api/users").then((res) => {
  //     setUsers(res.data);
  //     // console.log(res.data);
  //   });
  // }


const logOut = () => {

  axios
  .post("/api/logout", data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then(( res ) => {
    removeToken()
    navigate("/")
    window.location.reload()
    
  })
  .catch((error) => {
    console.log("An error was caught!", error);
  });
}

  


  const data = messages.map((message) => {
    return {
      ...message,
      user: getUserInfo(message.userid),
    };
  });

 

  const send = () => {
    let message = document.getElementById("messageBox");
    const newMessage = { text: message.value, user: { id: "1", name: "CrystalW" } };
    setMessages([...data, newMessage]);
    message.value = "";
  };

  

  useEffect(() => {
    getMessages();
    // getUsers();
  },[topic]);

  const theMessages =
    data &&
    data.map((message, index) => {
      return (
        <div
          className="chat-container"
          style={
            message.user?.username === "CrystalW"
              ? { background: "#e45437" }
              : { background: "" }
          }
          key={index}
        >
          <div
            className="card-header d-flex justify-content-between p-3"
            style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.3" }}
          >
            <p className="fw-bold mb-0">{message?.user?.username}</p>
            <p className=" small mb-0">
              <i>{message?.to_char}</i>
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
          <h6 className="text-center p-3 mt-2 pb-1">Active Users</h6>
          <p className="text-center">User</p>
          <h6 className="text-center p-3">Topics</h6>
          <Button
            className="p-2 d-flex justify-content-center align-items-center mx-auto mb-4"
            autoFocus="True"
            id="General"
            onClick={(e) => {
              setTopic(e.target.id);
              
             
            }}
          >
            General
          </Button>
          <Button
            className="p-2 d-flex text-center mx-auto mb-4"
            id="Art"
            onClick={(e) => {
              setTopic(e.target.id);
             
            }}
          >
            Art
          </Button>
          <Button
            className="p-2 d-flex text-center mx-auto mb-4"
            id="Film & TV"
            onClick={(e) => {
              setTopic(e.target.id);
              
              
            }}
          >
            Film & TV
          </Button>
          <Button
            className="p-2 d-flex text-center mx-auto mb-4"
            id="Music"
            onClick={(e) => {
              setTopic(e.target.id);
           
              
            }}
          >
            Music
          </Button>
          <Button
            className="p-2 d-flex text-center mx-auto mb-5"
            id="Sports"
            onClick={(e) => {
              setTopic(e.target.id);
              
            }}
          >
            Sports
          </Button>

          <Button
            className="p-3 d-flex text-center mx-auto logoutBtn"
            onClick={logOut}
          >
            Logout
          </Button>
        </div>

        <div className="parent">
          <div className="discussionBox" id="chatBox">
            <p className="pt-5">The Date</p>
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
