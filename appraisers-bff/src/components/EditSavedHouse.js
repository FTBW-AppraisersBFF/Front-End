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

// const token = localStorage.getItem("token");
const uniqueID = localStorage.getItem("userid");
// const decodedID = jwt(token);

// console.log(decodedID)

const Title = styled.h1`
  color: white;
`;

const EditSavedForm = ({
  match,
  setValues,
  errors,
  touched,
  status,
  savedHouseList,
  setSavedHouseList
}) => {
  const id = Number(match.params.id);
  useEffect(() => {
    status && setSavedHouseList(currState => [...currState, status]);
    const house = savedHouseList.find(house => house.id === id);
    // console.log(house, houseList);
    setValues(house);
  }, [status]);

  return (
    <div>
      <Title>Edit Save House</Title>
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
              name="interestLevel"
              placeholder="enter value between 0-100"
            />
            {touched.interestLevel && errors.interestLevel && <p>{errors.interestLevel}</p>}
          </FormLabel>
      

          <FormButton type="submit">Submit</FormButton>
        </FormContainer>
      </Form>
    </div>
  );
};

const FormikEditSavedForm = withFormik({
  mapPropsToValues({ name, interestLevel, houseID, userID, props }) {
    
    // console.log(id)
    return {
      name: name || '',
      interestLevel: interestLevel || '',
      houseID: houseID,
      userID: userID,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required("Title is required"),
    interestLevel: Yup.number()
      .min(0, "Must be 0 or greater than 0")
      .max(100, "Must be between 0 and 100")
      .integer("Must be integer")
      .required("interest level is required"),
  }),
  handleSubmit(
    { name, interestLevel, houseID, userID },
    { props, setStatus, resetForm },
  ) {
    axiosWithAuth()
      .put(
        `https://appraisersapp.herokuapp.com/api/fav/${props.match.params.id}`,
        { name, interestLevel, houseID:props.match.params.id, userID:uniqueID }
      )
      .then(res => {
        debugger
        setStatus(res.data);
        console.log("Successfully Saved!");
        props.history.push("/dashboard");
        resetForm();
      })
      .catch(error => {
        debugger
        console.log(error);
      });
  }
})(EditSavedForm);

export default withRouter(FormikEditSavedForm);
