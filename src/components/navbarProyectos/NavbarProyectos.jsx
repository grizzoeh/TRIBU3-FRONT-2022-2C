import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./NavbarProyectos.css";

const NavbarProyectos = () => {

    return (
        <Navbar className="navi" fixed="top" bg="dark" variant="dark">
            <Nav className="brand" href="/HomePSa">

                <NavDropdown title="PSA Proyectos" id="collasible-nav-dropdown">

                    <NavDropdown.Item href="/">
                        Módulo Recursos
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/tickets-en-curso">
                        Módulo Soporte
                    </NavDropdown.Item>

                </NavDropdown>
            </Nav>

            <Nav className="me-auto">
                <Nav.Link href="/proyectos">Proyectos</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default NavbarProyectos
