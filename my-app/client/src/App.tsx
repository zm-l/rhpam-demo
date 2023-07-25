import React, { useState } from "react";
import Register from "./pages/Register";
import Login, { LoginProps } from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Task from "./pages/Task";
import Apply from "./pages/Apply";
import Status from "./pages/Status";
import jBPMClient from "./jBPMServer/jBPMClient";

// Create a new AuthContext for managing authentication state
const AuthContext = React.createContext<{
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

const App: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let service: jBPMClient = new jBPMClient(username, password);

  // Function to handle login
  const login = (username: string, password: string) => {
    // Perform your login logic here
    // For example, you can make API calls to authenticate the user
    // and update the state accordingly

    // For this example, we'll just set isLoggedIn to true if the username and password are not empty
    if (username && password) {
      setIsLoggedIn(true);
    }
  };

  // Function to handle logout
  const logout = () => {
    // Perform any logout logic, such as clearing session data, etc.
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
    service.resetCredentials();
  };

  const authContextValue = {
    isLoggedIn,
    login,
    logout,
  };

  const loginProps: LoginProps = {
    username: username,
    password: password,
    setUsername: setUsername,
    setPassword: setPassword,
    login: login,
  };

  return (
    <div>
      {/* Provide the AuthContext to the entire app */}
      <AuthContext.Provider value={authContextValue}>
        <Routes>
          <Route path="/" element={<Login {...loginProps} />}></Route>
          <Route path="/register" element={<Register />}></Route>
          {/* Protect private routes using the AuthContext */}
          {isLoggedIn ? (
            <>
              <Route
                path="/task"
                element={<Task service={service} logout={logout} />}
              ></Route>
              <Route
                path="/apply"
                element={
                  <Apply
                    username={username}
                    service={service}
                    logout={logout}
                  />
                }
              ></Route>
              <Route
                path="/result"
                element={<Status service={service} logout={logout} />}
              ></Route>
            </>
          ) : null}
        </Routes>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
