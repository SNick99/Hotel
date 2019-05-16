import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {
    setCurrentEmployee,
    logoutEmployee
} from './redux/actions/authActions';
import store from './store';
// import "./App.css";
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Landing from './components/Landing/Landing';
import Register from './components/Auth/Register/Register';
import Login from './components/Auth/Login/Login';
import EmployesList from './components/EmployesList/EmployesList';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '76vh'
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
                <Navbar />
                <div className={classes.container}>
                    <Route path={'/'} exact component={Landing} />
                    <Switch>
                        <Route path={'/employee/register'} exact component={Register} />
                        <Route path={'/employee/login'} exact component={Login} />
                        <Route path={'/employee/employes'} exact component={EmployesList} />
                    </Switch>
                </div>
                <Footer />
            </BrowserRouter>
        </Provider>
    );
}

export default withStyles(styles)(App);
