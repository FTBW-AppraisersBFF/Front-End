import React, { useState } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import PrivateRoute from "./privateroute";
import Navigation from "./components/Navigation";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AccountForm from "./components/AccountForm";
import HouseData from "./components/HouseData";
import EditHouse from "./components/EditHouse";
import SaveHouse from "./components/SaveHouse";

function App(props) {
  const [houseDetails, setHouseDetails] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [savedHouseList, setSavedHouseList] = useState([]);

  return (
    <div className="App">
      <Route path="/" component={Navigation} />
      <h1>Landing page... </h1>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} 
      props={{
        savedHouseList,
        setSavedHouseList
      }}
      />
      <PrivateRoute
        path="/edit/:id"
        component={EditHouse}
        props={{
          houseList,
          setHouseList,
          houseDetails,
          setHouseDetails
        }}
      />
      <PrivateRoute
        path="/save/:id"
        component={SaveHouse}
        props={{
          houseList,
          setHouseList,
          houseDetails,
          setHouseDetails
        }}
      />
      <PrivateRoute
        exact
        path="/account"
        component={AccountForm}
        props={{
          houseList,
          setHouseList,
          houseDetails,
          setHouseDetails
        }}
      />
      <PrivateRoute
        exact
        path="/appraised"
        component={HouseData}
        props={{ houseList, setHouseList }}
      />
    </div>
  );
}

export default App;
