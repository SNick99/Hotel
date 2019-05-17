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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

import MenuList from '@material-ui/core/MenuList';

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'black',
    color: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  link: {
    color: 'white',
    fontSize: '12px'
  },
  toggleLink: {
    color: 'black',
    fontSize: '12px'
  },
  MenuList: {
    display: 'flex',
    flexDirection: 'column'
  }
};

class Navbar extends Component {
  state = {
    open: false
  };

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }

    this.setState({ open: false });
  };

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
            <div>
              <Button component={Link} to="/" className={classes.link}>
                Главная
              </Button>

              <Button
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                onClick={this.handleToggle}
                className={classes.link}
              >
                Сотрудник
              </Button>
              <Popper
                open={this.state.open}
                anchorEl={this.anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom'
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList className={classes.MenuList}>
                          <Button
                            onClick={this.handleClose}
                            component={Link}
                            to="/employee/allEmpoloyees"
                            className={classes.toggleLink}
                          >
                            Все сотрудники
                          </Button>
                          <Button
                            onClick={this.handleClose}
                            component={Link}
                            to="/employee/register"
                            className={classes.toggleLink}
                          >
                            Добавить сотрудника
                          </Button>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>

              <Button component={Link} to="/" className={classes.link}>
                Клетка
              </Button>
              <Button component={Link} to="/" className={classes.link}>
                Продукт
              </Button>
            </div>
          ) : (
            <Button component={Link} to="/" className={classes.link}>
              Главная
            </Button>
          )}
          <Button
            component={Link}
            to="/employee/login"
            onClick={this.clickLogout}
            className={classes.link}
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
