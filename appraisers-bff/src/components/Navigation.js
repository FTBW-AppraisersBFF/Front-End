import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;

`

export default function Navigation() {
  const user = localStorage.getItem('userID');
  return (
    <>
<<<<<<< HEAD
      <h1>Brand Name</h1>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/account">Add New House</NavLink>
=======
      <h1>{user}</h1>
>>>>>>> 9fc83ea0266ec8d31c0e2b1e3a480ef32ae7c83c
    </>
  );
}