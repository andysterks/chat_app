import "./App.css";
import ChatInterface from "./Components/ChatInterface";
import SignInForm from "./Components/SignInForm";
import useToken from "./Components/useToken";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  const { token, setToken } = useToken();
  
  return (
    <div>
      <Router>
        {!token && token !== "" && token !== undefined ? (
          <SignInForm />
        ) : (
          <>
            <Routes>
              <Route
                exact
                path="/chat"
                setToken={setToken}
                element={<ChatInterface />}
              />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
