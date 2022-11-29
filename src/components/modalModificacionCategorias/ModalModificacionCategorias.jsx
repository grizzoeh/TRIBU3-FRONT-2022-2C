import React, { Fragment, useState, useEffect, Component } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalModificacionCategorias.css";
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

const ModalModificarCategorias = () => {
    const [categorias, setCategorias] = useState([])
    const[nombre, setNombre]=useState([])
    const[descripcion, setDescripcion]=useState([])
    const[catId, setCatId]=useState([])

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/categorias")
        .then(res=>res.json())
        .then((result)=>{
            setCategorias(result);
        })
    },[])

    
    const handleClick=(e)=>{
        e.preventDefault()
        const categoria={nombre, catId,descripcion} /* manda array si esta vacio */
        console.log(categoria)
        fetch(`https://squad920222c-production.up.railway.app/recursos/categorias/` + catId + '?descripcion=' + descripcion + '&nombre=' + nombre,{
            method:"PUT",
            headers:{"Content-Type": "application/json"},
        }).then(()=>{
            console.log("anda?")
        })
    }
    
    const [semilla,setSemilla] = useState(1);
    const reset = () => {
        setSemilla(Math.random());
    }
    

    return (
        <container>
            <div id = 'CategoriaId'>
                <TextField id="outlined-basic" label="Buscar Categoria por Id" variant="outlined" sx={{ minWidth: 650 }} value={catId} onChange={(e)=>{setCatId(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>Modificar Categoria</Button></Col>
                    <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                    <Modal.Header closeButton onClick={handleClose}>
                        <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Categoria con id: {catId}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row className="campo">
                            <Col><h6>Nuevo nombre:</h6></Col>
                            <Form.Control name="nombre" type="filtro" placeholder="Nombre" onChange={(e)=>setNombre(e.target.value)}/>
                            <Col><h6>Nueva Descripcion:</h6></Col>
                            <Form.Control name="nombre" type="filtro" placeholder="Descripcion" onChange={(e)=>setDescripcion(e.target.value)}/>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                        <Component key={semilla}/>
                        <Button className="h-end" variant="primary" onClick={() => {reset();handleClick()}}>Modificar categoria</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div id = 'Tabla'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="right">Nombre</TableCell>
                                <TableCell align="right">Descripcion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categorias.map((carga) => (
                                <TableRow
                                    key={carga.idCategoria}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="left" component="th" scope="row">{carga.idCategoria}</TableCell>
                                    <TableCell align="left">{carga.nombre}</TableCell>
                                    <TableCell align="left">{carga.descripcion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            
        </container>
    );
}; 

export default ModalModificarCategorias