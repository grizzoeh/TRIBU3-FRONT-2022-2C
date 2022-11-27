import React, { Fragment, useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

//Hay que ponerle un scrollbar a la tabla y que tenga un tamanio fijo
function navegarACargaDeHorasPorId(id){
    
}

const ModalModificacionCargaHoras = () => {
    const [value, onChange] = useState(new Date()); 
    const [isShown, setIsShown] = useState(false);
    //const [cargasHoras, setCargasHoras] = useState([]);

    const navigate = useNavigate();
    
    function createData(id, fecha, legajo) {
        return { id, fecha, legajo };
      }
      
      const cargasHoras = [
        createData(1,'26/11/2022',1),
        createData(2,'26/11/2022',1),
        createData(3,'27/11/2022',6),
        createData(4,'28/11/2022',9)
      ];

    /*fetch("http://localhost:8080/recursos/carga/getAllCargas")
    .then(res=>res.json()).then(()=>{console.log("SeCargaronCargas")})
    .then((result)=>{
        setCargasHoras(result);
    })*/
    /* Falta terminar de ver como extraer la informacion del back, el fetch falla. Puede ser por la caida de la base de datos*/
    return (
        <container>
            <div>
                <TextField id="outlined-basic" label="Buscar Carga de Horas por Id" variant="outlined" sx={{ minWidth: 650 }}/>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                                <TableCell align="right">Legajo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cargasHoras.map((carga) => (
                                <TableRow
                                    key={carga.codigo_carga}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => navigate("/")}
                                    >
                                    <TableCell align="left" component="th" scope="row">{carga.id}</TableCell>
                                    <TableCell align="right">{carga.fecha}</TableCell>
                                    <TableCell align="right">{carga.legajo}</TableCell>
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