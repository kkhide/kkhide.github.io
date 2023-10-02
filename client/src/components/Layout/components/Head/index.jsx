import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { components } from "../../../../constants/components";
import SendButton from "../../../SendButton";
import "../../Layout.scss";

const Head = ({ handleLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="layout-head">
        <ion-icon name="home-outline" onClick={() => navigate("/")}></ion-icon>
        <div className="layout-navigate">
          {components.map((item, index) => (
            <Link to={item.url} key={index}>
              {item.name}
            </Link>
          ))}
        </div>
        <SendButton text="Logout" onClick={handleLogout} />
      </div>
    </>
  );
};

export default Head;
