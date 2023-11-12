import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from './SourceLink';

const FooterAdmin = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          2021 shopshoes<SourceLink></SourceLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default FooterAdmin;
