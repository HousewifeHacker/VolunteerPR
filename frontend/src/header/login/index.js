import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";
import { withRouter } from "react-router";

import LoginForm from "./loginForm";
import SignupForm from "./signupForm";

const Login = ({ tab, closeModal }) => {
  // defaults to signup tab but can be used to start with login
  const [activeTab, setActiveTab] = useState(tab || "signup");
  useEffect(() => {
    setActiveTab(tab);
  }, [tab]);

  return (
    <Card>
      <CardHeader tag="h6" className="p-0 border-bottom-0">
        <Nav tabs fill>
          <NavItem>
            <NavLink
              active={activeTab === "signup"}
              onClick={() => setActiveTab("signup")}
            >
              Sign Up
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "login"}
              onClick={() => setActiveTab("login")}
            >
              Log In
            </NavLink>
          </NavItem>
        </Nav>
      </CardHeader>
      <CardBody>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="signup">
            <SignupForm closeModal={closeModal} />
          </TabPane>
          <TabPane tabId="login">
            <LoginForm closeModal={closeModal} />
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};

const LoginContainer = withRouter(Login);

export default LoginContainer;
