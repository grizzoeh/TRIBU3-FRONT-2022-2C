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


const ModalCreacionCargaDeHorasProyecto = () => {
    const [value, onChange] = useState(new Date());
    const [isShown, setIsShown] = useState(false);
    
    const [dropdownProjectText, setdropdownProjectText] = useState('Seleccionar')
    const changeDropdownProjectText = (text) => setdropdownProjectText(text);

    const [dropdownTareaText, setdropdownTareaText] = useState('Seleccionar')
    const changeDropdownTareaText = (text) => setdropdownTareaText(text);

    const handleClick = event => {
        setIsShown(true);
    }
    const Proyectos = ['Proyecto A', 'Proyecto B', 'Proyecto C']
    const listProyectos = Proyectos.map(proyecto => <NavDropdown.Item id="dropdown-item" onClick={() => {handleClick(); changeDropdownProjectText(proyecto)}}>{proyecto}</NavDropdown.Item>)

    const Tareas = ['Tarea A', 'Tarea B', 'Tarea C', 'Tarea D'];
    const listTareas = Tareas.map(tarea => <NavDropdown.Item id="dropdown-item" onClick={() => setdropdownTareaText(tarea)}>{tarea}</NavDropdown.Item>)

    return (
        <container>
            <div id='cargar-horas-licencia'>
                <h2 id="titulo">Seleccionar Proyecto</h2> 
                <NavDropdown title={dropdownProjectText} id="collasible-dropdown">
                    {listProyectos}
                </NavDropdown>
                {isShown && <div id='cargar-horas-licencia'>
                                <h2 id="titulo">Seleccionar Tarea</h2>
                                <NavDropdown title={dropdownTareaText} id="collasible-dropdown">
                                    {listTareas}   
                                </NavDropdown>
                            </div>}
            </div>

            <div>
                <Calendar onChange={onChange} value={value} showWeekNumbers minDate={new Date(2022, 10,0)} maxDate={new Date(2022, 12,0)}onClickDay={(value, event) => alert(value)}/>
            </div>
        </container>
    ); /*Calendar = https://www.npmjs.com/package/react-calendar*/
}; /* Si no anda Calendar -> npm install react-calendar */

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