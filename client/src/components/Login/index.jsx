/* eslint-disable no-restricted-globals */
import React from "react";
import { useState } from "react";
import { request } from "../../utils/request";
import Input from "../Input";
import { Link } from "react-router-dom";
import SendButton from "../SendButton";

import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSend = async () => {
    if (email.trim() && password.trim()) {
      const result = await request.login(email, password);
      if (result) {
        location.href = "/";
      }
    }
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h2>Auth</h2>
          <Input
            name="login-email"
            label="Email"
            state={email}
            setState={setEmail}
            isEmail
          />
          <Input
            name="login-password"
            label="Password"
            state={password}
            setState={setPassword}
            isPassword
          />
          <SendButton text="Отправить" onClick={handleSend} />
        </div>
        <div className="auth-redirect">
          <span>If you don't have an account, you can </span>
          <Link to="/registration">register</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
