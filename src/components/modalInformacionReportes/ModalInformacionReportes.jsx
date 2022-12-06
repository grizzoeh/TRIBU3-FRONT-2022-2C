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
import LoadingButton from '@mui/lab/LoadingButton';
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
    const [proyectoName,setProyectoNombre] = useState(undefined);
    const [cargas, setCargas] = useState([]);
    const [sumaDesvios, setSumaDesvios] = useState(0);
    const [sumaHoras, setSumaHoras] = useState(0);
    const [sumaHorasTotales, setSumaHorasTotales]  = useState(0);
    const [sumaHorasEstimadas, setSumaHoraEstimadas]  = useState(0);
    const [sumaTiempoEstimado, setSumaTiempoEstimado] = useState(0);
    const [prueba,setPrueba] = useState([]);
    const [cargasDeProyecto, setCargasProyecto] = useState([])
    const [alreadyThere, setAlreadyThere] = useState([])
    const [loadingScreen, setLoadingScreen] = useState(false)
    const [sumaHorasProyecto, setSumaHorasProyecto] = useState(0);
    const [cargasTotales, setCargasTotales] = useState([])


    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/cargas")
        .then(res=>res.json())
        .then((result)=>{
            setCargasProyecto(result);
        })
    },[])


    useEffect( () => {
        if(proyectoName && listaTareas.length != 0 && cargas.length != 0 && cargasTotales){
            setShow(true)
        }
        else {
            setShow(false);
        }
    }, [proyectoName, listaTareas, cargas, cargasTotales])

    useEffect( () => {
        if(listaTareas.length != 0){   
            obtenerSumaHorasProyecto();
            obtenerSumaHorasEstimadas();
        }
    }, [listaTareas])

    const handleClick = async () => {
        setProyectoNombre(undefined);
        setListaTareas([]);
        setAlreadyThere([]);
        if(!proyectoId){
            alert("Por favor ingrese un id de proyecto");
            return;
        }

        const urlProyecto = `https://squad-8-projects.herokuapp.com/psa/projects/` + proyectoId;
        const resNombre = await fetch(urlProyecto);
        if(!resNombre.ok){
            alert("No existe ese proyecto");
            return;
        };
        const nombre = await resNombre.json();
        setProyectoNombre(nombre.name);

        
        const urlTareas = `https://squad-8-projects.herokuapp.com/psa/projects/` + proyectoId + "/tasks/";
        const resTareas = await fetch(urlTareas);
        const tareas = await resTareas.json();
        setListaTareas(tareas);

        const urlTareas2 = `https://squad920222c-production.up.railway.app/recursos/reporte/proyecto/` + proyectoId;
        const resTareas2 = await fetch(urlTareas2);
        if(!resTareas2.ok) alert("No hay carga de horas para ese proyecto");
        const tareas2 = await resTareas2.json();
        parsearCargas(tareas, tareas2);
        setCargas(tareas2);
    }
    
    const parsearCargas = (tareas, cargasArray) => {
        const final = []
        cargasArray.map(carga => { 
            const existente = final.find(e => e.id === carga.tarea_id)
            if (existente) {
                existente.sumaHoras = existente.sumaHoras + carga.cantidad_horas;

                existente.desvio = existente.desvio + carga.cantidad_horas;
                return;
            }

            let nuevaCarga = {}
            nuevaCarga.nombre = carga.tareaNombre;
            nuevaCarga.id = carga.tarea_id;
            nuevaCarga.sumaHoras = carga.cantidad_horas;
            const tarea = tareas.find(e => e.id === nuevaCarga.id)
            let estimadas = 0;
            if (tarea && tarea.estimated_hours_effort) {
                estimadas = tarea.estimated_hours_effort
            }
            nuevaCarga.estimadas = estimadas; 

            nuevaCarga.desvio = nuevaCarga.sumaHoras - nuevaCarga.estimadas;
            final.push(nuevaCarga);
        })
        setCargasTotales(final);
    }


    const cargarListaTareas = () => {
        setListaTareas([])
        const urlTareas = `https://squad-8-projects.herokuapp.com/psa/projects/` + proyectoId + "/tasks/";
        fetch(urlTareas)
        .then((res) => res.json())
        .then((data) => {
            setListaTareas(data);
        });
    }

    const cargarCargasProyecto = () => {
        setAlreadyThere([])
        const urlTareas = `https://squad920222c-production.up.railway.app/recursos/reporte/proyecto/` + proyectoId;
        fetch(urlTareas)
        .then((res) => res.json())
        .then((data) => {
            setCargas(data);
        });
    }

    function obtenerSumaHorasEstimadas(){
        if(!listaTareas) return;
        
        var sumaTotalEstimativos = 0;

        listaTareas.map((tarea)=>{
            if(tarea.estimated_hours_effort != null){
                sumaTotalEstimativos += tarea.estimated_hours_effort;
            }
        })

        setSumaHoraEstimadas(sumaTotalEstimativos);
    }


    function obtenerSumaHorasProyecto(){
        const url = `https://squad920222c-production.up.railway.app/recursos/reporte/proyecto/` + proyectoId + '/tiempoTotal';
        fetch(url)
        .then(res=>res.json())
        .then((result)=>{
            setSumaHorasProyecto(result)
        })
    }

    function calcularDesvio(sumaHoras, tiempoEstimado){
        
        
        if (tiempoEstimado == null){
            return sumaHoras;
        }
        return (parseInt(sumaHoras) - parseInt(tiempoEstimado))
    }

    const horasEstimadas = (tarId) => {
        let x=0
        for(let i=0; i<listaTareas.length; i++){
            if(listaTareas[i].id == tarId){
                x= (!listaTareas[i].estimated_hours_effort?0:listaTareas[i].estimated_hours_effort)
            }
        }
        return x
    }

    const sumaHorasTareas = (tarId) =>{
        let x=0
        for(let i=0; i<cargasDeProyecto.length; i++){
            if(cargasDeProyecto[i].tarea_id == tarId){
                x+=cargasDeProyecto[i].cantidad_horas
            }
        }
        return x
    }
    
    const asignarProyecto = (valor) =>{
        if(valor != null){
            setProyectoId(valor)
        }
    }

    return (
        <Container>
            <div id = 'proyectoId'>
                <TextField id="outlined-basic" label="Consultar Reportes por Proyecto" variant="outlined" sx={{ minWidth: 650 }} onChange={(e)=>{asignarProyecto(e.target.value)}}/>
                <Col className="h-end"><Button variant="primary" size="1"  onClick={handleClick} id='boton'>Consultar Proyecto</Button></Col>
                {loadingScreen && <LoadingButton loading variant="outlined">
                    Submit
                </LoadingButton>}
                <React.Fragment>
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
                                    <TableCell align="center">{sumaHorasProyecto}</TableCell>
                                    <TableCell align="center">{sumaHorasEstimadas}</TableCell>
                                    <TableCell align="center">{sumaHorasProyecto - sumaHorasEstimadas}</TableCell>
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
                                {show && cargasTotales.map((carga)=>(
                                    <TableRow key={carga.id}>
                                        <TableCell align="center">{carga.nombre}</TableCell>
                                        <TableCell align="center">{carga.id}</TableCell>
                                        <TableCell align="center">{carga.sumaHoras}</TableCell>
                                        <TableCell align="center">{carga.estimadas}</TableCell>
                                        <TableCell align="center">{carga.desvio}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </React.Fragment>
            </div>
        </Container>
    );
}; 

export default ModalInformacionReportes
