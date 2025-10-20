import React from "react";
import "../../styles/components/common/Header.css";

const Header = ({ title, subtitle }) => {
  return (
    <header className="app-header">
      <div className="header-container">
        <h1 className="header-title">{title || "Campus Hostels"}</h1>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
};

export default Header;
