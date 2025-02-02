import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { withRouter } from "react-router-dom";
import * as Yup from "yup";

import axiosWithAuth from "../axios";
import styled from "styled-components";

import FormContainer from "../components/styled_components/FormContainer";
import FormLabel from "../components/styled_components/FormLabel";
import FormButton from "../components/styled_components/FormButton";



const Title = styled.h1`
  color: white;
`

const EditForm = ({
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
    console.log(house, houseList);
    setValues(house);
  }, [status]);

  return (
    <div>
      <Title>Edit House</Title>
      <Form>
        <FormContainer>
        <FormLabel>
          {" "}
          ZIP Code
          <Field type="number" name="zipCode" placeholder="Enter ZIP" />
          {touched.zipCode && errors.zipCode && <p>{errors.zipCode}</p>}
        </FormLabel>
        <FormLabel>
          {" "}
          Year Built
          <Field type="number" name="yearBuilt" placeholder="year" />
          {touched.yearBuilt && errors.yearBuilt && <p>{errors.yearBuilt}</p>}
        </FormLabel>
        <FormLabel>
          {" "}
          Square Footage
          <Field type="number" name="squareFootage" placeholder="Square Feet" />
          {touched.squareFootage && errors.squareFootage && (
            <p>{errors.squareFootage}</p>
          )}
        </FormLabel>
        <FormLabel>
          {" "}
          Bedrooms
          <Field type="number" name="bedrooms" placeholder="# of Bedrooms" />
          {touched.bedrooms && errors.bedrooms && <p>{errors.bedrooms}</p>}
        </FormLabel>
        <FormLabel>
          {" "}
          Bathrooms
          <Field type="number" name="bathrooms" placeholder="# of bathrooms" />
          {touched.bathrooms && errors.bathrooms && <p>{errors.bathrooms}</p>}
        </FormLabel>
        <FormButton type="submit">Submit</FormButton>
        </FormContainer>
      </Form>
    </div>
  );
};

const FormikEditForm = withFormik({
  mapPropsToValues({ zipCode, yearBuilt, squareFootage, bedrooms, bathrooms }) {
    return {
      zipCode: zipCode,
      yearBuilt: yearBuilt,
      squareFootage: squareFootage,
      bedrooms: bedrooms,
      bathrooms: bathrooms
    };
  },
  validationSchema: Yup.object().shape({
    zipCode: Yup.number()
      .integer("Must be integer")
      .required("Zip Code of house is required"),
    yearBuilt: Yup.number()
      .min(1900, "Must be greater than 1900")
      .integer("Must be integer")
      .required("Year house was built is required"),
    squareFootage: Yup.number()
      .min(400, "Must be between 400 and 10,000")
      .max(10000, "Must be between 400 and 10,000")
      .integer("Must be integer")
      .required("Squrare footage of house is required"),
    bedrooms: Yup.number()
      .min(1, "Must be between 1 and 8")
      .max(8, "Must be between 1 and 8")
      .integer("Must be integer")
      .required("Number of bedrooms is required"),
    bathrooms: Yup.number()
      .min(0.5, "Must be between 0.5 and 6")
      .max(6, "Must be between 0.5 and 6")
      .required("Number of bathrooms is required")
  }),
  handleSubmit(
    { zipCode, yearBuilt, squareFootage, bedrooms, bathrooms },
    { props, setStatus, resetForm }
  ) {
    axiosWithAuth()
      .put(
        `https://appraisersapp.herokuapp.com/api/houses/${props.match.params.id}`,
        { zipCode, yearBuilt, squareFootage, bedrooms, bathrooms }
      )
      .then(res => {
        console.log(res);
        setStatus(res.data);
        props.history.push("/appraised");
        resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  }
})(EditForm);

export default withRouter(FormikEditForm);
