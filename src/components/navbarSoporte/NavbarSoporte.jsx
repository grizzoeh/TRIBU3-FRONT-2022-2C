import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./NavbarSoporte.css";

const NavbarSoporte = () => {

    return (
        <Navbar className="navi" fixed="top" bg="dark" variant="dark">
            <Nav className="brand" href="/HomePSa">

                <NavDropdown title="PSA Soporte" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/">
                        Módulo Proyectos
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/">
                        Módulo Recursos
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>

            <Nav className="me-auto">
                <Nav.Link href="/tickets-en-curso">Tickets</Nav.Link>
                <Nav.Link href="/crear-producto-y-version">Crear Producto y Versión</Nav.Link>



            </Nav>



        </Navbar>
    );
};

export default NavbarSoporte
