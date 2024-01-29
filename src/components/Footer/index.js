import React from "react";
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;
    return `${previousYear}-${currentYear}`;
  };

  return (
    <React.Fragment>
      <footer className="footer">
        <div className="container-fluid">
          <div className="copyright-text">
            Copyright {getYearRange()} <Link to="/">Workiz</Link> All Rights
            Reserved.
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
