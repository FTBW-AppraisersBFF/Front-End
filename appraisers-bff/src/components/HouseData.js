import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosWithAuth from "../axios";

const HouseDiv = styled.div`
  background-color: white;
  width: 60%;
  margin: 0 auto;
  border: 2px solid black;
`;


const HouseData = props => {
  const [houseList, setHouseList] = useState([]);

  const deleteHouse = (data) => (e) => {
  
      
    axiosWithAuth().delete(`https://appraisersapp.herokuapp.com/api/houses/${data.id}`)
      .then((data) => {
        // debugger
        setHouseList(houseList.filter(house => house.id !== data));
    //    window.location.reload();
      })
      .catch((err) => {
        debugger
        console.log(err)
        }
          );
 
}

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
    <>
      {houseList.map(house => (<>
        <HouseDiv key={house.id}>
          <div> price={house.price}</div>
          <div> squareFootage={house.squareFootage}</div>
          <div>bedrooms={house.bedrooms}</div>
          <div>bathrooms={house.bathrooms}</div>
          <div> zipCode={house.zipCode}</div>
          <div> yearBuilt={house.yearBuilt}</div> <br />
          <button type="button">edit</button>&nbsp;
          <button type="button">save</button> &nbsp;
          <button type="button" onClick={deleteHouse(house)} >delete</button> &nbsp;
        </HouseDiv><br/></>
      ))}
    </>
  );
};

export default HouseData;
