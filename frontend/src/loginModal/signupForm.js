import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Input,
  Spinner
} from "reactstrap";

import useForm from "../utils/useForm";
import { signUpAttempt } from "../redux/actions";

const validate = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 7) {
    errors.password = "Password must be at least 8 characters";
  } else if (!isNaN(values.password)) {
    errors.password = "Password cannot contain only numbers";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Password confirmation is required";
  } else if (values.password !== values.confirmPassword) {
    errors.password = "Passwords do not match";
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};

const SignupForm = (props) => {
  const { values, errors, handleChange, handleSubmit, resetForm } = useForm(
    () =>
      props
        .handleSignUp(values.email, values.password, values.confirmPassword)
        .then((result) => {
          resetForm();
          if (result.success) {
            props.closeModal();
          }
        }),
    validate
  );
  const serverErrors = props.user.signUpErrors;

  return (
    <Fragment>
      <h2>Create An Account</h2>
      <Form className="text-left" noValidate onSubmit={handleSubmit}>
        {serverErrors.length ? (
          <Alert color="danger">
            There were errors with your submission:
            <ul>
              {serverErrors.map((serverError, i) => {
                return <li key={i}>{serverError}</li>;
              })}
            </ul>
          </Alert>
        ) : (
          ""
        )}
        <FormGroup row>
          <Col md="4">
            <Label>Email</Label>
          </Col>
          <Col md="8">
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email || ""}
              invalid={!!errors.email}
            />
            <FormFeedback>{errors.email}</FormFeedback>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="4">
            <Label>Password</Label>
          </Col>
          <Col md="8">
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password || ""}
              invalid={!!errors.password}
            />
            <FormFeedback>{errors.password}</FormFeedback>
            <FormText color="muted">
              Passwords must:{" "}
              <ul>
                <li>have a minimum of 8 characters</li>
                <li>contain more than numeric characters</li>
                <li>not be in list of most popular passwords</li>
                <li>not be too similar to email</li>
              </ul>
            </FormText>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="4">
            <Label>Confirm Password</Label>
          </Col>
          <Col md="8">
            <Input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              value={values.confirmPassword || ""}
              invalid={!!errors.confirmPassword}
            />
            <FormFeedback>{errors.confirmPassword}</FormFeedback>
          </Col>
        </FormGroup>

        <Button color="primary" block>
          {props.user.isFetching ? <Spinner color={"secondary"} /> : "Sign Up"}
        </Button>
      </Form>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSignUp: (email, password, re_password) => {
      return dispatch(
        signUpAttempt(email, password, re_password, ownProps.history)
      );
    }
  };
};

const SignupContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupForm)
);

export default SignupContainer;
