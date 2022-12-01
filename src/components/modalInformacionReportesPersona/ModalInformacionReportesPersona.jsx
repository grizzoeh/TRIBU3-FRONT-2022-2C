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
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [proyectos, setProyectos] = useState([]);
    const [fullSum, setFullSum] = useState();
    const [alreadyThere, setAlreadyThere] = useState([])
    const [valor, setValor] = useState([])
    const [tempval, setTempval] = useState()
    
    const handleClick =() => {
        const url = `https://squad920222c-production.up.railway.app/recursos/cargas/legajo/` + legajo;
        fetch(url)
        .then(res=>res.json())
        .then((result)=>{
            setProyectos(result)
    })}

    const getProjectSum=(projectId) => { /*cambiar url ponerle fechas tambien */
        const url = 'https://squad920222c-production.up.railway.app/recursos/reporte/proyecto/' + legajo + '/' + projectId + '/tiempoEstimadoLegajo?fecha_inferior=1-1-1000&fecha_superior=1-1-3000'
        fetch(url)
        .then((res) => res.json())
        .then((result) => {
            setTempval(result)
        })
    }
    
    return (
        <container>
            <div id = 'proyectoId'>
                <TextField id="outlined-basic" label="Consultar Reportes por legajo" variant="outlined" sx={{ minWidth: 650 }} value={legajo} onChange={(e)=>{setLegajo(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1"  onClick={() => {handleClick();handleShow()}} id='boton'>Consultar Proyecto</Button></Col>
                <div id = 'Tabla'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nombre del proyecto</TableCell>
                                    <TableCell align="center">ID:</TableCell>
                                    <TableCell align="center">Suma de horas</TableCell>
                                </TableRow>
                               {show && proyectos.map((proyecto, i)=>(
                                    
                                    alreadyThere.includes(proyecto.proyectoId)? null : (
                                        alreadyThere.push(proyecto.proyectoId),
                                        console.log(valor),
                                        getProjectSum(proyecto.proyectoId),
                                        valor.push(tempval),
                                        console.log(valor),
                                        <TableRow>
                                            <TableCell align="center">{proyecto.proyectoNombre}</TableCell>
                                            <TableCell align="center">{proyecto.proyectoId}</TableCell>
                                            <TableCell align="center" >{valor[i]}</TableCell>
                                        </TableRow>)
                                    )
                                )

                                }
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </container>
    );
}; 
export default ModalInformacionReportesPersona

/*calcularDesvio(calcularSumaHoras(tarea.id), tarea.estimated_hours_effort */
