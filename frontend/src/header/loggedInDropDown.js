import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";

const LoggedInDropdown = ({ logout, email }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>{email.split("@")[0]}</DropdownToggle>
      <DropdownMenu>
        <DropdownItem tag={Link} to={"/account"}>
          Settings
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={logout}>Logout</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LoggedInDropdown;
