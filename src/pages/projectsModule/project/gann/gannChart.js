import * as SERVER_NAMES from "../../APIRoutes";

import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import axios from "axios";
import {useParams} from 'react-router-dom';
import moment from 'moment';
import { Container } from "react-bootstrap";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import { DragDropContext } from 'react-beautiful-dnd';
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import { wait } from "@testing-library/user-event/dist/utils";

import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";


export default function GannChart() {

    const google = window.google;

   const columns = [
        { type: "string", label: "ID Tarea" },
       { type: "string", label: "Nombre" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Esfuerzo estimado" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
    ]

    const SERVER_NAME = "https://squad-8-projects.herokuapp.com";
    const params = useParams();
    const [tareas, setTareas] = useState([]);
    const [clients, setClients] = useState([]);
    const [assignees, setAssignees] = useState([]);

    let assigneeQuery="";
    let priorityQuery="";
    const [assignee, setAssignee] = useState('Seleccionar');
    const [assigneeID, setAssigneeID] = useState([]);
    const [priority, setPriority] = useState([]);
    const [maxDate, setMaxDate] = useState("2030-01-01T21:18:01");
    const [minDate, setMinDate] = useState("2001-01-01T21:18:01");
    const [allTareas, setAllTareas] = useState(1);
   
   const [filters, setFilters] = useState({
    "Estado": "Todas",
    "estado": "Todos",
    "criticidad": "Todas",
    "cliente": "Todos",
});

const handleAssigneeFilter = (e) => {
  e==="Ninguno"?setAssignee(e):setAssignee(assignees.find((assignee) => assignee.legajo == e).Nombre + " " + assignees.find((assignee) => assignee.legajo == e).Apellido);
  e==="Ninguno"?assigneeQuery="":assigneeQuery="assignee="+e+"&";
  setAssigneeID(e);
  //getTarea();
};

useEffect(() => {
    getTarea();
  }, [assigneeID])

const handlePriorityFilter = (e) => {
  
  e.target.value==0?priorityQuery="":priorityQuery="priority="+e.target.value+"&";
  setPriority(e.target.value);
  //getTarea();
};

useEffect(() => {
    getTarea();
  }, [priority])

const getTarea = async () => {
  let url = `/psa/projects/${params.id}/tasks/?`;
  setTareas([])
  assigneeID==="Ninguno"?assigneeQuery="":assigneeQuery="assignee="+assigneeID+"&";
  priority==0?priorityQuery="":priorityQuery="priority="+priority+"&";
  url += priorityQuery;
  url += assigneeQuery;
  console.log(priorityQuery);
  console.log(assigneeQuery);
  axios
      .get(SERVER_NAME + url, {})
      .then((res) => {
          setTareas(res.data);
      })
      .catch((err) => {
          alert('Se produjo un error al consultar las tareas para el proyecto', err);
      });
      setTareas( tareas.filter(tarea=>!(tarea.estimated_start_date==null &&
        (tarea.estimated_finalization_date!=null && tarea.estimated_hours_effort!=null ) )|| 
        (tarea.estimated_finalization_date==null &&( tarea.estimated_start_date!=null && tarea.estimated_hours_effort!=null ) )||
        (tarea.estimated_hours_effort==null  && ( tarea.estimated_start_date!=null&& tarea.estimated_hours_effort!=null ))))
      
  };

const getAssignees = async () => {
    axios
        .get(SERVER_NAMES.ASSIGNEES, {})
        .then((res) => {
             setAssignees(res.data);
        })
        .catch((err) => {
             alert('Se produjo un error al consultar los clientes', err);
         });
};

useEffect(() => {
  let startDate = "2030-01-01T21:18:01"
  let finDate = "2001-01-01T21:18:01"
  
  if (allTareas < 2 && tareas.length > 0) {
    setAllTareas(2);
    tareas.forEach(tarea => {
        if (tarea.estimated_start_date < startDate) {
            startDate = tarea.estimated_start_date; 
            setMaxDate(tarea.estimated_start_date);
        }
        if (tarea.estimated_finalization_date > finDate) {
            finDate = tarea.estimated_finalization_date;
            setMinDate(tarea.estimated_finalization_date);
        }
        setMaxDate(finDate);
        setMinDate(startDate);
    });
  }
  
   }, [tareas]);
useEffect(() => {
     // const interval = setInterval(() => {
     //     getAssignees();
     //     getTareas();
     // }, 3000);
     // return () => clearInterval(interval);
getAssignees();
getTarea();
    }, []);
<Button variant="primary">
          Volver atrás
                    </Button>
    // const options = {
    //     height: 600,
    //     gantt: {
    //       defaultStartDateMillis: new Date(2015, 3, 28),
    //     },
    //   };

const options = {
    height: 700,
    width: 1000,
    title: "Nearby galaxies",
    gantt: {
      trackHeight: 30
    },
  };
return (


<Fragment>
<br></br>
<br></br>
<br></br>
<br></br>
  <h1> Diagrama de Gantt</h1>
  <div>
  <Link to={`/proyectos/${params.id}/ver-tareas/`}>
            <Button variant="primary" onClick={() => console.log("click diagrama gannt")}>
                Volver Atras
            </Button>
        </Link>     
      </div>
      <br></br>

      <Row className="mt-5"> <Col>
                        <h4>Empleado asignado:</h4>
                    </Col>
                    <Col >
                        <DropdownButton
                            variant="secondary" id="dropdown-basic" size="xl"
                            title={assignee}
                            onSelect={handleAssigneeFilter}
                        >
                            <Dropdown.Item eventKey={"Ninguno"} name="management">
                                {"Ninguno"}
                            </Dropdown.Item>
                            {assignees.map((assignee) => {
                                return (
                                    <Dropdown.Item eventKey={assignee.legajo} name="management">
                                        {assignee.Nombre + " " + assignee.Apellido}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </Col>
                            
                      <Col>
                        <h4>Prioridad:</h4>
                    </Col>
                    <Col >
                    <Form.Control
                        type="number"
                        min="0"
                        placeholder="Ej: 2"
                        name="priority"
                        onChange={(e) => handlePriorityFilter(e)}/>
                    </Col></Row>
                    
                
        <NavbarProyectos/>
        <Container key="chart-container">
        <br></br>
        <br></br>
        <br></br>

           
        {tareas.length > 0 ?<Chart chartType="Gantt" options={options} chartLanguage="es" legendToggle={false} data={

            [columns,...tareas.map((tarea) => {
                /*
                    Si hay tareas que no tienen cargado estimated_start_date 
                    y estimated_finalization_date entonces se les pone
                    como fechas la estimated_finalization_date maxima
                    y la estimated_start_date minima. Decisión de diseño
                */
                return [tarea.id,
                     tarea.name,
                     tarea.description,
                     tarea.estimated_start_date?moment(tarea.estimated_start_date, "YYYY-MM-DD").toDate():moment(minDate, "YYYY-MM-DD").toDate(),
                     tarea.estimated_finalization_date?moment(tarea.estimated_finalization_date, "YYYY-MM-DD").toDate():moment(maxDate, "YYYY-MM-DD").toDate(),
                     tarea.estimated_hours_effort,
                     null,
                     null

                   /*  tarea.estimated_finalization_date,
                     tarea.estimated_hours_effort,
                    /* tarea.state,
                     tarea.dependencies
                                     
                     //new Date(tarea.creation_date),

                     */
                 ]
             })]
        }/>:<Col class="col-xs-1" align="center"><h4>No se encontraron tareas</h4></Col>}
        

        </Container>
        </Fragment>

    );
}
