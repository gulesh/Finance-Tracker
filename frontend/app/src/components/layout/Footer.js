import React, { Fragment } from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Finance Tracker</p>
      </footer>
    </Fragment>
  );
};

export default Footer;
