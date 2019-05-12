import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing/Landing";
import Register from "./components/Auth/Register/Register";
import Login from "./components/Auth/Login/Login";

function App() {
  return (
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
  );
}

export default App;
