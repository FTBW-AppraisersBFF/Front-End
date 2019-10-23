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
`

export default function Navigation() {
  const user = localStorage.getItem("userID");
  return (
    <>

      <h1>Brand Name</h1>
<<<<<<< HEAD
      <NavBar>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/account">Add New House</NavLink>
        <NavLink to="/"> Logout</NavLink>
        <NavLink to="/login">Login</NavLink>
      </NavBar>
      <UserDiv>
        <h1>Hello, {user}!</h1>
      </UserDiv>
=======
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/account">Add New House</NavLink>

      <h1>{user}</h1>
>>>>>>> 7bfb376e86cf9c4c2674a898bc109a58ea480130

    </>
  );
}