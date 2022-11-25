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

class ShowTarea extends React.Component {
    render () {
        const listTareas = this.props.Tareas.map(tarea => <NavDropdown.Item id="dropdown-item" onClick={() => this.props.setdropdownTareaText(tarea)}>{tarea}</NavDropdown.Item>)

        return (
            <div id='cargar-horas-licencia'>
            <h2 id="titulo">Seleccionar Tarea</h2>
            <NavDropdown title={this.props.dropdownTareaText} id="collasible-dropdown">
                {listTareas}   
            </NavDropdown>
            </div>
        );
    };     
};

class MostrarProyecto extends React.Component {
    render () {
        

        const handleClick = event => {
            this.props.setIsShown(true);
        }
        
        const Proyectos = ['Proyecto A', 'Proyecto B', 'Proyecto C', 'Proyecto D']
        const Tareas = ['Tarea A', 'Tarea B', 'Tarea C', 'Tarea D'];
        const listProyectos = Proyectos.map(proyecto => <NavDropdown.Item id="dropdown-item" onClick={() => {handleClick(); this.props.setdropdownProjectText(proyecto)}}>{proyecto}</NavDropdown.Item>)

        let TareasProps = {
            dropdownTareaText: this.props.dropdownTareaText,
            setdropdownTareaText: this.props.setdropdownTareaText,
            Tareas: Tareas /*manda lista de tareas */
        }

        return (
            <div id='cargar-horas-licencia'>
                <h2 id="titulo">Seleccionar Proyecto</h2> 
                <NavDropdown title={this.props.dropdownProjectText} id="collasible-dropdown">
                    {listProyectos}
                </NavDropdown>
                {this.props.isShown && <ShowTarea {...TareasProps} />}
            </div>

        )
    }
};

class MostrarCalendario extends React.Component {
    render() {
        return(
            <container>
                <div>
                    <Calendar onChange={this.props.onChange} value={this.props.value} showWeekNumbers minDate={new Date(2022, 10,0)} maxDate={new Date(2022, 12,0)}onClickDay={(value, event) => alert(value)}/>
                </div>
            </container>
        )
    }
}

const ModalModificacionCargaHoras = () => {
    const [value, onChange] = useState(new Date()); 
    const [isShown, setIsShown] = useState(false);
    const [dropdownProjectText, setdropdownProjectText] = useState('Seleccionar') /*Talvez tiene que estar en las class */
    const [dropdownTareaText, setdropdownTareaText] = useState('Seleccionar'); /*Ver como meter useState en class para meterlo ahi en vez de por props*/

    let CalendarProps = {
        value: value,
        onChange: onChange,
    };

    let ProyectoProps ={ /*props de proyectos, ultimos 2 son de tareas */
        isShown: isShown,
        setIsShown: setIsShown,
        dropdownProjectText: dropdownProjectText,
        setdropdownProjectText: setdropdownProjectText,
        dropdownTareaText: dropdownTareaText,
        setdropdownTareaText: setdropdownTareaText
    };

    return (
        <container>
            <div>
                <MostrarProyecto {...ProyectoProps}/>
            </div>
            
            <div>
                <MostrarCalendario {...CalendarProps}/>
            </div>
        </container>
    );
}; 

export default ModalModificacionCargaHoras