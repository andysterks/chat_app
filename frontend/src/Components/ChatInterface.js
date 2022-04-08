import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./ChatInterface.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "./useToken";
import useUser from "./useUser";

const ChatInterface = () => {
  window.setTimeout(function () {
    let element = document.getElementById("chatBox");
    element.scrollTop = element.scrollHeight;
  });

  const [topic, setTopic] = useState("General");

  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);

  const { removeToken } = useToken();

  const { signedInUser, signOutUser } = useUser();

  const [activeUsers, setActiveUsers] = useState([]);

  let navigate = useNavigate();

  const getUserInfo = (user_id) => {
    return users.find((user) => user.id === user_id);
  };

  const selectSignedInUser = (signedInUser) => {
    let theUserId;
    users.find((user) => {
      if (user.username === signedInUser) {
        theUserId = user.id;
      }
    });
    return theUserId;
  };

  async function getMessages() {
    await axios.get(`api/messages/${topic}`).then((res) => {
      setMessages(res.data);
    });
  }
  async function getUsers() {
    await axios.get("api/users").then((res) => {
      setUsers(res.data);
    });
  }

  async function getActiveUsers() {
    await axios.get("api/activeusers").then((res) => {
      setActiveUsers(res.data);
    });
  }

  const actives = activeUsers?.map((user) => {
    return (
      <table className="d-flex text-center justify-content-center align-items-center pb-2">
        <td
          style={
            user?.username === signedInUser
              ? { color: "#5cdb91" }
              : { color: "#bafad4" }
          }
        >
          {user?.username}
        </td>
        <br></br>
      </table>
    );
  });

  const data = messages.map((message) => {
    return {
      ...message,
      user: getUserInfo(message.userid),
    };
  });

  let userId = selectSignedInUser(signedInUser);

  const databaseSend = () => {
    let message = document.getElementById("messageBox");
    let newText = message.value.replaceAll("'", "''");

    const data = {
      userId: userId,
      text: newText,
      topic: topic,
    };

    axios
      .post("/api/messages", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        return res;
      })
      .then((res) => {
        getMessages();
        message.value = "";
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  };

  const logOut = () => {
    axios
      .post("/api/logout", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        removeToken();
        signOutUser();
        navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        console.log("An error was caught!", error);
      });

    const user = {
      username: signedInUser,
    };

    axios
      .post("api/deactivateuser", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
  };

  useEffect(() => {
    getMessages();
    getUsers();
    getActiveUsers();
  }, [topic, activeUsers]);

  const formatTime = (utcTime) => {
    const time = new Date(utcTime);
    return time.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const theMessages =
    data &&
    data.map((message, index) => {
      let prev = data[index - 1];
      let current = data[index];

      return (
        <div>
          {prev?.formatted_date === current?.formatted_date ? (
            ""
          ) : (
            <div>
              <div className="fw-bold mx-auto horizontalLine"></div>
              <div className="fw-bold mt-4" style={{ color: "#444c55" }}>
                {message?.formatted_date}
              </div>
            </div>
          )}

          <div
            className="chat-container"
            style={
              message.user?.username === signedInUser
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
                <i>{formatTime(message?.time_created)}</i>
              </p>
            </div>
            <div className="card-body">
              <p className="mb-0 mx-auto p-2">{message.text}</p>
            </div>
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
          <p className="text-center">{actives}</p>

          <h6 className="text-center p-3">Topics</h6>
          <Button
            className={
              topic === "General"
                ? "p-2 d-flex justify-content-center align-items-center mx-auto mb-4 activeButton"
                : "p-2 d-flex justify-content-center align-items-center mx-auto mb-4"
            }
            autoFocus="True"
            id="General"
            onClick={(e) => {
              setTopic(e.target.id);
            }}
          >
            General
          </Button>
          <Button
            className={
              topic === "Art"
                ? "p-2 d-flex justify-content-center align-items-center mx-auto mb-4 activeButton"
                : "p-2 d-flex justify-content-center align-items-center mx-auto mb-4"
            }
            id="Art"
            onClick={(e) => {
              setTopic(e.target.id);
            }}
          >
            Art
          </Button>
          <Button
            className={
              topic === "Film & TV"
                ? "p-2 d-flex justify-content-center align-items-center mx-auto mb-4 activeButton"
                : "p-2 d-flex justify-content-center align-items-center mx-auto mb-4"
            }
            id="Film & TV"
            onClick={(e) => {
              setTopic(e.target.id);
            }}
          >
            Film & TV
          </Button>
          <Button
            className={
              topic === "Music"
                ? "p-2 d-flex justify-content-center align-items-center mx-auto mb-4 activeButton"
                : "p-2 d-flex justify-content-center align-items-center mx-auto mb-4"
            }
            id="Music"
            onClick={(e) => {
              setTopic(e.target.id);
            }}
          >
            Music
          </Button>
          <Button
            className={
              topic === "Sports"
                ? "p-2 d-flex justify-content-center align-items-center mx-auto mb-4 activeButton"
                : "p-2 d-flex justify-content-center align-items-center mx-auto mb-4"
            }
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
                      databaseSend();
                    }
                  }}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="btn sendBtn"
              onClick={databaseSend}
            >
              SEND
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInterface;
