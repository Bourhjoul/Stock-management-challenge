import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/LogIn";

function App() {
  const [Logged, setLogged] = useState(false);
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
