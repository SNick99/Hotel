import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentEmployee,
  logoutEmployee,
} from "./redux/actions/authActions";
import store from "./store";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";

//check for token
if (localStorage.jwtToken) {
  //Set auth token  header auth
  setAuthToken(localStorage.jwtToken);
  //Decoded token and get info employee and ex
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set emploee and isAuthenticated
  store.dispatch(setCurrentEmployee(decoded));

  //check fro expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutEmployee());

    //Redirect to login
    window.location.href = "employee/login";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path={"/"} exact component={Landing} />
          <div className="container">
            <Switch>
              <Route path={"/employee/register"} exact component={Register} />
              <Route path={"/employee/login"} exact component={Login} />
            </Switch>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
