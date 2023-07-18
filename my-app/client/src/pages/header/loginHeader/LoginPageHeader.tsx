import React from "react";
import { Link } from "react-router-dom";
import { LoginProps } from "../../Login";
import "./LoginPageHeader.css";

const LoginPageHeader: React.FC<LoginProps> = (props) => {
  return (
    <>
      <div className="header-container">
        <div className="left-side">
          <Link to="/" className="logo-btn">
            <h1 className="logo-words">RHPAM Demo Job Portal</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LoginPageHeader;
