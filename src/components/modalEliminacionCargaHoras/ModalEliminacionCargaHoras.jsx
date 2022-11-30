import React, { Fragment, useState, useEffect } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalEliminacionCargaHoras.css";
import Button2 from '@mui/material/Button';
import axios from "axios";
import Alert from "@mui/material/Alert";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
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

const ModalEliminacionCargaHoras = () => {
    const [cargas, setCargas] = useState([])
    const[carId, setCarId]=useState([])

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/carga")
        .then(res=>res.json())
        .then((result)=>{
            setCargas(result);
        })
    },[])

    const handleClick=(e)=>{
        const url = "https://squad920222c-production.up.railway.app/recursos/carga/" + carId;
        console.log(url);
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' 
            },
            body: JSON.catId
        }).then(()=>{
            window.location.reload();
        });
    }
    

    return (
        <Container>
            <div>
                <TextField id="outlined-basic" label="Buscar Carga por Id" variant="outlined" sx={{ minWidth: 650 }} value={carId} onChange={(e)=>setCarId(e.target.value)}/>
                <button onClick={() => {handleClick()}} id = 'borrar'>Borrar</button> 
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                                <TableCell align="right">Horas Actualizadas</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cargas.map((carga) => (
                                <TableRow
                                    key={carga.cargaId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="left" component="th" scope="row">{carga.cargaId}</TableCell>
                                    <TableCell align="left">{carga.fecha}</TableCell>
                                    <TableCell align="left">{carga.cantidad_horas}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                </TableContainer>
            </div>
        </Container>
    );
}; 

export default ModalEliminacionCargaHoras