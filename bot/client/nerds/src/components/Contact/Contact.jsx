import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Contact = () => {
  return (
    <><Navbar bg="light" expand="lg">
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
  <div class="col-md-5 p-lg-5 mx-auto my-5">
  <h1 class="display-4 font-weight-normal">Contact US</h1>
  <p class="lead font-weight-normal">
    Geovanny Casian
    <br></br>casian.geovanny@csu.fullerton.edu
    <br></br>Sergio Murguia
    <br></br>smurguia1@csu.fullerton.edu
    <br></br>Thomas Stanton
    <br></br>Wilson Tu
    <br></br>Rachael Johnson
    <h5>Location</h5>
    Fullerton, CA
  </p>
  </div></>
  )
}

export default Contact