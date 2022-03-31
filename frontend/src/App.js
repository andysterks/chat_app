import "./App.css";
import ChatInterface from "./Components/ChatInterface";
import SignInForm from "./Components/SignInForm";
import RegisterForm from "./Components/RegisterForm";
import useToken from "./Components/useToken";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const { token, setToken } = useToken();
  // const [signedInUser, setSignedInUser] = useState("test");

  return (
    <div>
      <Router>
        <Routes>
          {!token && token !== "" && token !== undefined ? (
            <>
              <Route
                path="/"
                element={<SignInForm />}
              />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/chat" element={<SignInForm />} />
            </>
          ) : (
            <>
              <Route
                path="/chat"
                setToken={setToken}
                element={<ChatInterface />}
              />
              <Route path="/" element={<SignInForm />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
