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
    openEmployee: false,
    openCage: false,
    openClient: false,
    openProduct: false,
    openOrder: false,
    openSchedule: false,
    infoNav: {
      Директор: [
        {
          title: 'Сотрудник',
          subtitle1: 'Все сотрудники',
          link1: '/employee/allEmployees',
          subtitle2: 'Добавить сотрудника',
          link2: '/employee/addEmployee',
          forOpen: 'openEmployee',
          forAnchor: 'btnEmployee'
        },
        {
          title: 'Клетка',
          subtitle1: 'Все клетки',
          link1: '/cage/allCages',
          subtitle2: 'Добавить клетку',
          link2: '/cage/addCage',
          forOpen: 'openCage',
          forAnchor: 'btnCage'
        },
        {
          title: 'Товары',
          subtitle1: 'Все товары',
          link1: '/product/allProducts',
          subtitle2: 'Добавить товар',
          link2: '/product/addProduct',
          forOpen: 'openProduct',
          forAnchor: 'btnProduct'
        },
        {
          title: 'Клиент',
          subtitle1: 'Все клиенты',
          link1: '/client/allClients',
          subtitle2: 'Добавить клиента',
          link2: '/client/addClient',
          forOpen: 'openClient',
          forAnchor: 'btnClient'
        },
        {
          title: 'Заказ',
          subtitle1: 'Все заказы',
          link1: '/order/allOrders',
          subtitle2: 'Добавить заказ',
          link2: '/order/addOrder',
          forOpen: 'openOrder',
          forAnchor: 'btnOrder'
        },
        {
          title: 'График',
          subtitle1: 'Весь график',
          link1: '/schedule/allSchedules',
          subtitle2: 'Добавить в график',
          link2: '/schedule/addSchedule',
          forOpen: 'openSchedule',
          forAnchor: 'btnSchedule'
        }
      ],
      Менеджер: [
        {
          title: 'Клетка',
          subtitle1: 'Все клетки',
          link1: '/cage/allCages',
          subtitle2: 'Добавить клетку',
          link2: '/cage/addCage',
          forOpen: 'openCage',
          forAnchor: 'btnCage'
        },
        {
          title: 'Товары',
          subtitle1: 'Все товары',
          link1: '/product/allProducts',
          subtitle2: 'Добавить товар',
          link2: '/product/addProduct',
          forOpen: 'openProduct',
          forAnchor: 'btnProduct'
        },
        {
          title: 'Клиент',
          subtitle1: 'Все клиенты',
          link1: '/client/allClients',
          subtitle2: 'Добавить клиента',
          link2: '/client/addClient',
          forOpen: 'openClient',
          forAnchor: 'btnClient'
        },
        {
          title: 'Заказ',
          subtitle1: 'Все заказы',
          link1: '/order/allOrders',
          subtitle2: 'Добавить заказ',
          link2: '/order/addOrder',
          forOpen: 'openOrder',
          forAnchor: 'btnOrder'
        },
        {
          title: 'График',
          subtitle1: 'Весь график',
          link1: '/schedule/allSchedules',
          subtitle2: 'Добавить в график',
          link2: '/schedule/addSchedule',
          forOpen: 'openSchedule',
          forAnchor: 'btnSchedule'
        }
      ],
      Смотритель: [
        {
          title: 'Заказ',
          subtitle1: 'Все заказы',
          link1: '/order/allOrders',

          forOpen: 'openOrder',
          forAnchor: 'btnOrder'
        },
        {
          title: 'График',
          subtitle1: 'Весь график',
          link1: '/schedule/allSchedules',

          forOpen: 'openSchedule',
          forAnchor: 'btnSchedule'
        }
      ]
    }
  };

  handleToggle = item => {
    this.setState({ [item]: !this.state[item] });
  };

  handleClose = event => {
    if (this.props.auth.employee.Position === 'Директор') {
      if (
        this.btnEmployee.contains(event.target) ||
        this.btnCage.contains(event.target) ||
        this.btnClient.contains(event.target) ||
        this.btnProduct.contains(event.target) ||
        this.btnOrder.contains(event.target) ||
        this.btnSchedule.contains(event.target)
      ) {
        return;
      }
    } else if (this.props.auth.employee.Position === 'Менеджер') {
      if (
        this.btnCage.contains(event.target) ||
        this.btnClient.contains(event.target) ||
        this.btnProduct.contains(event.target) ||
        this.btnOrder.contains(event.target) ||
        this.btnSchedule.contains(event.target)
      ) {
        return;
      }
    } else if (this.props.auth.employee.Position === 'Смотритель') {
      if (
        this.btnOrder.contains(event.target) ||
        this.btnSchedule.contains(event.target)
      ) {
        return;
      }
    }

    this.setState({
      openEmployee: false,
      openCage: false,
      openClient: false,
      openProduct: false,
      openOrder: false,
      openSchedule: false
    });
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
              {this.state.infoNav[this.props.auth.employee.Position].map(
                (item, i) => {
                  return (
                    <React.Fragment key={`key${i}`}>
                      <Button
                        inputprops={{ [item.forAnchor]: '' }}
                        buttonRef={node => {
                          this[item.forAnchor] = node;
                        }}
                        onClick={() => this.handleToggle(item.forOpen)}
                        className={classes.link}
                      >
                        {item.title}
                      </Button>
                      <Popper
                        open={this.state[item.forOpen]}
                        anchorEl={this[item.forAnchor]}
                        transition
                        disablePortal
                      >
                        {({ TransitionProps, placement }) => (
                          <Grow
                            {...TransitionProps}
                            id="menu-list-grow"
                            style={{
                              transformOrigin:
                                placement === 'bottom'
                                  ? 'center top'
                                  : 'center bottom'
                            }}
                          >
                            <Paper>
                              <ClickAwayListener onClickAway={this.handleClose}>
                                <MenuList className={classes.MenuList}>
                                  <Button
                                    onClick={this.handleClose}
                                    component={Link}
                                    to={item.link1}
                                    className={classes.toggleLink}
                                  >
                                    {item.subtitle1}
                                  </Button>
                                  <Button
                                    onClick={this.handleClose}
                                    component={Link}
                                    to={item.link2}
                                    className={classes.toggleLink}
                                  >
                                    {item.subtitle2}
                                  </Button>
                                </MenuList>
                              </ClickAwayListener>
                            </Paper>
                          </Grow>
                        )}
                      </Popper>
                    </React.Fragment>
                  );
                }
              )}
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
            <div style={{ paddingRight: '20px' }}>
              {this.props.auth.employee.Position}
            </div>
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
