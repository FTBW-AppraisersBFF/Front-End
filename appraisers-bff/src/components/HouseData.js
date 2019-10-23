import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosWithAuth from "../axios";

import FormButton from "../components/styled_components/FormButton";

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
  const editHouse = id => e => {
    props.history.push(`/edit/${id}`);
  };

  const deleteHouse = data => e => {
    axiosWithAuth()
      .delete(`https://appraisersapp.herokuapp.com/api/houses/${data.id}`)
      .then(data => {
        // debugger
        props.setHouseList(props.houseList.filter(house => house.id !== data));
        window.location.reload();
      })
      .catch(err => {
        debugger;
        console.log(err);
      });
  };

  useEffect(() => {
    axiosWithAuth()
      .get("https://appraisersapp.herokuapp.com/api/houses")
      .then(res => {
        props.setHouseList(res.data);
      })
      .catch(error => {
        alert(error.message);
      });
    deleteHouse();
  }, []);
  return (
    <>
      <Title>All House Data</Title>
     <DashboardContainer>
      {props.houseList.map(house => (
        <>
          <HouseDiv key={house.id}>
            <h2> Price: {house.price}</h2>
            <div> Squre Feet: {house.squareFootage}</div>
            <div> Bedrooms: {house.bedrooms}</div>
            <div> Bathrooms: {house.bathrooms}</div>
            <div> Zip Code: {house.zipCode}</div>
            <div> Year Built: {house.yearBuilt}</div> <br />
            <FormButton type="button" onClick={editHouse(house.id)}>
              edit
            </FormButton>
            &nbsp;
            <FormButton type="button">save</FormButton> &nbsp;
            <FormButton type="button" onClick={deleteHouse(house)}>
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
