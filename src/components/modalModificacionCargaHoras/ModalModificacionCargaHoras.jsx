import React, { Fragment, useState, useEffect, Component } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalModificacionCargaHoras.css";
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
import { DatePicker, Space } from 'antd';

const ModalModificacionCargaHoras = () => {
    const [cargas, setCargas] = useState([])
    const[carId, setCarId]=useState([])
    const[fecha, setFecha]=useState([])
    const[cantidad_horas, setCantidadHoras]=useState([])
    const[categoria, setCategoria]=useState([])
    const[estado, setEstado]=useState('')
    const [fecha_fin, setFechaFinal] = useState('')
    const [fecha_inicio, setFechaInicial] = useState('')
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/cargas")
        .then(res=>res.json())
        .then((result)=>{
            setCargas(result);
        })
    },[])

    const handleClick=()=>{
        if(!cantidad_horas || cantidad_horas <= 0){
            alert("Intente nuevamente pero con una cantidad de horas valida");
            return;
        }
        
        if(estado.lenght === 0){
            setEstado('Modificado');
        }
        const cargaHorasNueva={carId, fecha_inicio, fecha_fin,cantidad_horas, estado, categoria} /* manda array si esta vacio */
        console.log(cargaHorasNueva)
        fetch(`https://squad920222c-production.up.railway.app/recursos/cargas/` + carId + '?estado=' + estado + '&fechaFinNueva=' + fecha_fin + '&fechaInicioNueva=' + fecha_inicio + '&horasNuevas=' + cantidad_horas,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
        }).then(()=>{
            window.location.reload();
        });
        
    }

    return (
        <container>
            <div id = 'cargaId'>
                <TextField id="outlined-basic" label="Buscar Carga por Id" variant="outlined" sx={{ minWidth: 650 }} value={carId} onChange={(e)=>{setCarId(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow} id='boton'>Modificar</Button></Col>
                    <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                    <Modal.Header closeButton onClick={handleClose}>
                        <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Carga con id: {carId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="campo">
                            <Col><h6>Nueva fecha inicial:</h6></Col>
                            <Form.Control name="fecha inicial" type="filtro" placeholder="fecha inicial" onChange={(e)=>setFechaInicial(e.target.value)}/>
                            <Col><h6>Nueva fecha final:</h6></Col>
                            <Form.Control name="fecha final" type="filtro" placeholder="fecha final" onChange={(e)=>setFechaFinal(e.target.value)}/>
                            <Col><h6>Horas actualizadas:</h6></Col>
                            <Form.Control name="horas" type="filtro" placeholder="Horas" onChange={(e)=>setCantidadHoras(e.target.value)}/>
                            <Col><h6>Estado:</h6></Col>
                            <Form.Control name="estado" type="filtro" placeholder="Estado" onChange={(e)=>setEstado(e.target.value)}/>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                        <Button className="h-end" variant="primary" onClick={handleClick}>Modificar carga</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div id = 'Tabla'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="right">Fecha inicial</TableCell>
                                <TableCell align="right">Fecha final</TableCell>
                                <TableCell align="right">Horas Actualizadas</TableCell>
                                <TableCell align="right">Estado</TableCell>
                                <TableCell align="right">Categoria/Proyecto nombre</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cargas.map((carga) => (
                                <TableRow
                                    key={carga.codigo_carga}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center" component="th" scope="row">{carga.codigo_carga}</TableCell>
                                    <TableCell align="right">{carga.fecha_inicio}</TableCell>
                                    <TableCell align="right">{carga.fecha_fin}</TableCell>
                                    <TableCell align="right">{carga.cantidad_horas}</TableCell>
                                    <TableCell align="right">{carga.estado}</TableCell>
                                    <TableCell align="right">{!carga.tarea_id? carga.categoriaNombre : carga.proyectoNombre}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            
        </container>
    );
}; 

export default ModalModificacionCargaHoras