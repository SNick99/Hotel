import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { withStyles } from '@material-ui/core/styles';
import {
  setCurrentEmployee,
  logoutEmployee
} from './redux/actions/authActions';
import store from './store';
// import "./App.css";
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Login from './components/Auth/Login/Login';
import AddEmployee from './components/Employees/AddEmployee';
import Employees from './components/Employees/Employees';
import AddCage from './components/Cages/AddCage';
import AllCages from './components/Cages/AllCages';
import AllClients from './components/Clients/AllClients';
import AddClient from './components/Clients/AddClient';
import AllOrders from './components/Orders/AllOrders';
import AddOrder from './components/Orders/AddOrder';
import AllProducts from './components/Products/AllProducts';
import AddProduct from './components/Products/AddProduct';
import AllSchedules from './components/Schedules/AllSchedules';
import AddSchedule from './components/Schedules/AddSchedule';

const styles = {
  container: {
    display: 'flex',
    height: '100vh' /* высота секции равна высоте области просмотра */,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  centerBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  }
};

// check for token
if (localStorage.jwtToken) {
  // Set auth token  header auth
  setAuthToken(localStorage.jwtToken);
  // Decoded token and get info employee and ex
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set emploee and isAuthenticated

  store.dispatch(setCurrentEmployee(decoded));

  // check fro expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutEmployee());

    // Redirect to login
    window.location.href = 'employee/login';
  }
}

function App(props) {
  const { classes } = props;

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className={classes.container}>
          <Navbar />
          <div className={classes.centerBlock}>
            <Route path={'/'} exact component={Landing} />
            <Switch>
              <Route path={'/employee/login'} exact component={Login} />
              <Route
                path={'/employee/addEmployee'}
                exact
                component={AddEmployee}
              />
              <Route
                path={'/employee/allEmpoloyees'}
                exact
                component={Employees}
              />
              <Route path={'/cage/allCages'} exact component={AllCages} />
              <Route path={'/cage/addCage'} exact component={AddCage} />
              <Route path={'/client/allClients'} exact component={AllClients} />
              <Route path={'/client/addClient'} exact component={AddClient} />
              <Route path={'/order/allOrders'} exact component={AllOrders} />
              <Route path={'/order/addOrder'} exact component={AddOrder} />
              <Route
                path={'/product/allProducts'}
                exact
                component={AllProducts}
              />
              <Route
                path={'/product/addProduct'}
                exact
                component={AddProduct}
              />
              <Route
                path={'/schedule/allSchedules'}
                exact
                component={AllSchedules}
              />
              <Route
                path={'/schedule/addSchedule'}
                exact
                component={AddSchedule}
              />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default withStyles(styles)(App);
