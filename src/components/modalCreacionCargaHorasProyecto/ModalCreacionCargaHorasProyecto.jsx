import React, { Fragment, useState, useEffect } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalCreacionCargaHorasProyecto.css";
import Button2 from '@mui/material/Button';
import axios from "axios";
import Alert from "@mui/material/Alert";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import 'react-calendar/dist/Calendar.css';
import { render } from "@testing-library/react";
import IconButton from '@mui/material/IconButton';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@mui/material/TextField';

const MAXHORAS = 8;
const MINHORAS = 0;

const ModalCreacionCargaDeHorasProyecto = () => {
    const [value, onChange] = useState(new Date());
    const [isShown, setIsShown] = useState(false);
    const [proyectos, setProyectos] = useState([])
    const [ProjectText, setProjectText] = useState('Seleccionar')
    const [mostrarHoras, setMostrarHoras] = useState(false);
    const [dropdownTareaText, setdropdownTareaText] = useState('Seleccionar')
    let [cantidad_horas, setCount] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const [proyectoId,setProyectoId] = useState();
    const [proyectoNombre, setProyectoNombre] = useState();
    const [legajo, setLegajo] = useState();
    const [tarea_id, setTarea_id] = useState();
    const [tareaNombre, setTareaNombre] = useState();


    const Tareas = [{id: 1, name: 'Tarea A'}, {id: 2, name: 'Tarea B'}, {id: 3, name: 'Tarea C'}];
    let listTareas = Tareas.map(tarea => <NavDropdown.Item id="dropdown-item"
                                            onClick={() => {procedimientoTareaElegida(tarea.name);setTareaNombre(tarea.name);setTarea_id(1)}}>{tarea.name}</NavDropdown.Item>)

    function procedimientoTareaElegida(nombreTarea){
        setdropdownTareaText(nombreTarea)
        setMostrarHoras(true)
    }

    useEffect(()=>{
        fetch("https://squad-8-projects.herokuapp.com/psa/projects/")
        .then(res=>res.json())
        .then((result)=>{
            setProyectos(result);
        })
    },[])
    
    const fecha = startDate.getDate() + '-' + startDate.getMonth() + '-' + startDate.getFullYear(); /*3 setdia/mes/anio en un handleClick en datepicker */


    /*estado => revision */
    const postClick=(e)=>{
        e.preventDefault()
        const carga={cantidad_horas, fecha, legajo, proyectoId, proyectoNombre, tarea_id, tareaNombre}
        console.log(carga)
        fetch(`https://squad920222c-production.up.railway.app/recursos/cargas`, {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(carga),
        }).then(()=>{
            console.log("anda")
        })
    }

    

    const listProyectos = proyectos.map(proyecto => <NavDropdown.Item id="dropdown-item" /*proyecto.id ???????????? */
                                                    onClick={() => {handleClick(); 
                                                    setProjectText(proyecto.name);setProyectoNombre(proyecto.name);setProyectoId(proyecto.id)}}>{proyecto.name}
                                                    </NavDropdown.Item>)


    const handleClick = event => {
        setIsShown(true);
    }
    
    function incrementCount() {
        if(cantidad_horas+1 <= MAXHORAS){
            cantidad_horas = cantidad_horas + 1;
            setCount(cantidad_horas);
        }
    }
    function decrementCount() {
        if(cantidad_horas-1 >= MINHORAS){
            cantidad_horas = cantidad_horas - 1;
            setCount(cantidad_horas);
        }
    }

    return (
        <container>
            <div id='cargar-horas-licencia'>
                <h2 id="titulo">Seleccionar Proyecto</h2> 
                <NavDropdown title={ProjectText} id="navBarProyectos">
                    {listProyectos}
                </NavDropdown>
                <TextField id="outlined-basic" label="Ingrese legajo" variant="outlined" sx={{ minWidth: 650 }} value={legajo} onChange={(e)=>{setLegajo(e.target.value)}}/>
                {isShown && <div id='cargar-horas-licencia'>
                                <h2 id="titulo">Seleccionar Tarea</h2>
                                <NavDropdown title={dropdownTareaText} id="navBarTareas">
                                    {listTareas}   
                                </NavDropdown>
                            </div>}
                {mostrarHoras && <div className="App">
                                    <div>
                                        <h6 id="Texo-seleccionar-horas">Seleccionar horas trabajadas</h6>
                                        {cantidad_horas}
                                    </div>
                                    <button id="suma"  onClick={incrementCount}>+</button>
                                    <button id="resta" onClick={decrementCount}>-</button>
                                </div>}
                <DatePicker selected={startDate} id="Calendar" onChange={(date) => setStartDate(date)} />              
                
            </div>
            <Button onClick={postClick}>Boton para postear aca</Button>

        </container>
    ); /*Calendar = https://www.npmjs.com/package/react-calendar*/
}; /* Si no anda Calendar -> npm install react-calendar */
//<Calendar onChange={onChange} value={value} showWeekNumbers minDate={new Date(2022, 10,0)} maxDate={new Date(2022, 12,0)}onClickDay={(value, event) => alert(value)}/>

export default ModalCreacionCargaDeHorasProyecto

/*Para redirigir href="/cargar-horas-proyecto" */
/* <div id='cargar-horas-licencia'>
                    <h2 id="titulo">Seleccionar Licencia</h2>
                    <NavDropdown title="Seleccionar" id="collasible-dropdown">
                        <NavDropdown.Item href="/cargar-horas-proyecto" id="dropdown-item">Proyecto A</NavDropdown.Item>
                        <NavDropdown.Item href="/cargar-horas-licencia" id="dropdown-item">Proyecto B</NavDropdown.Item>
                    </NavDropdown>
            </div>
*/