import React, { Component } from "react";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="list">Главная</div>
        <div className="list">Блог</div>
        <div className="list">Форум</div>
        <div className="list">Контакты</div>
      </nav>
    );
  }
}

export default Navbar;
