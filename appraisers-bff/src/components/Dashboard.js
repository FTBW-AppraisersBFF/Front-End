import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosWithAuth from "../axios";

import FormButton from "../components/styled_components/FormButton";

const userName = localStorage.getItem("userID");

const HouseDiv = styled.div`
  background-color: white;
  width: 30%;
  margin: 10px 10px;
  border: 2px solid black;
  padding-bottom: 20px;
`;

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
`
const Title = styled.h1`
  color: white;
`

const HouseData = props => {
  const editsavedHouse = id => e => {
    props.history.push(`/api/fav/${id}`);
  };
  

  const deleteSavedHouse = data => e => {
    axiosWithAuth()
      .delete(`https://appraisersapp.herokuapp.com/api/fav/${data.id}`)
      .then(data => {
        // debugger
        props.setSavedHouseList(props.savedHouseList.filter(house => house.id !== data));
        window.location.reload();
      })
      .catch(err => {
        debugger;
        console.log(err);
      });
  };

  useEffect(() => {
    axiosWithAuth()
      .post(`https://appraisersapp.herokuapp.com/api/fav/user`, {username:userName})
      .then(res => {
        props.setSavedHouseList(res.data);
      })
      .catch(error => {
        alert(error.message);
      });
  }, []);
  return (
    <>
      <Title>All Saved  House Data</Title>
     <DashboardContainer>
      {props.savedHouseList.map(house => (
        <>
          <HouseDiv key={house.id}>
            <h2> Name: {house.name}</h2>
            <div> Price: {house.price}</div>
            <div>Level of interest: {house.interestLevel}%</div>
            <FormButton type="button" onClick={editsavedHouse(house.id)}>
              edit
            </FormButton>
            &nbsp;
            
            <FormButton type="button" onClick={deleteSavedHouse(house)}>
              delete
            </FormButton>{" "}
            &nbsp;
          </HouseDiv>
          <br />
        </>
      ))}
    </DashboardContainer>
    </>
  );
};

export default HouseData;
