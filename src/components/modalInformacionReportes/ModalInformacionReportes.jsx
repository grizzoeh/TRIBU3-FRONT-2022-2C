import React, { Fragment, useState, useEffect, Component } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalInformacionReportes.css";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const ModalInformacionReportes = () => {
    const [ReporteProyectos, setReporteProyectos] = useState([]);
    const [proyectoId,setProyectoId] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [listaTareas,setListaTareas] = useState([]);
    const [proyectoName,setProyectoNombre] = useState([]);
    const [cargas, setCargas] = useState([]);
    const [sum, setSum] = useState(0)
    
    const obtenerListaTareas=()=> {
        setListaTareas([])
        const url = `https://squad-8-projects.herokuapp.com/psa/projects` + proyectoId + '/tasks/';
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setListaTareas(data);
        });
    };


    const handleClick=() => {
        setReporteProyectos([])
        const url = `https://squad920222c-production.up.railway.app/recursos/reporte/proyecto/` + proyectoId; /*legajo no sirve, tirar error */
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setReporteProyectos(data);
        });

        setListaTareas([])
        const urlTareas = `https://squad-8-projects.herokuapp.com/psa/projects/` + proyectoId + '/tasks/';
        fetch(urlTareas)
        .then((res) => res.json())
        .then((data) => {
            setListaTareas(data);
        });
    };

    function calcularSumaHoras(idTarea){
        let suma = 0;
        
        const url = `https://squad920222c-production.up.railway.app/recursos/reporte/tarea/` + idTarea; 
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setCargas(data);
        });

        cargas.map((carga) =>{
            suma = suma+carga.horas
        })

        return suma;
    }


    function FilasDeTareas(){
        return (
            listaTareas.map((tarea) => (
            <TableRow>
                <TableCell>{tarea.id}</TableCell>
                <TableCell>{tarea.name}</TableCell>
                <TableCell>{calcularSumaHoras(tarea.id)}</TableCell>
                <TableCell>{tarea.estimated_hours_effort - calcularSumaHoras(tarea.id)}</TableCell>
            </TableRow>
        )))
    }

        
    const fecha_inferior = startDate.getDate() + '-' + startDate.getMonth() + '-' + startDate.getFullYear(); /*3 setdia/mes/anio en un handleClick en datepicker */
    const fecha_superior = finishDate.getDate() + '-' + finishDate.getMonth() + '-' + finishDate.getFullYear(); /*3 setdia/mes/anio en un handleClick en datepicker */

    

    return (
        <container>
            <div id = 'proyectoId'>
                <TextField id="outlined-basic" label="Consultar Reportes por Proyecto" variant="outlined" sx={{ minWidth: 650 }} value={proyectoId} onChange={(e)=>{setProyectoId(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow} id='boton'>Consultar Proyecto</Button></Col>
                {show && <Modal.Footer>
                    <DatePicker selected={startDate} id="Calendar" onChange={(date) => setStartDate(date)} /> 
                    <DatePicker selected={finishDate} id="Calendar" onChange={(date) => setFinishDate(date)} />
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={handleClick}>Confirmar</Button>
                </Modal.Footer>}
                <div id = 'Tabla'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Nombre de la tarea</TableCell>
                                    <TableCell align="center">Id de la tarea</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {show && ReporteProyectos.map((proyecto) => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="center">{proyecto.tareaNombre}</TableCell>
                                            <TableCell align="center">{proyecto.tarea_id}</TableCell>
                                            <TableCell align="center">{proyecto.cantidad_horas}</TableCell>
                                            
                                        </TableRow>
                                
                                        
                                        ))}
                                {FilasDeTareas()}        
                                <h3>{sum}</h3>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </container>
    );
}; 
/*<>{setSum(proyecto.cantidad_horas)}</> */
export default ModalInformacionReportes