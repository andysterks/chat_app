import "./App.css";
import ChatInterface from "./Components/ChatInterface";
import SignInForm from "./Components/SignInForm";
import useToken from "./Components/useToken";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <div>
      <Router>
        {!token ? 
          <SignInForm setToken={setToken}/> 
         : (
          <>
            <Routes>
              <Route exact path="/chat" element={<ChatInterface token={token} setToken={setToken}/>} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
