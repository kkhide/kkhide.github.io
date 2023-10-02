import React from "react";
import options from "./options.json";
import "./Input.scss";
import { useState } from "react";

const Input = ({
  name,
  label,
  isEmail,
  state,
  setState,
  isInteractsWithTheField,
  isPassword,
}) => {
  const [select, setSelect] = useState("@" + options[0]);
  const handleChangeOption = (e) => {
    const copyState = JSON.parse(JSON.stringify(state));
    const index = copyState.indexOf(select);
    const newState = copyState.slice(0, index);

    setSelect(e.target.value);
    setState(newState + e.target.value);
  };
  const handleChangeText = (e) => {
    if (!e.target.value.trim()) {
      setState(null);
    }
    if (isEmail) {
      setState(e.target.value + select);
    } else {
      setState(e.target.value);
    }
  };
  return (
    <>
      <div>
        {label && (
          <label htmlFor={name} className="input-label">
            {label}
          </label>
        )}
        <div className="input-group">
          <input
            type={isPassword ? "password" : "text"}
            id={name}
            value={isInteractsWithTheField && state}
            className={`input ${!isEmail && "border-radius"}`}
            onChange={handleChangeText}
          />
          {isEmail && (
            <select name="" id="" onChange={handleChangeOption}>
              {options?.map((item, index) => {
                return (
                  <option key={index} value={`@${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          )}
        </div>
      </div>
    </>
  );
};

export default Input;
