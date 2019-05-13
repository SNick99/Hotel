import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutEmployee } from "../../redux/actions/authActions";
import "./Navbar.css";

class Navbar extends Component {
  clickLogout = () => {
    this.props.logoutEmployee();
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    const authTrue = (
      <Link
        className="nav-link"
        to="/employee/login"
        onClick={this.clickLogout}
      >
        Выйти
      </Link>
    );
    const authFalse = (
      <Link className="nav-link" to="/employee/login">
        Войти
      </Link>
    );
    return (
      <nav className="nav">
        <div className="main-link">
          {isAuthenticated ? (
            <React.Fragment>
              <div className="nav-item">Главная</div>
              <div className="nav-item">Блог</div>
              <div className="nav-item">Форум</div>
              <div className="nav-item">Контакты</div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="nav-item">Гость</div>
            </React.Fragment>
          )}
        </div>
        <div className="auth-link">
          <div className="nav-item">
            {isAuthenticated ? authTrue : authFalse}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutEmployee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

export default connect(
  mapStateToProps,
  { logoutEmployee }
)(Navbar);
