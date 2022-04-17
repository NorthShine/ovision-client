import React, { Fragment } from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Outlet } from 'react-router';

export const MainLayout = () => {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Chat Roulette</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Chatrooms" id="basic-nav-dropdown">
                <NavDropdown.Item href="/ovision-client/rooms/1">
                  Cute
                </NavDropdown.Item>
                <NavDropdown.Item href="/ovision-client/rooms/4">
                  Single
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </Fragment>
  );
};
