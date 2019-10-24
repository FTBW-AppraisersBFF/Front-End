import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosWithAuth from "../axios";

import FormButton from "../components/styled_components/FormButton";
const uniqueID = localStorage.getItem("userid");
const userName = localStorage.getItem("userID");
console.log(userName)

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
    props.history.push(`/edit/${id}`);
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

  // const showFav = () => e => {
  //   axiosWithAuth()
  //   .post(`https://appraisersapp.herokuapp.com/api/fav/${userName}`, {username:userName})
  //   .then(res => {
  //     debugger
  //     props.setSavedHouseList(res.data);
  //   })
  //   .catch(error => {
  //     debugger
  //     alert(error.message);
  //   });
  // }

  useEffect(() => {
    const user = {
      username:userName
    };
    axiosWithAuth()
      .post(`https://appraisersapp.herokuapp.com/api/fav/user`, {username:userName})
      .then(res => {
        // debugger
        props.setSavedHouseList(res.data);
      })
      .catch(error => {
        // debugger
        alert(error.message);
      });
    // deleteHouse();
  }, []);
  return (
    <>
      <Title>All Saved  House Data</Title>
      {/* <button type="submit" onClick={showFav(userName)}>Show Fav</button> */}
     <DashboardContainer>
      {props.savedHouseList.map(house => (
        <>
          <HouseDiv key={house.id}>
            <h2> Name: {house.name}</h2>
            <div> Price: {house.price}</div>
            {/* <div> Bedrooms: {house.bedrooms}</div>
            <div> Bathrooms: {house.bathrooms}</div>
            <div> Zip Code: {house.zipCode}</div>
            <div> Year Built: {house.yearBuilt}</div> <br /> */}
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
