import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Contact = () => {
  return (
    <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand href="/dashboard">Nerds Of WallStreet</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>

          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="/about">About</NavDropdown.Item>
            <NavDropdown.Item href="/Contact">
              Contact us
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://app.alpaca.markets/login?amp_device_id=C5NudxAN0ne1ACqwaxz6iU">
              alpaca account
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>

      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Contact