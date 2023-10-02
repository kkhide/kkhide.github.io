/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import { request } from "../../utils/request";
import { callToast } from "../../utils/toast";
import Input from "../Input";
import SendButton from "../SendButton";
import { Link } from "react-router-dom";

import "./Registration.scss";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetState = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleRegistration = async () => {
    if (email.trim() && password.trim() && confirmPassword.trim()) {
      if (confirmPassword === password) {
        console.log("Here");
        const result = await request.registration(email, password);
        if (result) {
          location.href = "/";
        }
      } else {
        callToast("warn", "Данные введены неверно");
        resetState();
      }
    }
  };
  return (
    <>
      <div className="auth-container">
        <div className="auth-form">
          <h2>Registration</h2>
          <Input
            name="reg-email"
            label="Email"
            state={email}
            setState={setEmail}
            isEmail
          />
          <Input
            name="reg-password"
            label="Password"
            state={password}
            setState={setPassword}
            isPassword
          />
          <Input
            name="reg-confirm-password"
            label="Confirm password"
            state={confirmPassword}
            setState={setConfirmPassword}
            isPassword
          />
          <SendButton text="Зарегистрироваться" onClick={handleRegistration} />
        </div>
        <div className="auth-redirect">
          <span>Have an account? </span>
          <Link to="/login">Login to your account</Link>
        </div>
      </div>
    </>
  );
};

export default Registration;
