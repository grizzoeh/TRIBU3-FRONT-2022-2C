import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./NavbarRecursos.css";

const NavbarRecursos = () => {

    return (
        <Navbar className="navi" fixed="top" bg="dark" variant="dark">
            <Nav className="brand" href="/HomePSa">

                <NavDropdown title="PSA" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/">
                        Módulo Proyectos
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/">
                        Módulo Soporte
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/">
                        Módulo Recursos
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>

            <Nav className="me-auto">
                <Nav.Link href="/cargar-horas">Cargar horas</Nav.Link>
                <Nav.Link href="/modificar-carga">Modificar carga de horas</Nav.Link>
                <Nav.Link href="/consultar-carga">Consultar carga</Nav.Link>

            </Nav>



        </Navbar>
    );
};

export default NavbarRecursos
