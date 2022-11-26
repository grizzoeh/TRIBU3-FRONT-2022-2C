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
                <NavDropdown title="Horas" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/cargar-horas">Cargar</NavDropdown.Item>
                    <NavDropdown.Item href="/modificar-carga-horas">Modificar</NavDropdown.Item> 
                    <NavDropdown.Item href="/eliminar-carga-horas">Eliminar</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Consultar" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/consultar-carga">Carga de Horas</NavDropdown.Item>
                    <NavDropdown.Item href="/consultar-reportes-por-proyecto">Reportes</NavDropdown.Item>                            
                </NavDropdown>
                <NavDropdown title="Categoria" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/crear-categoria">Crear</NavDropdown.Item>
                    <NavDropdown.Item >Modificar</NavDropdown.Item>
                    <NavDropdown.Item >Eliminar</NavDropdown.Item>                                   
                </NavDropdown>
            </Nav>



        </Navbar>
    );
};

export default NavbarRecursos