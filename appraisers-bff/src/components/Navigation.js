import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";
import axiosWithAuth from "../axios";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;

`

const UserDiv = styled.div`
  display: flex;
  align
  justify-content: flex-start;
  align-content: flex-start;
  padding: 0 10px;
  color: white;
`

export default function Navigation() {
  const user = localStorage.getItem("userID");
  return (
    <>

      <h1>Brand Name</h1>
      <NavBar>
        <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
        <NavLink to="/account" activeClassName="active">Add New House</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/logut">Logout</NavLink>
      </NavBar>
      <UserDiv>
        <h1>Hello, {user}!</h1>
      </UserDiv>

    </>
  );
}