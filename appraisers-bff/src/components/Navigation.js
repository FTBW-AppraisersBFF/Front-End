import React from "react";

export default function Navigation() {
  const user = localStorage.getItem('userID');
  return (
    <>
      <h1>{user}</h1>
    </>
  );
}
