import React from "react";
import { Link } from "react-router-dom";
import "./LoginPageHeader.css";

const LoginPageHeader: React.FC = () => {
  return (
    <>
      <div className="logo-words">
        <Link to="/">
          <h1>RHPAM Demo Job Portal</h1>
        </Link>
      </div>
    </>
  );
};

export default LoginPageHeader;
