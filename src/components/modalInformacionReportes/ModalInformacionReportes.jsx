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
    const [proyectoId,setProyectoId] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [listaTareas,setListaTareas] = useState([]);
    const [proyectoName,setProyectoNombre] = useState([]);
    const [cargas, setCargas] = useState([]);
    const [sumaDesvios, setSumaDesvios] = useState(0);
    const [sumaHoras, setSumaHoras] = useState(0);
    const [sumaHorasTotales, setSumaHorasTotales]  = useState(0);
    const [sumaTiempoEstimado, setSumaTiempoEstimado] = useState(0);
    const [prueba,setPrueba] = useState([]);

    const [sumaHorasProyecto, setSumaHorasProyecto] = useState(0);

    const handleClick =() => {
          
        const urlProyecto = `https://squad-8-projects.herokuapp.com/psa/projects/` + proyectoId;
        fetch(urlProyecto)
        .then(res=>res.json())
        .then((result)=>{
            setProyectoNombre(result.name)
    })    
    }

    const cargarListaTareas = () => {
        setListaTareas([])
        const urlTareas = `https://squad-8-projects.herokuapp.com/psa/projects/` + proyectoId + '/tasks/';
        fetch(urlTareas)
        .then((res) => res.json())
        .then((data) => {
            setListaTareas(data);
        });
    }

    function obtenerSumaHorasEstimadas(){
          
        var sumaTotalEstimativos = 0;

        listaTareas.map((tarea)=>{
            if(tarea.estimated_hours_effort != null){
                sumaTotalEstimativos += tarea.estimated_hours_effort;
            }
        })

        return sumaTotalEstimativos;
    }

    function calcularSumaHoras(idTarea){
        let suma = 0;
        
        const url = `https://squad920222c-production.up.railway.app/recursos/reporte/tarea/` + idTarea; 
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setCargas(data);
        });

        cargas.map((carga) =>{
            if(carga.cantidad_horas != null)
            suma = suma+carga.cantidad_horas
        
        })
        
        
        return suma;
    }

    function obtenerSumaHorasProyecto(){

        console.log(proyectoId.type)
        console.log(proyectoId)
        const url = `https://squad920222c-production.up.railway.app/recursos/reporte/proyecto/` + proyectoId + '/tiempoTotal';
        fetch(url)
        .then(res=>res.json())
        .then((result)=>{
            console.log(result)
            setSumaHorasProyecto(result)
        })

        return sumaHorasProyecto;
    }

    function calcularDesvio(sumaHoras, tiempoEstimado){
        let resultado = 0;
        
        if (tiempoEstimado == null){
            return sumaHoras;
        }
        return (sumaHoras - tiempoEstimado)
    }

    function horasEstimadas(horasEstimadas){
        if (horasEstimadas == null){
            return 0
        }
        return horasEstimadas;
    }
    

    return (
        <container>
            <div id = 'proyectoId'>
                <TextField id="outlined-basic" label="Consultar Reportes por Proyecto" variant="outlined" sx={{ minWidth: 650 }} onChange={(e)=>{setProyectoId(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1"  onClick={() => {handleClick();cargarListaTareas();handleShow()}} id='boton'>Consultar Proyecto</Button></Col>
                
                <React.Fragment id = 'Tabla'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow id="datos">
                                    <TableCell align="center">ID del proyecto</TableCell>
                                    <TableCell align="center">Nombre del proyecto</TableCell>
                                    <TableCell align="center">Suma de horas del proyecto</TableCell>
                                    <TableCell align="center">Horas de esfuerzo estimadas</TableCell>
                                    <TableCell align="center">Desvio Total</TableCell>
                                </TableRow>
                                <TableRow id="datos">
                                    <TableCell align="center">{proyectoId}</TableCell>
                                    <TableCell align="center">{proyectoName}</TableCell>
                                    <TableCell align="center">{obtenerSumaHorasProyecto()}</TableCell>
                                    <TableCell align="center">{obtenerSumaHorasEstimadas()}</TableCell>
                                    <TableCell align="center">{obtenerSumaHorasProyecto() - obtenerSumaHorasEstimadas()}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Nombre de la tarea</TableCell>
                                    <TableCell align="center">Id de la tarea</TableCell>
                                    <TableCell align="center">Suma de horas</TableCell>
                                    <TableCell align="center">horas estimadas</TableCell>
                                    <TableCell align="center">Desvio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {show && listaTareas.map((tarea)=>(
                                    <TableRow>
                                        <TableCell align="center">{tarea.name}</TableCell>
                                        <TableCell align="center">{tarea.id}</TableCell>
                                        <TableCell align="center">{calcularSumaHoras(tarea.id)}</TableCell>
                                        <TableCell align="center">{horasEstimadas(tarea.estimated_hours_effort)}</TableCell>
                                        <TableCell align="center">{calcularDesvio(calcularSumaHoras(tarea.id), tarea.estimated_hours_effort)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
            </div>
        </container>
    );
}; 
/*<>{setSum(proyecto.cantidad_horas)}</> */
export default ModalInformacionReportes

/*calcularDesvio(calcularSumaHoras(tarea.id), tarea.estimated_hours_effort */

/*
{show && reporteProyectos.map((proyecto) => (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="center">{proyecto.tareaNombre}</TableCell>
                                            <TableCell align="center">{proyecto.tarea_id}</TableCell>
                                            <TableCell align="center">{proyecto.cantidad_horas}</TableCell>
                                            
                                        </TableRow>
                                        
                                        ))}

                                        
*/