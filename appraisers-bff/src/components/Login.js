import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import styled from "styled-components";

import FormButton from "../components/styled_components/FormButton";
import FormContainer from "./styled_components/FormContainer";
import FormLabel from "./styled_components/FormLabel";

const Title = styled.h1`
  color: white;
`

const LoginApi = "https://appraisersapp.herokuapp.com/api/auth/login";

const initialUserForm = {
  username: "",
  password: ""
};

export default function Login(props) {
  const [serverError, setServerError] = useState("");

  const addUser = (formValues, actions) => {
    const userToPost = {
      username: formValues.username,
      password: formValues.password
    };
    axios
      .post(LoginApi, userToPost)
      .then(res => {
        localStorage.setItem("userID", userToPost.username);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userid", res.data.userid);
        props.history.push("/account");
      })
      .catch(err => {
        debugger;
      });
  };

  return (
    <>
      {serverError}
      <UserForm onSubmit={addUser} />
    </>
  );
}

const validationSchema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup
    .string()
    .required("No password provided.")
    .min(4, "Password is too short - should be 4 chars minimum.")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
});

const UserForm = ({ onSubmit }) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialUserForm}
      onSubmit={onSubmit}
      render={props => {
        return (
          <Form>
            <FormContainer>
              <h1>LOGIN</h1>
              <FormLabel> 
                <Field
                  className="input-field"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
                <ErrorMessage
                  className="error-field"
                  name="username"
                  component="div"
                />
              </FormLabel>
              <FormLabel>
                <Field
                  className="input-field"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage
                  className="error-field"
                  name="password"
                  component="div"
                />
              </FormLabel>
            <FormButton type="submit">Login </FormButton>
            <p>New User? <Link to="/signup"><span>Sign up</span></Link></p>
            </FormContainer>
          </Form>
        );
      }}
    />
  );
};
