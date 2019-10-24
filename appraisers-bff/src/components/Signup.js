import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import FormContainer from "./styled_components/FormContainer";
import FormLabel from "./styled_components/FormLabel";
import FormButton from "./styled_components/FormButton";

const SignupApi = "https://appraisersapp.herokuapp.com/api/auth/register";

const initialUserForm = {
  username: "",
  password: ""
};

export default function Signup(props) {
  const [serverError, setServerError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const addUser = (formValues, actions) => {
    const userToPost = {
      username: formValues.username,
      password: formValues.password
    };
    axios
      .post(SignupApi, userToPost)
      .then(res => {
        actions.resetForm();
        props.history.push("/Dashboard");
      })
      .catch(err => {
        debugger;
      });
  };

  return (
    <>
      {serverError}
      <UserForm onSubmit={addUser} />
      {/* {redirect && <Redirect to="/account"/>} */}
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
            <h1>SIGN UP</h1>
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
            <FormButton type="submit">Create Account </FormButton>
            <p>Already have account? <Link to="/login"><span>Log in</span></Link></p>
            </FormContainer>
          </Form>
        );
      }}
    />
  );
};
