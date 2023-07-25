import React from "react";
import { Link } from "react-router-dom";
import "./HomePageHeader.css";
import { Button } from "antd";
import jBPMService from "../../../jBPMServer/jBPMClient";
import { useNavigate } from "react-router-dom";

export interface HomePageHeaderProps {
  logout: () => void;
}

const HomePageHeader: React.FC<HomePageHeaderProps> = (props) => {
  const { logout } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
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
