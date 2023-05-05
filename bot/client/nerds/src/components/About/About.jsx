import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const About = () => {


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
    </Navbar><div class="col-md-5 p-lg-5 mx-auto my-5">
        <h1 class="display-4 font-weight-normal">Nerds Of WallStreet</h1>
        <p class="lead font-weight-normal">The use of one's personal capital on an investment platform has always entailed risk. This risk causes a person to freeze up in making decisions regarding their monies. This is why many decide to entrust their finances to expert individuals to take care of their portfolios for them, for a price. NerdsofWallStreet wants to bet our finances on the power of AI that will trade automatically for us using the ability of prediction and algorithms.</p>
        <a class="btn btn-outline-secondary" href="#">Coming soon</a>
      </div></>
  )
}

export default About;