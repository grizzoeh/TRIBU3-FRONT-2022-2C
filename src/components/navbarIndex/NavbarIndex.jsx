import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./navbarIndex.css";

const NavbarIndex = () => {

    return (
        <Navbar className="navi" fixed="top" bg="dark" variant="dark">

            <Nav className="brand" href="/">
                PSA
            </Nav>
            <Nav className="me-auto">
                <Nav.Link href="/proyectos">Proyectos</Nav.Link>
                <Nav.Link href="/tickets-en-curso">Soporte</Nav.Link>
                <Nav.Link href="/recursos">Recursos</Nav.Link>

            </Nav>



        </Navbar>
    );
};

export default NavbarIndex
