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
    open: false,
    openCage: false,
    openClient: false
  };

  handleToggle = item => {
    this.setState({ [item]: !this.state[item] });
  };

  handleClose = event => {
    if (
      this.btnEmployee.contains(event.target) ||
      this.btnCage.contains(event.target) ||
      this.btnClient.contains(event.target)
    ) {
      return;
    }

    this.setState({ open: false, openCage: false, openClient: false });
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
                inputprops={{ btnEmployee: '' }}
                buttonRef={node => {
                  this.btnEmployee = node;
                }}
                onClick={() => this.handleToggle('open')}
                className={classes.link}
              >
                Сотрудник
              </Button>
              <Popper
                open={this.state.open}
                anchorEl={this.btnEmployee}
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
                            to="/employee/addEmployee"
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

              <Button
                inputprops={{ btnCage: '' }}
                buttonRef={node => {
                  this.btnCage = node;
                }}
                onClick={() => this.handleToggle('openCage')}
                className={classes.link}
              >
                Клетка
              </Button>
              <Popper
                open={this.state.openCage}
                anchorEl={this.btnCage}
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
                            to="/cage/allCages"
                            className={classes.toggleLink}
                          >
                            Все клетки
                          </Button>
                          <Button
                            onClick={this.handleClose}
                            component={Link}
                            to="/cage/addCage"
                            className={classes.toggleLink}
                          >
                            Добавить клетку
                          </Button>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Button component={Link} to="/" className={classes.link}>
                Продукт
              </Button>
              <Button
                inputprops={{ btnClient: '' }}
                buttonRef={node => {
                  this.btnClient = node;
                }}
                onClick={() => this.handleToggle('openClient')}
                className={classes.link}
              >
                Клиент
              </Button>
              <Popper
                open={this.state.openClient}
                anchorEl={this.btnClient}
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
                            to="/client/allClients"
                            className={classes.toggleLink}
                          >
                            Все клиенты
                          </Button>
                          <Button
                            onClick={this.handleClose}
                            component={Link}
                            to="/client/addClient"
                            className={classes.toggleLink}
                          >
                            Добавить клиента
                          </Button>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
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
