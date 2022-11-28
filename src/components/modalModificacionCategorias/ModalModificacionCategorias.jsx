import React, { Fragment, useState, useEffect } from "react";
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

const ModalModificarCategorias = () => {
    const [categorias, setCategorias] = useState([])

    const[nombre, setNombre]=useState([])
    const[descripcion, setDescripcion]=useState([])
    const[catId, setCatId]=useState([])


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

    return (
        <container>
            <div>
                <TextField id="outlined-basic" label="Buscar Categoria por Id" variant="outlined" sx={{ minWidth: 650 }} value={catId} onChange={(e)=>setCatId(e.target.value)}/>
            </div>
            <div>
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
                        <TableBody>
                        <TextField id="outlined-basic" label="Ingrese un nombre" variant="outlined" sx={{ minWidth: 650 }} value={nombre} onChange={(e)=>setNombre(e.target.value)}/>
                        <TextField id="outlined-basic" label="Ingrese una descripcion" variant="outlined" sx={{ minWidth: 650 }} value={descripcion} onChange={(e)=>setDescripcion(e.target.value)}/>
                        <button onClick={handleClick}>Click</button>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </container>
    );
}; 

export default ModalModificarCategorias