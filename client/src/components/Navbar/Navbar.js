import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutEmployee } from '../../redux/actions/authActions';
//import "./Navbar.css";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  navbar: {
    flex: '1 0 auto',
    justifyContent: 'space-between',
    background: 'black',
    color: 'white',
    minHeight: '12vh'
  }
};

class Navbar extends Component {
  clickLogout = () => {
    this.props.logoutEmployee();
  };
  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.auth;
    return (
      <AppBar position="static" color="inherit">
        <Toolbar className={classes.navbar}>
          {isAuthenticated ? (
            <>
              <Button component={Link} to="/" color="default">
                Главная
              </Button>
              <Button component={Link} to="/" color="inherit">
                Блог
              </Button>
              <Button component={Link} to="/" color="inherit">
                Форум
              </Button>
              <Button component={Link} to="/" color="inherit">
                Контакты
              </Button>
            </>
          ) : (
            <Typography variant="h6" color="inherit">
              Гость
            </Typography>
          )}
          <Button
            component={Link}
            to="/employee/login"
            color="inherit"
            onClick={this.clickLogout}
          >
            {isAuthenticated ? 'Выйти' : 'Войти'}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  logoutEmployee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { logoutEmployee }
)(withStyles(styles)(Navbar));
