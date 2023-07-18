import React, { useState, useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

export interface LoginProps {
  username: String;
  password: String;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<LoginProps> = (props) => {
  const { username, password, setUsername, setPassword } = props;
  const navigate = useNavigate();

  // Function to handle username check
  const navigateApplicant = async (exists: Boolean) => {
    if (exists) {
      // Username exist, direct applicant to result page
      navigate("/result");
      console.log("Username exists. Direct applicant to result page.");
      // ...
    } else {
      // Username does not exist, direct applicant to application page
      navigate("/apply");
      console.log(
        "Username does not exist. Direct applicant to application page."
      );
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const response = await fetch(`http://localhost:5000/users/${username}`);
        const data = await response.json();
        const group = data.group;
        console.log(group);
        const exists = data.exists;

        if (group == "applicant") {
          navigateApplicant(exists);
        } else {
          navigate("/task");
        }

        // Handle successful login, e.g., redirect to dashboard
      } else {
        console.error("Login failed: ", data.error);
        // Handle login failure, e.g., display an error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error, e.g., display an error message
    }
  };

  const onFinish = (values: any) => {
    setUsername(values.username);
    setPassword(values.password);
  };

  useEffect(() => {
    if (username && password) {
      handleLogin();
    }
  }, [username, password]);

  return (
    <>
      <h1>Login</h1>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/Register">register now!</Link>
        </Form.Item>
      </Form>
    </>
  );
};

export default Login;
