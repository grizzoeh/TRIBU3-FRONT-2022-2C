import React, { Fragment, useState, useEffect, Component } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalInformacionCargaHoras.css";
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

const ModalInformacionCargaHoras = () => {
    const [cargas, setCargas] = useState([])
    const[carId, setCarId]=useState([])

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
        useEffect(()=>{
            fetch("https://squad920222c-production.up.railway.app/recursos/cargas")
            .then(res=>res.json())
            .then((result)=>{
                setCargas(result);
            })
        },[])

        const handleClick=(e)=>{
            const url = `https://squad920222c-production.up.railway.app/recursos/cargas/` + carId;
            console.log(url);
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*' 
                },
                body: JSON.catId
            }).then(()=>{
            });
        }
        

    return (
        <Container>
            <div id = 'cargaId'>
                <TextField id="outlined-basic" label="Consultar Carga por Id" variant="outlined" sx={{ minWidth: 650 }} value={carId} onChange={(e)=>{setCarId(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>Consultar</Button></Col>
                    <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                    <Modal.Header closeButton onClick={handleClose}>
                        <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Carga con id: {carId}</Modal.Title>
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
                                <TableCell align="center">Id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cargas.map((carga) => (
                                <TableRow
                                    key={carga.codigo_carga}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center" component="th" scope="row">{carga.codigo_carga}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            
        </Container>
    );
}; 

export default ModalInformacionCargaHoras