import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { FiList, FiPlusCircle, FiInfo } from 'react-icons/fi';

export default function TopNav() {
  return (
    <Navbar bg="light" expand="md" className="shadow-sm sticky-top" style={{ zIndex: 1020 }}>
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand">
          BucketList Mini
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="nav" />
        <Navbar.Collapse id="nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end className="nav-link-custom"><FiList /> Home</Nav.Link>
            <Nav.Link as={NavLink} to="/form" className="nav-link-custom"><FiPlusCircle /> Add</Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="nav-link-custom"><FiInfo /> About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
