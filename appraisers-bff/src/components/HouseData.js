import React from "react";
import styled from "styled-components";

const HousePriceDiv = styled.div`
    background-color: white;
    width: 60%;
    margin: 0 auto;

` 

const HouseData = props => {
    return (
        <div>
            <HousePriceDiv>
                <h2>Your House is worth:</h2>
                <h2>Price: {props.price}</h2>
            </HousePriceDiv>
            <div>
            <h4>House Details:</h4>
                <p>Square Feet: {props.squareFootage}</p>
                <p>Bedrooms: {props.bedrooms}</p>
                <p>Bathrooms: {props.bathrooms}</p>
                <p>Year Built: {props.yearBuilt}</p>
                <p>Zip Code: {props.zipCode}</p>
            </div>
        </div>
    )
}

export default HouseData;