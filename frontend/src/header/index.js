import React, { useState } from "react";
import {
  Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Brigaid</NavbarBrand>
        <Collapse isOpen={isOpen} navbar>
          <Nav className={"ml-auto"} navbar>
            <NavItem>
              <NavLink href="/map">Map</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Nonprofit</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Volunteer</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Maria Data</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
        <Nav className={"ml-auto"}>
          <NavItem>
            <Button color="primary">Donate</Button>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Language
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Spanish</DropdownItem>
              <DropdownItem>English</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarToggler onClick={toggle} />
      </Navbar>
    </div>
  );
};

export default Header;
