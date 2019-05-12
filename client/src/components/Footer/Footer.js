import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        Copyright &copy; {new Date().getFullYear()} Hotel of Animals
      </footer>
    );
  }
}

export default Footer;
