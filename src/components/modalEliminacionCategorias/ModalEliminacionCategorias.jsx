import React, { Fragment, useState, useEffect } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalEliminacionCategorias.css";
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

const ModalEliminacionCategorias = () => {
    const [categorias, setCategorias] = useState([])
    const[catId, setCatId]=useState([])

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/categorias")
        .then(res=>res.json())
        .then((result)=>{
            setCategorias(result);
        })
    },[])

    const handleClick=(e)=>{
        const url = "https://squad920222c-production.up.railway.app/recursos/categorias/" + catId;
        console.log(url);
        if(catId <= 0){
            alert("Por favor ingrese un id de categoria");
            return;
        }
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
            <h1 id='titulo'>Eliminar Categorias</h1>
            <div>
                <TextField id="outlined-basic" label="Buscar Categoria por Id" variant="outlined" sx={{ minWidth: 650 }} value={catId} onChange={(e)=>setCatId(e.target.value)}/>
                <Button id = "borrar" onClick={() => {handleClick()}} >Borrar</Button> 
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">Nombre</TableCell>
                                <TableCell align="center">Descripcion</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categorias.map((carga) => (
                                <TableRow
                                    key={carga.idCategoria}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center" component="th" scope="row">{carga.idCategoria}</TableCell>
                                    <TableCell align="center">{carga.nombre}</TableCell>
                                    <TableCell align="center">{carga.descripcion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        </Table>
                </TableContainer>
            </div>
        </Container>
    );
}; 

export default ModalEliminacionCategorias