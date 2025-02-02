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

    localStorage.clear();
    props.history.replace("/");
  };
  return (
    <>
      <h1>Zwillow</h1>
      <NavBar>
        <NavLink to="/dashboard" activeClassName="active">
          Dashboard
        </NavLink>
        <NavLink to="/account" activeClassName="active">
          Add New House
        </NavLink>
        <NavLink to="/appraised">Appraised</NavLink>
        {user ? <NavLink to="/" onClick={onLogout} activeClassName="logout">Logout</NavLink> : <NavLink to="/login">Login</NavLink>}
      </NavBar>
      {user && (
        <UserDiv>
          <h1>Hello, {user}!</h1>
        </UserDiv>
      )}
    </>
  );
}
