import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;

`

export default function Navigation() {
  const user = localStorage.getItem("userID");
  return (
    <>

      <h1>Brand Name</h1>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/account">Add New House</NavLink>

      <h1>{user}</h1>

    </>
  );
}