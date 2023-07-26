import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./HomePageHeader.css";
import { Button } from "antd";
import { AuthContext } from "../../../App";

const HomePageHeader: React.FC = () => {
  const authContext = useContext(AuthContext);

  const handleLogout = () => {
    authContext.logout();
  };

  return (
    <div className="header-container">
      <div className="logo-words">
        <Link to="/">
          <h1>RHPAM Demo Job Portal</h1>
        </Link>
      </div>
      <div className="right-side">
        <Button type="primary" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default HomePageHeader;
