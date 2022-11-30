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
    const [cargas, setCargas] = useState([])
    const[legajo, setLegajo]=useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

/*
    function createData(id, fecha, legajo) {
        return { id, fecha, legajo };
      }

    const cargasHoras = [
        createData(1,'26/11/2022',1),
        createData(2,'26/11/2022',1),
        createData(3,'27/11/2022',6),
        createData(4,'28/11/2022',9)
      ];
*/
        /*useEffect(()=>{
            fetch("https://squad920222c-production.up.railway.app/recursos/cargas")
            .then(res=>res.json())
            .then((result)=>{
                setCargas(result);
            })
        },[])*/

        /* PROBAR */

        useEffect(() => {
            fetch("https://squad920222c-production.up.railway.app/recursos/cargas")
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setCargas(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }, []);

        const handleClick=(e)=>{
            const url = `https://squad920222c-production.up.railway.app/recursos/cargas/` + legajo; /*hacerlo array */
            console.log(url);
            
        }
        

    return (
        <container>
            <div id = 'legajo'>
                <TextField id="outlined-basic" label="Consultar Carga por Legajo" variant="outlined" sx={{ minWidth: 650 }} value={legajo} onChange={(e)=>{setLegajo(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow} id='boton'>Consultar legajo</Button></Col>
                    <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                    <Modal.Header closeButton onClick={handleClose}>
                        <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Legajo: {legajo}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                        <Button className="h-end" variant="primary" onClick={handleClick}>Consultar</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div id = 'Tabla'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Legajo</TableCell>
                                <TableCell align="right">Proyecto</TableCell>
                                <TableCell align="right">Tarea</TableCell>
                                <TableCell align="right">Horas</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cargas.map((carga) => (
                                <TableRow
                                    key={carga.legajo}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center" component="th" scope="row">{carga.legajo}</TableCell>
                                    <TableCell align="right">{carga.proyectoNombre}</TableCell>
                                    <TableCell align="right">{carga.tareaNombre}</TableCell>
                                    <TableCell align="right">{carga.cantidad_horas}</TableCell>
                                    <TableCell align="right">{carga.fecha}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            
        </container>
    );
}; 

export default ModalInformacionCargaHorasPorLegajo