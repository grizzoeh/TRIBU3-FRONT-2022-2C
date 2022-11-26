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
    return (
        <container>
            <div>
                <h2 id='titulo'>Ingrese el nombre de la nueva categoria</h2>
            </div>
            <div id='top-categoria'>
                <TextField id="outlined-basic" label="Ingrese el nombre de la categoria" variant="outlined" sx={{ minWidth: 650 }}/>
            </div>
            <div>
                <h2 id='titulo2'>Ingrese una descripcion</h2>
            </div>
            <div id='top-categoria'>
                <input type="text" name="name" />
            </div>
    </container>
    );
}; 

export default ModalCreacionCategorias