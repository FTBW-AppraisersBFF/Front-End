import React, {useState, useEffect} from "react";
import axiosWithAuth from "../axios";

export default function Dashboard() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    axiosWithAuth().get("https://appraisersapp.herokuapp.com/api/houses")
      .then(res => {
        console.log(res.data);
        setHouses(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])
  return (
    <>
      <h1>Dashboard Here</h1>
    </>
  );
}
