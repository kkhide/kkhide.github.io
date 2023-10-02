/* eslint-disable no-restricted-globals */
import React from "react";
import Head from "./components/Head";
import { request } from "../../utils/request";
import "./Layout.scss";

const Layout = ({ children }) => {
  const handleLogout = async () => {
    await request.logout();
    location.reload();
  };

  return (
    <>
      <Head handleLogout={handleLogout} />
      {children}
    </>
  );
};

export default Layout;
