import "./App.css";
import ChatInterface from "./Components/ChatInterface";
import SignInForm from "./Components/SignInForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignInForm />} />
          <Route path="chat" element={<ChatInterface />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
