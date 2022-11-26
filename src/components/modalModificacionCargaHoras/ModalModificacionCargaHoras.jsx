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

class MostrarCargasCreadas extends React.Component{
    render(){
        return(
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Empleado</TableCell>
                            <TableCell>Legajo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>1</TableCell>
                            <TableCell>En espera de aprobacion</TableCell>
                            <TableCell>25/11/2022</TableCell>
                            <TableCell>Mario Reccuzzo</TableCell>
                            <TableCell>1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

const ModalModificacionCargaHoras = () => {
    const [value, onChange] = useState(new Date()); 
    const [isShown, setIsShown] = useState(false);

    return (
        <container>
            <div>
                <TextField id="outlined-basic" label="Buscar Carga de Horas por Id" variant="outlined" sx={{ minWidth: 650 }}/>
            </div>
            <div>
                <MostrarCargasCreadas></MostrarCargasCreadas>
            </div>
        </container>
    );
}; 

export default ModalModificacionCargaHoras