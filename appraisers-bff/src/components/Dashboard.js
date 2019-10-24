import React, { useState, useEffect } from "react";
import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 80%;
  margin: 0 auto;
`
// Saved house data should go in HouseCard
const HouseCard = styled.div`
  display: flex;
  margin: 10px 30px;
`

export default function Dashboard() {
  return (
    <>
    <DashboardContainer>
      <HouseCard>
        <h1>Dashboard Here</h1>
      </HouseCard>
    </DashboardContainer>
    </>
  );
}
