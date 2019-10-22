import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import PrivateRoute from "./privateroute";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AccountForm from "./components/AccountForm";

function App() {
  return (
    <div className="App">
      <Route exact path="/login" component={Navigation} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/account" component={AccountForm}/>
    </div>
  );
}

export default App;
