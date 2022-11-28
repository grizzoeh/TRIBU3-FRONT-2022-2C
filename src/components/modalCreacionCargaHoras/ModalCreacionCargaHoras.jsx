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

    const codigo_carga = 2
    const fecha = "1-1-1"
    const cantidad_horas = 999
    
    const handleClick2=(e)=>{
        const url = 'https://squad920222c-production.up.railway.app/deleteCargas/2';
        fetch(url, {
            method: 'DELETE',
            headers: {"Content-Type": 'application/json'}
        })
    }

    const handleClick=(e)=>{
        e.preventDefault()
        const reporte={codigo_carga}
        console.log(reporte)
        fetch(`https://squad920222c-production.up.railway.app/recursos/cargas/` + codigo_carga + '?fechaNueva=' + fecha + '&horasNuevas=' + cantidad_horas,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(reporte)
        }).then(()=>{
            console.log("anda?")
        })
    }

    return (
        <container>
            <div id="page">
                <h2 id="titulo">Seleccionar Categoria</h2>
                <NavDropdown title="Seleccionar" id="collasible-dropdown">
                    <NavDropdown.Item id="dropdown-item" href='/cargar-horas/proyectos'>
                        <a  onClick='Proyecto' id='tuma'>
                            Proyecto
                        </a>
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item href="#cargar-horas-licencia" id="dropdown-item">
                        <a href='/cargar-horas-licencia' id='tuma' onClick='Licencia'>
                            Licencia y/o Vacaciones
                        </a>
                    </NavDropdown.Item>
                </NavDropdown>
                <button onClick={handleClick}>Boton para borrar</button>
                <Table>{empleados.map(empleado=>(
                <h4>
                    proyecto: {empleado.proyectoNombre}
                    tarea: {empleado.tareaNombre}
                    codigo: {empleado.codigo_carga}
                    fecha: {empleado.fecha}
                    cantidad_horas: {empleado.cantidad_horas}
                </h4>
                ))}</Table>
                <h5>
                    proyecto: {report.proyectoNombre}
                    tarea: {report.tareaNombre}
                    codigo: {report.codigo_carga}
                    fecha: {report.fecha}
                    cantidad_horas: {report.cantidad_horas}
                </h5>
            
            </div>
            
        </container>
    
    );
};

export default ModalCreacionCargaDeHoras