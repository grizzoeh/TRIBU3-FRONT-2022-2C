import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import KanbanColumn from "./kanbanColumn";
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
import { DragDropContext } from 'react-beautiful-dnd';
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import { wait } from "@testing-library/user-event/dist/utils";

import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";

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
    e===0?priorityQuery="":priorityQuery="priority="+e+"&";
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


  const getNewStatus = (stateName) => {
    if (stateName === "Pendiente") {
        return "pending"
    }
    if (stateName === "En progreso") {
        return "in_progress"
    }
    if (stateName === "Finalizada") {
        return "finished"
    }
}

 const updateColumnsTasks = (tasks, taskId, newStatus) => {
    tasks.map((task) => {
        if (task.id.toString() === taskId) {
            task.status = newStatus;
            return task;
        } else {
        return task;
        }
    })
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
            alert('Se produjo un error al consultar las tareas para el proyecto', err);
        });
    };

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

  useEffect(() => {
    getProyecto();
    getTarea();
    getAssignees();
  }, [params]);

  return (
    <Fragment>
        <NavbarProyectos/>
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
                        <h4>Prioridad:</h4>
                    </Col>
                    <Col >
                    <Form.Control
                        type="number"
                        min="0"
                        placeholder="Ej: 2"
                        name="priority"
                        onChange={(e) => handlePriorityFilter(e)}/>
                    </Col>

                    {/*<Col>
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
                    <Col >
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
                <Row>
                    <Container className="container-cards">

                            {/* <KanbanDashboard initialTasks={tareas} setTasks={setTareas}/> */}

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

                            <Fragment>
                                <DragDropContext onDragEnd={(result) => {
                                    const {source, destination} = result;
                                    if (!destination) {
                                        return;
                                    }
                                    if (source.droppableId === destination.droppableId) {
                                        return;
                                    }

                                    const newStatus = getNewStatus(destination.droppableId);
                                    getTarea();
                                    setTareas((prev) => updateColumnsTasks(prev, result.draggableId, newStatus));
                                    axios.patch(SERVER_NAME + `/psa/projects/tasks/${result.draggableId}`, {
                                        status: newStatus,
                                    }).catch((err) => {
                                        alert('Se produjo un error al actualizar la tarea', err);
                                    }); 
                                    
                                    getTarea();
                                }}>

                                <Row className="kanban-row">
                                    <Col> 
                                    <KanbanColumn    
                                            stateName={"Pendiente"}
                                            tasks={tareas.filter((t) => t.status === "pending")}
                                    />
                                    </Col>
                                    <Col>
                                    <KanbanColumn
                                            stateName={"En progreso"}
                                            tasks={tareas.filter((t) => t.status === "in_progress")}
                                        />
                                    </Col>
                                    <Col>
                                    <KanbanColumn
                                            stateName={"Finalizada"}
                                            tasks={tareas.filter((t) => t.status === "finished")}
                                        />
                                    </Col>
                                </Row>
                            </DragDropContext>
                            </Fragment>
                    </Container>
                </Row>
            </Container>
        </Fragment>
    );                
}