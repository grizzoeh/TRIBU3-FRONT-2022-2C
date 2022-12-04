import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import "./ModalCreacionCargaHoras.css";
import Dropdown from 'react-bootstrap/NavDropdown';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Calendar from 'react-calendar'
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
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
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@mui/material/TextField';
import { DatePicker, Space } from 'antd';
import { ConfigProvider } from 'antd';
import locale from 'antd/es/locale/es_ES';
import moment from 'moment';
import 'moment/locale/es';


moment.locale('es-es', {
  week: {
    dow: 1 /// Date offset
  }
});

const MAXHORAS = 8;
const MINHORAS = 1;
const DIA = 24;

const ModalCreacionCargaDeHorasProyecto = () => {
    const [value, onChange] = useState(new Date());
    const [calendarType, setCalendarType] = useState(undefined);
    const [isShown, setIsShown] = useState(false);
    const [proyectos, setProyectos] = useState([])
    const [ProjectText, setProjectText] = useState('Seleccionar')
    const [dropdownTareaText, setdropdownTareaText] = useState('Seleccionar')
    let [cantidad_horas, setCount] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [proyectoNombre, setProyectoNombre] = useState();
    const [legajo, setLegajo] = useState();
    let [tarea_id, setTarea_id] = useState();
    const [tareaNombre, setTareaNombre] = useState();
    const [tareas, setTareas] = useState([]);
    const [proyectoId, setProyectoId] = useState();
    const today = new Date();
    const limiteFecha = new Date(today.getFullYear(), today.getMonth(), (today.getDate() - 7));
    const [categorias, setCategorias] = useState([])
    const [categoriaNombre, setcategoriaNombre] = useState()
    const [categoria,setCategoria] = useState(-1)


    const cambioAnt = (data) => {
        console.log("Cambio la fecha para tipo " + calendarType)
        if(calendarType === "month"){
            const fecha = new Date(data.$d)
            console.log("Busco los dias del mes " + parseInt(data.$M + 1));
            const desde = new Date (fecha.getFullYear(), fecha.getMonth(), 1 );
            const hasta = new Date(fecha.getFullYear(), fecha.getMonth() + 1, 0);
            setStartDate(desde);
            setFinishDate(hasta);
            console.log(`Voy mensualmente desde ${desde} hasta ${hasta}`);
        }
        if (calendarType === "week"){
            console.log("Elijo la semana");
            const desde = new Date(data.$d)
            const hasta = new Date(data.$d);
            hasta.setDate(hasta.getDate() + 7);
            setStartDate(desde);
            setFinishDate(hasta);
            console.log(`Voy semanalmente desde ${desde} hasta ${hasta}`);
        }
        if (calendarType === "biweekly"){
            console.log("Quincenal");
            const desde = new Date(data.$d);
            let hasta = undefined;
            if(desde.getDate() == 1){
                hasta = new Date(data.$d);
                hasta.setDate(hasta.getDate() + 14);
            }
            else{
                hasta = new Date(desde.getFullYear(), desde.getMonth() + 1, 0);
            }
            setStartDate(desde);
            setFinishDate(hasta);
            console.log(`La quincena va desde ${desde} hasta ${hasta}`)

        }
        console.dir(data);
        console.log(data.$D);
    }


    function procedimientoTareaElegida(nombreTarea, tareaId){
        setdropdownTareaText(nombreTarea)
        setTareaNombre(nombreTarea)
        setTarea_id(tareaId)
    }

    useEffect(()=>{
        fetch("https://squad-8-projects.herokuapp.com/psa/projects/")
        .then(res=>res.json())
        .then((result)=>{
            setProyectos(result);
        })
    },[])

    useEffect(()=>{
        fetch("https://squad920222c-production.up.railway.app/recursos/categorias")
        .then(res=>res.json())
        .then((result)=>{
            setCategorias(result);
        })
    },[]);
    
    
    const handleClick =() => {
        const estado = 'Emitido'
        const fecha_inicio = startDate.getDate() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getFullYear();
        const fecha_fin = finishDate.getDate() + '-' + (finishDate.getMonth() + 1) + '-' + finishDate.getFullYear();
        const carga={cantidad_horas, categoria, estado, legajo, proyectoId, proyectoNombre, tarea_id, tareaNombre, categoriaNombre, categoria, fecha_inicio, fecha_fin}
        fetch(`https://squad920222c-production.up.railway.app/recursos/cargas`, {
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify(carga),
        }).then((res)=>{
            if (res.status >= 200 && res.status <= 300) {
                alert("Salio todo bien")
            }
            if (res.status >=400) {alert("todo mal")}
        })
    }

    function getClick(IdProyecto) {
        const url = 'https://squad-8-projects.herokuapp.com/psa/projects/' + IdProyecto + '/tasks/';
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setTareas(data);
            console.log("Tarea = "+ tareas)
        });
        setIsShown(true)
    }

    const listProyectos = proyectos.map(proyecto => <NavDropdown.Item id="dropdown-item" /*proyecto.id ???????????? */
                                                    onClick={() => {funcion1(proyecto)}}>{proyecto.name}
                                                    </NavDropdown.Item>)

    const listCategorias = categorias.map(categoria => <NavDropdown.Item id="dropdown-item" onClick={() => {handleCategoriaClick(categoria)}}>{categoria.nombre}</NavDropdown.Item>)

    function incrementCount() {
        if(cantidad_horas+1 <= MAXHORAS){
            cantidad_horas = cantidad_horas + 1;
            setCount(cantidad_horas);
        }
        console.log("cantidad de horas: "+cantidad_horas)
    }
    function decrementCount() {
        if(cantidad_horas-1 >= MINHORAS){
            cantidad_horas = cantidad_horas - 1;
            setCount(cantidad_horas);
        }
        console.log("cantidad de horas: "+cantidad_horas)
    }

    function incrementDayCount(){
        cantidad_horas += DIA;
        setCount(cantidad_horas);
    }

    function decrementDayCount(){
        cantidad_horas -= DIA;
        setCount(cantidad_horas);
    }

    function incrementJornadaCount(){
        cantidad_horas += MAXHORAS;
        setCount(cantidad_horas);
    }

    function decrementJornadaCount(){
        cantidad_horas -= MAXHORAS;
        setCount(cantidad_horas);
    }

    function funcion1(proyecto){
        getClick(proyecto.id);
        setProjectText(proyecto.name);
        setProyectoNombre(proyecto.name);
        setProyectoId(proyecto.id);
    }

    function handleCategoriaClick(categoria){
        setCategoria(categoria.idCategoria);
        setcategoriaNombre(categoria.nombre);
        setProjectText(categoria.nombre);
        setIsShown(false);
        setProyectoNombre();
        setProyectoId();
        setTareaNombre();
        setTarea_id();
    }

    const disableDate = (current) =>{
        return (
            (new Date(current).getDay() !== 1)
        );
    }

    const soloQuincena = (current) =>{
        return (
            (new Date(current).getDate() !== 1) && (new Date(current).getDate() !== 15)
        );
    }

    return (
        <ConfigProvider locale={locale}>
        <Container>
            <div id='cargar-horas-licencia'>
                <h2 id="titulo1">Seleccionar Proyecto/Categoria</h2> 
                <NavDropdown title={ProjectText} id="navBarProyectos">
                    {listProyectos}
                    {listCategorias}
                </NavDropdown>
            </div>
            <div id = "search">
                {isShown && <div id='cargar-horas-licencia'>
                                <h2 id="titulo">Seleccionar Tarea</h2>
                                <NavDropdown title={dropdownTareaText} id="navBarTareas">
                                    {tareas.map(tarea => <NavDropdown.Item id="dropdown-item"
                                            onClick={() => {procedimientoTareaElegida(tarea.name, tarea.id);setTarea_id(tarea.id)}}>{tarea.name}</NavDropdown.Item>)}
   
                                </NavDropdown>
                            </div>}
                <div id="cargar-horas-licencia">
                    <div id="Texto-seleccionar-horas" >
                        <TextField id="outlined-basic" label="Ingrese legajo" variant="outlined" sx={{ minWidth: 320 }} value={legajo} onChange={(e)=>{setLegajo(e.target.value)}}/>
                        <div>
                            <Button onClick={() => setCalendarType("week")}>Semanal</Button>
                            <Button onClick={() => setCalendarType("biweekly")}>Quincenal</Button>
                            <Button onClick={() => setCalendarType("month")}>Mensual</Button>
                        </div>
                        <h6 id='texto'>Seleccionar horas de actividad</h6>
                        {cantidad_horas}
                    </div>
                    <div id="botonera">   
                    <Button id="dia"   className="Boton-botonera" onClick={decrementDayCount}>-24</Button>  
                    <Button id="dia"   className="Boton-botonera" onClick={decrementJornadaCount}>-8</Button>        
                    <Button id="resta" className="Boton-botonera" onClick={decrementCount}>-1</Button>
                    <Button id="suma"  className="Boton-botonera" onClick={incrementCount}>+1</Button>
                    <Button id="dia"   className="Boton-botonera" onClick={incrementJornadaCount}>8</Button>
                    <Button id="dia"   className="Boton-botonera" onClick={incrementDayCount}>24</Button>
                    </div> 
                </div>             
                <div id="pruebas">
                    {calendarType && (
                       <>
                            <p>{calendarType}</p>
                            {calendarType === "week" && (
                                <DatePicker locale={"es_AR"} onChange={(e) => cambioAnt(e)} picker={"date"} disabledDate={disableDate} />
                            )}
                            {calendarType === "month" && (
                                <DatePicker locale={"es_AR"} onChange={(e) => cambioAnt(e)} picker={calendarType} />
                            )}
                            {calendarType === "biweekly" && (
                                <DatePicker locale={"es_AR"} onChange={(e) => cambioAnt(e)} picker={"date"} disabledDate={soloQuincena} />
                            )}

                        </>
                    )}
                    

                </div>
                <div id='calendarioBoton'>
                    <Row>
                        {/* <Col>
                            <h6>Selecciona Fecha Inicio</h6>
                            <DatePicker selected={startDate} id="Calendar" onChange={(date) => setStartDate(date)} maxDate={today} minDate={limiteFecha}/>                             
                            <h6>Selecciona Fecha Fin</h6>
                            <DatePicker selected={finishDate} id="Calendar" onChange={(date) => setFinishDate(date)} maxDate={today} minDate={limiteFecha}/>
                        </Col> */}
                    </Row>
                    <Button id="button" onClick={handleClick}>Boton para postear aca</Button>
                </div> 
            </div>
        </Container>
        </ConfigProvider>
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