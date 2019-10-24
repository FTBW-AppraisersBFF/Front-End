import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";
import uuid from 'uuid';
import jwt from 'jwt-decode';
import axiosWithAuth from "../axios";
import styled from "styled-components";

import FormContainer from "../components/styled_components/FormContainer";
import FormLabel from "../components/styled_components/FormLabel";
import FormButton from "../components/styled_components/FormButton";

const token = localStorage.getItem("token");
const decodedID = jwt(token);

console.log(decodedID)

const Title = styled.h1`
  color: white;
`;

const SaveForm = ({
  match,
  setValues,
  errors,
  touched,
  status,
  houseList,
  setHouseList
}) => {
  const id = Number(match.params.id);
  useEffect(() => {
    status && setHouseList(currState => [...currState, status]);
    const house = houseList.find(house => house.id === id);
    // console.log(house, houseList);
    setValues(house);
  }, [status]);

  return (
    <div>
      <Title>Save House</Title>
      <Form>
        <FormContainer>
          <FormLabel>
            {" "}
            Title: &nbsp;
            <Field type="text" name="name"  placeholder="enter a name to save"/>
            {touched.name && errors.name && <p>{errors.name}</p>}
          </FormLabel>
          <FormLabel>
            {" "}
            Interest:  &nbsp;
            <Field
              type="number"
              name="interestlevel"
              placeholder="enter value between 0-100"
            />
            {touched.interestlevel && errors.interestlevel && <p>{errors.interestlevel}</p>}
          </FormLabel>
          {/* <FormLabel>
            {" "}
            House ID:  &nbsp;
            <Field
              type="number"
              name="houseID"
              placeholder={id}
              value={id}
              
            />
            
          </FormLabel> */}
          {/* 
          <FormLabel>
            {" "}
            User ID:  &nbsp;
            <Field
              type="number"
              name="userID"
              placeholder={uuid()}
              value={uuid()}
              disabled
            />
            
          </FormLabel> */}

          <FormButton type="submit">Submit</FormButton>
        </FormContainer>
      </Form>
    </div>
  );
};

const FormikSaveForm = withFormik({
  mapPropsToValues({ name, interestlevel, houseID, userID, bathrooms, props }) {
    
    // console.log(id)
    return {
      name: name || '',
      interestlevel: interestlevel || '',
      houseID: houseID,
      userID: userID,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Title is required"),
    interestlevel: Yup.number()
      .min(0, "Must be 0 or greater than 0")
      .max(100, "Must be between 0 and 100")
      .integer("Must be integer")
      .required("interest level is required"),
  }),
  handleSubmit(
    { name, interestlevel, houseID, userID },
    { props, setStatus, resetForm },
  ) {
    axiosWithAuth()
      .post(
        `https://appraisersapp.herokuapp.com/api/fav`,
        { name, interestlevel, houseID:props.match.params.id, userID: decodedID.id }
      )
      .then(res => {
        debugger
        setStatus(res.data);
        console.log("Successfully Saved!");
        // props.history.push("/appraised");
        resetForm();
      })
      .catch(error => {
        debugger
        console.log(error);
      });
  }
})(SaveForm);

export default withRouter(FormikSaveForm);
