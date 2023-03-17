import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// Here, we display our Navbar
export default function NavbarItems() {
  return (
    <Navbar bg="light" variant="light">
    <Container>
      <Nav className="me-auto">
        <Nav.Link href="/viewItems">Items Page</Nav.Link>
        <Nav.Link href="/createNewItem">Add Item</Nav.Link>
      </Nav>
    </Container>
  </Navbar>

  );
}