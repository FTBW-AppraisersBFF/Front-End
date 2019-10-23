import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosWithAuth from "../axios";

const HousePriceDiv = styled.div`
  background-color: white;
  width: 60%;
  margin: 0 auto;
`;

const HouseData = props => {
  const [houseList, setHouseList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth()
      .get("https://appraisersapp.herokuapp.com/api/houses")
      .then(res => {
        //  debugger
        setHouseList(res.data);
      })
      .catch(error => {
        //  debugger

        alert(error.message);
      });
  }, []);
  return (
    <div>
      {houseList.map(house => (
        <div key={house.id}>
          <div> price={house.price}</div>
          <div> squareFootage={house.squareFootage}</div>
          <div>bedrooms={house.bedrooms}</div>
          <div>bathrooms={house.bathrooms}</div>
          <div> zipCode={house.zipCode}</div>
          <div> yearBuilt={house.yearBuilt}</div> <br />
        </div>
      ))}
    </div>
  );
};

export default HouseData;
