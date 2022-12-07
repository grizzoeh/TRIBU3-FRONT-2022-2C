import React, { Fragment, useState, useEffect, Component } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalInformacionReportesPersona.css";
import Button2 from '@mui/material/Button';
import axios from "axios";
import Alert from "@mui/material/Alert";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import 'react-calendar/dist/Calendar.css';

import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Input } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const ModalInformacionReportesPersona = () => {
    const [legajo, setLegajo] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [proyectos, setProyectos] = useState([]);
    const [alreadyThere, setAlreadyThere] = useState([])
    const [proyectosTotales, setProyectosTotales] = useState([])

    useEffect( () => {
        if(proyectos.lenght != 0){
            setShow(true)
        }
        else {
            setShow(false);
        }
    }, [proyectos])

    const handleClick= async () => {
        setAlreadyThere([])
        const url = `https://squad920222c-production.up.railway.app/recursos/cargas/legajo/` + legajo;
        const res = await fetch(url);
        if(!res.ok){
            alert("No existe ese legajo");
            return;
        };
        const cargas = await res.json();
        parsearProyectos(cargas)
        setProyectos(cargas);
    }
    
    const parsearProyectos = (cargas) =>{
        const final = []
        cargas.map(carga => { 
            const existente = final.find(e => e.id === carga.proyectoId)
            if (existente) {
                existente.sumaHoras = existente.sumaHoras + carga.cantidad_horas;
                return;
            }

            let nuevaCarga = {}
            nuevaCarga.nombre = carga.proyectoNombre;
            nuevaCarga.id = carga.proyectoId;
            nuevaCarga.sumaHoras = carga.cantidad_horas;
            
            final.push(nuevaCarga);
        })
        setProyectosTotales(final);
    }

    const sumaHorasTareas = (proyId) =>{
        let x=0
        for(let i=0; i<proyectos.length; i++){
            if(proyectos[i].proyectoId == proyId){
                x+=proyectos[i].cantidad_horas
            }
        }
        return x
    }
   
    
    const asignarLegajo = (valor) =>{
        if(valor != null){
            setLegajo(valor)
        }
    }

    return (
        <Container>
            <div id = 'proyectoId'>
                <TextField id="outlined-basic" label="Consultar Reportes por legajo" variant="outlined" sx={{ minWidth: 650 }} value={legajo} onChange={(e)=>{asignarLegajo(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1"  onClick={handleClick} id='boton'>Consultar Proyecto</Button></Col>
                
                <div id = 'Tabla'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nombre del proyecto</TableCell>
                                    <TableCell align="center">ID:</TableCell>
                                    <TableCell align="center">Suma de horas</TableCell>
                                </TableRow>
                               {show && proyectosTotales.map((proyecto)=>(
                                        <TableRow>
                                            <TableCell align="center">{proyecto.nombre}</TableCell>
                                            <TableCell align="center">{proyecto.id}</TableCell>
                                            <TableCell align="center" >{proyecto.sumaHoras}</TableCell>
                                        </TableRow>
                                    )
                                )

                                }
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </Container>
    );
}; 
export default ModalInformacionReportesPersona

/*calcularDesvio(calcularSumaHoras(tarea.id), tarea.estimated_hours_effort */
