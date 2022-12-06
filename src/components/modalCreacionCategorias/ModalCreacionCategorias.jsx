import React, { Fragment, useState, useEffect } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalCreacionCategorias.css";
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

const ModalCreacionCategorias = () => {
    const[nombre, setNombre]=useState([])
    const[descripcion, setDescripcion]=useState([])
    const idCategoria = 2

    const handleClick=(e)=>{
        e.preventDefault()
        const categoria={descripcion, idCategoria,nombre}
        console.log(categoria)
        if(nombre.length === 0){
            alert("Requerimos que se ingrese un nombre");
            return;
        }
        fetch(`https://squad920222c-production.up.railway.app/recursos/categorias`, { /*si inputs en blanco, se manda array != string */
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(categoria),
        }).then(()=>{
            console.log("anda?")
            alert("Has Creado una Categoria");
            return;
        })
    }

    return (
        <Container>
            <div id = 'Titulo'>
                <h1 id='titulo'>Crear Categorias</h1>
                <h2 id='titulo'>Ingrese el nombre de la nueva categoria</h2>
            </div>
            <div id='top-categoria'>
                <TextField id="outlined-basic" label="Ingrese el nombre de la categoria" variant="outlined" sx={{ minWidth: 650 }} value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
            </div>
            <div>
                <h2 id='titulo2'>Ingrese una descripcion</h2>
            </div>
            <div id='top-categoria'>
                <TextField id="outlined-basic" label="Ingrese una descripcion" variant="outlined" sx={{ minWidth: 650 }} value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
            </div>
            <Button id = "click" onClick={handleClick} >Crear</Button>
    </Container>
    );
}; 

export default ModalCreacionCategorias