import React from "react";
import { Route } from "react-router-dom";

import "./App.css";
import PrivateRoute from "./privateroute";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AccountForm from "./components/AccountForm";

function App() {
  return (
    <div className="App">
      <Route exact path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <Route exact path="/account" component={AccountForm}/>
    </div>
  );
}

export default App;
