import React from "react";
import { Link } from "react-router-dom";
import "./HomePageHeader.css";
import { Button } from "antd";
import jBPMService from "../../../jBPMServer/jBPMClient";
import { useNavigate } from "react-router-dom";

export interface HomePageHeaderProps {
  service: jBPMService;
}

const HomePageHeader: React.FC<HomePageHeaderProps> = (props) => {
  const { service } = props;
  const navigate = useNavigate();

  const handleLogout = () => {
    service.resetCredentials();
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="left-side">
        <Link to="/" className="logo-btn">
          <h1 className="logo-words">RHPAM Demo Job Portal</h1>
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
