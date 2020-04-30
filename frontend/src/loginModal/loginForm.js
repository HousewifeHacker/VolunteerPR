import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import {
  Alert,
  Button,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  Spinner
} from "reactstrap";

import useForm from "../utils/useForm";
import { signInAttempt } from "../redux/actions/user";
import { Link } from "react-router-dom";

const validate = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email address is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

const LoginForm = ({ handleSignIn, user, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, errors, handleChange, handleSubmit } = useForm(() => {
    handleSignIn(values.email, values.password).then((result) => {
      if (result.success) {
        closeModal();
      }
    });
  }, validate);

  function togglePassword() {
    setShowPassword(!showPassword);
  }
  // just have 1 unknown error for now
  const serverError = user.signInErrors[0];
  return (
    <Fragment>
      <h2>Log In</h2>
      <Form className="text-left" noValidate onSubmit={handleSubmit}>
        {serverError ? (
          <Alert color="danger">
            {serverError}
            <p className={"mb-0"}>
              <Link to="/signin_help" onClick={closeModal}>
                Trouble logging in?
              </Link>
            </p>
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
              type="text"
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
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={values.password || ""}
              invalid={!!errors.password}
            />
            <FormFeedback>{errors.password}</FormFeedback>
          </Col>
        </FormGroup>

        <div>
          <Button
            className="float-right"
            onClick={togglePassword}
            color={"link"}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </Button>
        </div>

        <Button color="primary" block>
          {user.isFetching ? <Spinner color={"secondary"} /> : "Log In"}
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

// gives props.handleSignIn that will perform redux action sign in attempt
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSignIn: (email, password) => {
      return dispatch(signInAttempt(email, password, ownProps.history));
    }
  };
};

const LoginContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);

export default LoginContainer;
