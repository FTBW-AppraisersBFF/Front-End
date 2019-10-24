import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid silver
`;

const UserDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-content: flex-start;
  padding: 0 10px;
  color: white;
`;

export default function Navigation(props) {
  const user = localStorage.getItem("userID");
  const onLogout = () => {
    // Implement!
    // 1- We need to flush token from local storage
    localStorage.clear();
    // 2- We need to redirect users to login route
    props.history.replace("/");
  };
  return (
    <>
      <h1>Brand Name</h1>
      <NavBar>
        <NavLink to="/dashboard" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/account" activeClassName="active">
          Add New House
        </NavLink>
        {user ? <NavLink to="/" onClick={onLogout} activeClassName="logout">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
        <NavLink to="/signup">Sign up</NavLink>
        <NavLink to="/appraised">Appraised</NavLink>
        <NavLink to="/" onClick={onLogout}>Logout</NavLink>
      </NavBar>
      {user && (
        <UserDiv>
          <h1>Hello, {user}!</h1>
        </UserDiv>
      )}
    </>
  );
}
