import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const TopNav = ({ match }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href={`${match.url}/needs`}>Needs</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={`${match.url}/necessities`}>Necessities</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={`${match.url}/resources`}>Resources</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href={`${match.url}/volunteer`}>
                Volunteer Opportunities
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNav;
