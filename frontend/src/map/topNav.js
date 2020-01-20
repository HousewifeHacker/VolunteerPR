// nested routing example https://stackblitz.com/edit/react-router-dom-4-nested-example?file=index.js
import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

const TopNav = ({ match, tabs, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {tabs.map((tab, idx) => {
              return (
                <NavItem key={idx}>
                  <NavLink
                    href={`${match.url}/${tab.route}`}
                    active={activeTab === tab.route}
                  >
                    {tab.text}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNav;
