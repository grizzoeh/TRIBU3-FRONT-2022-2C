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
                <Button onClick={() => {handleClick()}} id = 'borrar'>Borrar</Button> 
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="right">Fecha Inicial</TableCell>
                                <TableCell align="right">Fecha Final</TableCell>
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
        </Container>
    );
}; 

export default ModalEliminacionCargaHoras