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
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

/*
    <div className="DD">
        <Select
        options = {DDCateogrias.map(sup => ({label: sup.name, value: sup.id}))}
        onChange = {handleSelectChange}
    </div>

*/



const ModalCreacionCargaDeHoras = () => {
    const[empleados, setEmpleados]=useState([])
    const[report, setReport]=useState([])
    const [categorias, setCategorias] = useState([])
    const [isShown, setIsShown] = useState(false);
    const [proyectos, setProyectos] = useState([])
    const [ProjectText, setProjectText] = useState('Seleccionar')

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/cargas")
        .then(res=>res.json())
        .then((result)=>{
            setEmpleados(result);
        })
    },[])

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/cargas/2")
        .then(res=>res.json())
        .then((result)=>{
            setReport(result);
        })
    },[])

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/categorias")
        .then(res=>res.json())
        .then((result)=>{
            setCategorias(result);
        })
    },[])

    const listCategorias = categorias.map(categoria => <NavDropdown.Item id="dropdown-item">{categoria.nombre}</NavDropdown.Item>)
    const data = 'data de carga horas'
    return (
        <container>
            <div id="page">
                <h2 id="titulo">Seleccionar Categoria</h2>
                <NavDropdown title="Seleccionar" id="collasible-dropdown">
                    <NavDropdown.Item id="dropdown-item">
                        <a  onClick='Proyecto' id='proyecto-dropdown' href='/cargar-horas/proyectos'>
                            Proyecto
                        </a>
                    </NavDropdown.Item>
                    <NavDropdown.Item id="dropdown-item">
                        <a  onClick='Proyecto' id='proyecto-dropdown' href='/cargar-horas/licencias'>
                            Otros
                        </a>
                    </NavDropdown.Item>
                    
                </NavDropdown>
            </div>
        </container>
    
    );
};

export default ModalCreacionCargaDeHoras