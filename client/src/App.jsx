import React from "react";
import Login from "./components/Login";
import Users from "./components/Users";
import Messages from "./components/Messages";
import { ToastContainer } from "react-toastify";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration";

import "./styles/App.scss";
import "react-toastify/dist/ReactToastify.css";

const mainRoutes = (
  <Routes>
    <Route path="/users" element={<Users />} />
    <Route path="/messages" element={<Messages />} />
    <Route path="*" element={<Navigate to="/messages" replace />} />
  </Routes>
);

const authRoutes = (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/registration" element={<Registration />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

const App = () => {
  const isAuth = localStorage.getItem("accessToken");

  return (
    <>
      <div className="app-page">
        <div className="app-container">{isAuth ? mainRoutes : authRoutes}</div>
      </div>
      <>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    </>
  );
};

export default App;
