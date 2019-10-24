import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import { withRouter, Link } from "react-router-dom";
import * as Yup from "yup";



import axiosWithAuth from "../axios";

// imported components
import FormButton from "./styled_components/FormButton";
import FormLabel from "./styled_components/FormLabel";
import ButtonDiv from "./styled_components/ButtonDiv";
import FormContainer from "./styled_components/FormContainer";
import BodyDiv from "./styled_components/BodyDiv";




const AccountForm = ({
  setValues,
  errors,
  touched,
  status,
  houseDetails,
  setHouseDetails
}) => {
  useEffect(() => {
    status && setHouseDetails(houseDetails => [...houseDetails, status]);
  }, [status]);

  return (
    <BodyDiv>
      <h2>Enter Your House Information Below</h2>
      <Form>
        <FormContainer>
          <FormLabel>
            {" "}
            ZIP Code:
            <Field type="number" name="zipCode" placeholder="Enter ZIP" />
            {touched.zipCode && errors.zipCode && <p>{errors.zipCode}</p>}
          </FormLabel>
          <FormLabel>
            {" "}
            Year Built:
            <Field type="number" name="yearBuilt" placeholder="year" />
            {touched.year && errors.year && <p>{errors.year}</p>}
          </FormLabel>
          <FormLabel>
            {" "}
            Square Footage:
            <Field
              type="number"
              name="squareFootage"
              placeholder="Square Feet"
            />
            {touched.squareFootage && errors.squareFootage && (
              <p>{errors.squareFootage}</p>
            )}
          </FormLabel>
          <FormLabel>
            {" "}
            Bedrooms:
            <Field type="number" name="bedrooms" placeholder="# of Bedrooms" />
            {touched.bedrooms && errors.bedrooms && <p>{errors.bedrooms}</p>}
          </FormLabel>
          <FormLabel>
            {" "}
            Bathrooms:
            <Field
              type="number"
              name="bathrooms"
              placeholder="# of bathrooms"
            />
            {touched.bathrooms && errors.bathrooms && <p>{errors.bathrooms}</p>}
          </FormLabel>
          <ButtonDiv>
            <FormButton type="submit">Submit</FormButton>
            <FormButton type="reset">Reset</FormButton>
          </ButtonDiv>
        </FormContainer>
      </Form>
    </BodyDiv>
  );
};

    




const FormikAccountForm = withFormik({
  mapPropsToValues({ zipCode, yearBuilt, squareFootage, bedrooms, bathrooms }) {
    return {
      zipCode: zipCode || "",
      yearBuilt: yearBuilt || "",
      squareFootage: squareFootage || "",
      bedrooms: bedrooms || "",
      bathrooms: bathrooms || ""
    };
  },
  validationSchema: Yup.object().shape({
    zipCode: Yup.number()
      .max(99999, "Must be 5 digits in length")
      .min(10000, "Must be 5 digits in length")
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
  handleSubmit(values, {props, setStatus, resetForm }) {
    axiosWithAuth()
      .post("https://appraisersapp.herokuapp.com/api/houses", values)
      .then(res => {
        setStatus(res.data);
        props.history.push("/appraised");
        resetForm();
      })
      .catch(error => {
        console.log(error);
      });
  }
})(AccountForm);

export default withRouter(FormikAccountForm);
