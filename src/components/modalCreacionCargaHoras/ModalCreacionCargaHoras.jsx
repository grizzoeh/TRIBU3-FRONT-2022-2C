import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalCreacionCargaHoras.css";
import Button2 from '@mui/material/Button';
import axios from "axios";
import Alert from "@mui/material/Alert";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

/*
    <div className="DD">
        <Select
        options = {DDCateogrias.map(sup => ({label: sup.name, value: sup.id}))}
        onChange = {handleSelectChange}
    </div>

*/

const ModalCreacionCargaDeHoras = () => {
    
    return (
        <container>
            <div id="page">
                <h2 id="titulo">Seleccionar Categoria</h2>
                <NavDropdown title="Seleccionar" id="collasible-dropdown">
                    <NavDropdown.Item id="dropdown-item">
                        <a href='#cargar-horas-proyecto' onClick='Proyecto' id='tuma'>
                            Proyecto
                        </a>
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item href="#cargar-horas-licencia" id="dropdown-item">
                        <a href='/cargar-horas-licencia' id='tuma' onClick='Licencia'>
                            Licencia y/o Vacaciones
                        </a>
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
            
            <div id='cargar-horas-proyecto'>
                    <h2 id="titulo">Seleccionar Proyecto</h2>
                    <NavDropdown title="Seleccionar" id="collasible-dropdown">
                        <NavDropdown.Item href="/cargar-horas-proyecto" id="dropdown-item">Proyecto A</NavDropdown.Item>
                        <NavDropdown.Item href="/cargar-horas-licencia" id="dropdown-item">Proyecto B</NavDropdown.Item>
                    </NavDropdown>
            </div>
            <div id='cargar-horas-licencia'>
                    <h2 id="titulo">Seleccionar Licencia</h2>
                    <NavDropdown title="Seleccionar" id="collasible-dropdown">
                        <NavDropdown.Item href="/cargar-horas-proyecto" id="dropdown-item">Proyecto A</NavDropdown.Item>
                        <NavDropdown.Item href="/cargar-horas-licencia" id="dropdown-item">Proyecto B</NavDropdown.Item>
                    </NavDropdown>
            </div>
        </container>
    
    );
};

export default ModalCreacionCargaDeHoras