import React, { Fragment, useState, useEffect, Component } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalInformacionCargaHorasPorLegajo.css";
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

const ModalInformacionCargaHorasPorLegajo = () => {
    
    const[legajo, setLegajo]=useState([])
    const[cargaLegajo, setCargaLegajo] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
        const handleClick=() => {
            setCargaLegajo([])
            const url = `https://squad920222c-production.up.railway.app/recursos/cargas/legajo/` + legajo; /*legajo no sirve, tirar error */
            fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setCargaLegajo(data);
            });
        };
        

    return (
        <container>
            <div id = 'legajo'>
                <TextField id="outlined-basic" label="Consultar Carga por Legajo" variant="outlined" sx={{ minWidth: 650 }} value={legajo} onChange={(e)=>{setLegajo(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1" onClick={() => {handleClick();handleShow()}} id='boton'>Consultar legajo</Button></Col>
                <div id = 'Tabla'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Legajo</TableCell>
                                    <TableCell align="center">Proyecto</TableCell>
                                    <TableCell align="center">Tarea</TableCell>
                                    <TableCell align="center">Horas</TableCell>
                                    <TableCell align="center">Fecha</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {show && cargaLegajo.map((carga) => (
                                    <TableRow
                                        key={carga.legajo}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="center" component="th" scope="row">{carga.legajo}</TableCell>
                                        <TableCell align="center">{carga.proyectoNombre}</TableCell>
                                        <TableCell align="center">{carga.tareaNombre}</TableCell>
                                        <TableCell align="center">{carga.cantidad_horas}</TableCell>
                                        <TableCell align="center">{carga.fecha}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            
        </container>
    );
}; 

export default ModalInformacionCargaHorasPorLegajo