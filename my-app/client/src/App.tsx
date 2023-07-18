import React, { useState } from "react";
import Register from "./pages/Register";
import Login, { LoginProps } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Task from "./pages/Task";
import Apply from "./pages/Apply";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginProps: LoginProps = {
    username: username,
    password: password,
    setUsername: setUsername,
    setPassword: setPassword,
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login {...loginProps} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/task" element={<Task />}></Route>
        <Route path="/apply" element={<Apply />}></Route>
      </Routes>
    </div>
  );
};

export default App;
