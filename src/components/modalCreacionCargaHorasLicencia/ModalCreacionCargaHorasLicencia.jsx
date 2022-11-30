import React, { Fragment, useState, useEffect } from "react";
import Calendar from 'react-calendar'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./ModalCreacionCargaHorasLicencia.css";
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


const ModalCreacionCargaDeHorasLicencia = () => {
    const [value, onChange] = useState(new Date());
    const [categorias, setCategorias] = useState([])
    const [CategoriaText, setCategoriaText] = useState('Seleccionar')

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/categorias")
        .then(res=>res.json())
        .then((result)=>{
            setCategorias(result);
        })
    },[])

    const listCategorias = categorias.map(categoria => <NavDropdown.Item id="dropdown-item" onClick={() => {setCategoriaText(categoria.nombre)}}>{categoria.nombre}</NavDropdown.Item>)

    return (
        <container>
            <div id='cargar-horas-licencia'>
                <h2 id="titulo">Seleccionar Proyecto</h2> 
                <NavDropdown title={CategoriaText} id="collasible-dropdown">
                    {listCategorias}
                </NavDropdown>
            </div>
            <div>
                <Calendar onChange={onChange} value={value} showWeekNumbers minDate={new Date(2022, 10,0)} maxDate={new Date(2022, 12,0)}onClickDay={(value, event) => alert(value)}/>
            </div>
        </container>
    ); 
}; 

export default ModalCreacionCargaDeHorasLicencia