import React, { useEffect, useState } from "react";
import Register from "./pages/Register";
import Login, { LoginProps } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Task from "./pages/Task";
import Apply from "./pages/Apply";
import Status from "./pages/Status";
import jBPMClient from "./jBPMServer/jBPMClient";

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let service: jBPMClient = new jBPMClient(username, password);

  const loginProps: LoginProps = {
    username: username,
    password: password,
    setUsername: setUsername,
    setPassword: setPassword,
  };

  useEffect(() => {
    if (username && password) {
      service = new jBPMClient(username, password);
    }
  }, [username, password]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login {...loginProps} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/task" element={<Task service={service} />}></Route>
        <Route
          path="/apply"
          element={<Apply username={username} service={service} />}
        ></Route>
        <Route path="/result" element={<Status service={service} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
