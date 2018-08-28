import React from 'react';
import { Nav, Navbar, NavItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const MainNav = () => (
  <Navbar fluid={true} fixedTop={true} inverse={true}>
    <Navbar.Header>
      <Navbar.Brand>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <LinkContainer to="/">
        <NavItem eventKey={1} href="/">
          Home
        </NavItem>
      </LinkContainer>
      
      <LinkContainer to="/admin">
        <NavItem eventKey={2} href="/admin">
          Login
        </NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
)

export default MainNav