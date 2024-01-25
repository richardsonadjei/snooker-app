// Header.js
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Header() {
  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Link to="/" className="logo-container">
          <Navbar.Brand className="logo">
            <img
              src="/snooker logo.png" // Replace with the actual path to your logo
              alt="Logo"
              className="logo-img"
            />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="menu-items justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/sign-in" className="text-dark">
              Sign In
            </Nav.Link>
            <Nav.Link as={Link} to="/sign-out" className="text-dark">
              Sign Out
            </Nav.Link>
            <Nav.Link as={Link} to="/profile" className="text-dark">
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to="/sign-up" className="text-dark">
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
