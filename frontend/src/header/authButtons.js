import React, { useState } from "react";
import { Button, Modal } from "reactstrap";

import { connect } from "react-redux";
import { withRouter } from "react-router";

import Login from "../loginModal";
import LoggedInDropdown from "./loggedInDropDown";
import { signOut } from "../redux/actions/user";

const AuthButtons = props => {
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("signup");
  const handleClick = tab => {
    setTab(tab);
    setModalOpen(true);
  };
  if (props.user.token) {
    return (
      <LoggedInDropdown
        logout={() => props.logout(props.user.token)}
        email={props.user.email}
      />
    );
  }
  return (
    <React.Fragment>
      <Button color="primary" onClick={() => handleClick("signup")}>
        Sign Up
      </Button>{" "}
      <Button outline color="primary" onClick={() => handleClick("login")}>
        Sign In
      </Button>{" "}
      <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
        <Login tab={tab} closeModal={() => setModalOpen(false)} />
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: token => {
      return dispatch(signOut(token));
    }
  };
};

const AuthButtonsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthButtons)
);

export default AuthButtonsContainer;
