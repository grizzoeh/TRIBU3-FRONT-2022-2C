import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
//import "../../../ticketsEncurso/ticketsEnCurso.css";
import "./tareasProyecto.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import * as SERVER_NAMES from "../../APIRoutes";
import MockProjects from "../../../../Mock/projects";
import KanbanDashboard from "./kanbanDashboard";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function DashboardTareas() {
    const params = useParams();
  const SERVER_NAME = "https://squad-8-projects.herokuapp.com";
  const [tareas, setTareas] = useState([]);
  const [proyecto, setProyecto] = useState([]);

  const [filters, setFilters] = useState({
      "Estado": "Todas",
      "estado": "Todos",
      "criticidad": "Todas",
      "cliente": "Todos",
  });

  let assigneeQuery="";
  let priorityQuery="";
  const [assignees, setAssignees] = useState([]);
  const [assignee, setAssignee] = useState('Seleccionar');
  const [priority, setPriority] = useState('---');

  const handleAssigneeFilter = (e) => {
    e==="Ninguno"?setAssignee(e):setAssignee(assignees.find((assignee) => assignee.legajo == e).Nombre + " " + assignees.find((assignee) => assignee.legajo == e).Apellido);
    e==="Ninguno"?assigneeQuery="":assigneeQuery="assignee="+e+"&";
    getTarea();
  };

  const handlePriorityFilter = (e) => {
    setPriority(e);
    priorityQuery="priority="+e+"&";
    getTarea();
  };

  const handleDropdownFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.innerHTML });

    console.log("filters", filters);


};

  const getAssignees = async () => {
    axios
        .get(SERVER_NAMES.ASSIGNEES , {})
        .then((res) => {
            setAssignees(res.data);
        })
        .catch((err) => {
            alert('Se produjo un error al consultar los clientes', err);
        });
  };

  const getTarea = async () => {
    let url = `/psa/projects/${params.id}/tasks/?`;
    setTareas([])
    //url += priorityQuery;
    url += assigneeQuery;
    axios
        .get(SERVER_NAME + url, {})
        .then((res) => {
            setTareas(res.data);
        })
        .catch((err) => {
            alert('Se produjo un error al consultar los proyectos', err);
        });
};
  useEffect(() => {
    // const getProyectos = async () => {
    //     setProyectos(MockProjects);
    // };

    const getProyecto = async () => {
        axios
          .get(SERVER_NAME + `/psa/projects/${params.id}`, {})
          .then((res) => {
            setProyecto(res.data);
          })
          .catch((err) => {
            alert('Se produjo un error al consultar los proyectos', err);
          });
      };

    const getTareas = async () => {
      axios
       .get(SERVER_NAME + `/psa/projects/${params.id}/tasks/`, {})
       .then((res) => {
         setTareas(res.data);
       })
       .catch((err) => {
         alert('Se produjo un error al consultar las tareas para el proyecto', err);
       });
    };

    getProyecto();
    getTareas();
    getAssignees();
  }, [params.id]);

  return (
    <Fragment>
        {/* TODO Proyectos: Mejorar estilo de padding  */}
        <Container className="container-title">

            <Row>
                <Col xs="auto">
                    <h1> {proyecto.name} - Tareas</h1>
                </Col>

            </Row>
            <Row xs="auto">
            < Col>
                <Link to={`/proyectos/${proyecto.id}/crear-tarea/`}>
                    <Button variant="primary" onClick={() => console.log("click crear tarea")}>Crear Tarea</Button>
                </Link>
            </Col>
            < Col>
                    <Button variant="primary" onClick={() => console.log("click diagrama gannt")}>
                        Diagrama de Gannt
                    </Button>
                    
            </Col>
            </Row>

            <Row><Container className="container-filters">
                <Row>
                    {/*<Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {showEnTicketsEnCurso}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="En curso" onClick={(e) => handleDropdownEnCursoCerrado(e)}>En curso</Dropdown.Item>
                                <Dropdown.Item name="Cerrados" onClick={(e) => handleDropdownEnCursoCerrado(e)}>Cerrados</Dropdown.Item>


                            </Dropdown.Menu>
                        </Dropdown>
  </Col>*/}
                    <Col>
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
                        <h4>Criticidad:</h4>
                    </Col>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {filters["criticidad"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Todas</Dropdown.Item>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Baja</Dropdown.Item>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Media</Dropdown.Item>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Alta</Dropdown.Item>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Crítica</Dropdown.Item>



                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col>
                        <h4>Estado2:</h4>
                    </Col>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {filters["estado"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Todos</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Abierto</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>En análisis</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Derivado</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Resuelto</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Cancelado</Dropdown.Item>



                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col>
                        <h4>Cliente:</h4>
                    </Col>
                    {/*<Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {filters["cliente"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="cliente" onClick={(e) => { handleDropdownFilter(e) }}>Todos</Dropdown.Item>
                                {clientes?.map((cliente) => {
                                    return (
                                        <Dropdown.Item name="cliente" onClick={(e) => handleDropdownFilter(e)}>{cliente["razon social"]}</Dropdown.Item>
                                    )
                                })}

                            </Dropdown.Menu>
                        </Dropdown>
                              </Col>*/}
                </Row>

            </Container></Row>
            <Row>
                <Container className="container-cards">
                <KanbanDashboard initialTasks={tareas} setTasks={setTareas}/>

                    {/* {tareas.filter(
                      (tarea) => {
                        //apply filters with categoria, criticidad and estado
                        return (
                          (filters["Estado"] === "Todas" || tarea.categoria === filters["Estado"]) &&
                          (filters["criticidad"] === "Todas" || tarea.criticidad === filters["criticidad"]) &&
                          (filters["estado"] === "Todos" || tarea.estado === filters["estado"])
                          //(filters["cliente"] === "Todos" || clientes[ticket.idCliente - 1]["razon social"] === filters["cliente"])
                        );
                      }
                    )} */}
                </Container>
            </Row>

        </Container>


    </Fragment >
);

}