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


const MAXHORAS = 24;
const MINHORAS = 0;

const ModalCreacionCargaDeHorasProyecto = () => {
    const [value, onChange] = useState(new Date());
    const [isShown, setIsShown] = useState(false);
    const [proyectos, setProyectos] = useState([])
    const [ProjectText, setProjectText] = useState('Seleccionar')
    const [mostrarHoras, setMostrarHoras] = useState(false);
    const [dropdownTareaText, setdropdownTareaText] = useState('Seleccionar')
    let [count, setCount] = useState(0);
    const[fecha, setFecha] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    
    let Tareas = ['Tarea A', 'Tarea B', 'Tarea C', 'Tarea D'];
    let listTareas = Tareas.map(tarea => <NavDropdown.Item id="dropdown-item"
                                            onClick={() => procedimientoTareaElegida(tarea)}>{tarea}</NavDropdown.Item>)

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
    const listProyectos = proyectos.map(proyecto => <NavDropdown.Item id="dropdown-item" 
                                                    onClick={() => {handleClick(); 
                                                    setProjectText(proyecto.name)}}>{proyecto.name}
                                                    </NavDropdown.Item>)


    const handleClick = event => {
        setIsShown(true);
    }
    
    function incrementCount() {
        if(count+1 <= MAXHORAS){
            count = count + 1;
            setCount(count);
        }
    }
    function decrementCount() {
        if(count-1 >= MINHORAS){
            count = count - 1;
            setCount(count);
        }
    }

    return (
        <container>
            <div id='cargar-horas-licencia'>
                <h2 id="titulo">Seleccionar Proyecto</h2> 
                <NavDropdown title={ProjectText} id="collasible-dropdown">
                    {listProyectos}
                </NavDropdown>
                {isShown && <div id='cargar-horas-licencia'>
                                <h2 id="titulo">Seleccionar Tarea</h2>
                                <NavDropdown title={dropdownTareaText} id="collasible-dropdown">
                                    {listTareas}   
                                </NavDropdown>
                            </div>}
                {mostrarHoras && <div className="App">
                                    <div>
                                        <h6 id="Texo-seleccionar-horas">Seleccionar horas trabajadas</h6>
                                        {count}
                                    </div>
                                    <button onClick={incrementCount}>+</button>
                                    <button onClick={decrementCount}>-</button>
                                </div>}
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />                
                
            </div>
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