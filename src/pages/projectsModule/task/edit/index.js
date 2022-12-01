import React, { Fragment, useEffect, useState } from "react";

import * as SERVER_NAMES from "../../APIRoutes";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import Select from 'react-select'
import axios from "axios";
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";

export default function NewTask() {
  const initialTask = {
    name: null,
    description: null,
    estimated_hours_effort: null,
    estimated_start_date: null,
    estimated_finalization_date: null,
    dependencies: [],
    assignees: [],
    creation_date: null,
    priority: 1,
    status: null,
    realEffort: null,
    parent_task: null
  };
  const params = useParams();
  const [tareas, setTareas] = useState([]);
  const [AssigneebuttonTitle, setAssigneeButtonTitle] = useState('Seleccionar');
  const [StatusbuttonTitle, setStatusButtonTitle] = useState('Seleccionar');
  const [DependencybuttonTitle, setDependencyButtonTitle] = useState('Seleccionar');
  const [projectData, setProjectData] = useState(initialTask);
  const [clients, setClients] = useState([]);
  const [tareaActual, setTareaActual] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [empleadoAsignado, setEmpleadoAsignado] = useState([]);
  const mapIDResourceToName= (assignees) => {
    //console.log(clients);
    //console.log(assignees);
    
    return assignees.map((assignee) => {
      let selectedSponsor = clients.find((client) => client.legajo === assignee.id)
      return selectedSponsor?`${selectedSponsor.Nombre} ${selectedSponsor.Apellido}`:null
    })
  }

  const mapIDTaskToTaskObj= (task) => {
    //console.log(clients);
    //console.log(assignees);
    
    return tareas.map((tarea) => {
      let tareaPadre = tareas.find((tarea) => tarea.id === task.parent_task_id)
      return tareaPadre?tareaPadre:null
    })
    //let tareaPadre = tareas.find((tarea) => tarea.id === task.parent_task_id)
    //return tareaPadre
  }

  const handleGuardado = async () => {
    axios.patch(SERVER_NAMES.PROJECTS + `/psa/projects/tasks/${params.idTarea}/`, projectData)
        .then((data) => {
            if (data.data.ok) {
                console.log("Proyecto borrado");
            }
        })
        .catch((error) => {
            console.log(error);
        });
  }

  var inverseStatusMapping = {Pendiente:"pending",'En progreso':"in_progress",Finalizada:"finished"};
  useEffect(() => {
        const getTareas = async () => {
            axios
            .get(SERVER_NAMES.PROJECTS + `/psa/projects/${params.id}/tasks/`, {})
            .then((res) => {
                setTareas(res.data);
                setDependencyButtonTitle(res.data.find((tarea) => tarea.id == params.idTarea).name);
                //setDependencyButtonTitle(res.data.dependencies[0]);
                //let id = res.data.find((tarea) => tarea.id == params.idTarea).assignees[0].id;
                setAssigneeButtonTitle(res.data.find((tarea) => tarea.id == params.idTarea).assignees);
                //setStatusButtonTitle(res.data.find((tarea) => tarea.id == params.idTarea).status);
                //setAssigneeButtonTitle(res.data.find((tarea) => tarea.id == params.idTarea).assignees.keys().length>0?res.data.assignees[0].id:"Seleccionar");
                //setAssigneeButtonTitle(clients.find((client) => client.id == id).name);
                setTareaActual(res.data.find((tarea) => tarea.id == params.idTarea));
                setTicket(res.data.find((tarea) => tarea.id == params.idTarea).related_ticket);
            })
            .catch((err) => {
                alert('Se produjo un error al consultar las tareas para el proyecto', err);
            });
        };

        const getAssignees = async () => {
          axios
              .get(SERVER_NAMES.ASSIGNEES, {})
              .then((res) => {
                  setClients(res.data);
                  //setEmpleadoAsignado(clients.find((client) => client.legajo === tareaActual.assignees[0].id).Nombre + " " + clients.find((client) => client.legajo === tareaActual.assignees[0].id).Apellido);
                  //setAssigneeButtonTitle(clients.find((client) => client.legajo === tareaActual.assignees[0].id).Nombre);
                  //setAssigneeButtonTitle(res.data.find((assignee) => assignee.id == tareaActual.assignees[0].id).name);
              })
              .catch((err) => {
                  alert('Se produjo un error al consultar los clientes1', err);
              });
        };

        /*const getEmpleadoAsignado = async () => {
            axios
                .get(SERVER_NAMES.ASSIGNEES + `/${AssigneebuttonTitle}`, {})
                .then((res) => {
                    //if (res.data.keys().length>0)
                        setEmpleadoAsignado(res.data);
                    //else setEmpleadoAsignado("Seleccionar")
                })
                .catch((err) => {
                    alert('SSe produjo un error al consultar los clientes', err);
                });
        };*/
        getTareas();
        getAssignees();
        //if (AssigneebuttonTitle !== "Seleccionar") getEmpleadoAsignado();
        //else setEmpleadoAsignado(null);
        //getTareas();
        //setDependencyButtonTitle(tareas.find((tarea) => tarea.id == params.idTarea).name);
   }, [params]);
   //[params,AssigneebuttonTitle]

  const onChangeProjectData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleDependencyDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, dependencies: [e] });
    setDependencyButtonTitle(tareas.find((tarea) => tarea.id == e).name);
  };

  const handleStatusDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: inverseStatusMapping[e.target.innerHTML] });
    //setStatusButtonTitle(e.status);
    setStatusButtonTitle(e.target.innerHTML);
  };

  const handleDependencyDropdownButtonChange2 = (e) => {
    setProjectData({ ...projectData, dependencies: e });
    //setDependencyButtonTitle(tareas.find((tarea) => tarea.id == e).name);
  };

  const handleAssigneeDropdownButtonChange = (e) => {
    if (e!== "Ninguno")  setProjectData({ ...projectData, assignees: [e] });
    e==="Ninguno"?setAssigneeButtonTitle("Ninguno"):setAssigneeButtonTitle(clients.find((client) => client.legajo == e).Nombre + " " + clients.find((client) => client.legajo == e).Apellido);
  };

  const createTask = async () => {
    axios
      .post(SERVER_NAMES.PROJECTS + `/psa/projects/${params.id}/tasks/`, projectData)
      .then((data) => {
        if (data.status === 200) {
          alert("Nueva tarea creada");
        }
      })
      .catch((err) => {
        alert("Se produjo un error al crear la tarea", err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createTask();
    setProjectData(initialTask);
  };

  return (
    <Fragment>
      <NavbarProyectos/>
      <Container>
        <br />
        <br />
        <Row>
          <Col>
            <h1>{/*tareaActual.name*/} Editar tarea</h1>
          </Col>
        </Row>
      </Container>

      <Container>
        <form onSubmit={handleSubmit}>
          <Row className="mt-5">
            <Col>
              <h4>Nombre de la tarea</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                name="name"
                placeholder={tareaActual.name}
                onChange={(e) => onChangeProjectData(e)}
              />
            </Col>
          </Row>
          {  /*
          <Row className="mt-5">
            
            <Col>
              <h4>Tipo</h4>
            </Col>
            <Col xs={9}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  size="xl"
                >
                  {projectData.type ? projectData.type : "Seleccionar"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    name="type"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    client
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="type"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    support
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          */}

           {/*<Row className="mt-5">
            <Col>
              <h4>Tipo:</h4>
            </Col>
              <Col xs={9}><h4>{tareaActual.parent_task_id?"Subtarea":"Tarea"}</h4></Col>
              
        </Row>*/}

          {tareaActual.parent_task_id && <Row className="mt-5">
            <Col>
              <h4>Tarea padre</h4>
            </Col>
            <Col xs={9}>
              {/* TODO: get clients */}
              {/*<Select isMulti options={tareas} getOptionLabel={(tarea) => tarea.name}
              getOptionValue={(tarea) => tarea.id} onChange={handleDependencyDropdownButtonChange2}/>*/}
              {/*<DropdownButton
                variant="secondary"
                title={DependencybuttonTitle}
                onSelect={handleDependencyDropdownButtonChange}
              >
                {tareas.map((tarea) => {
                  return (
                    <Dropdown.Item eventKey={tarea.id} name="tarea">
                      {tarea.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>*/}
              {mapIDTaskToTaskObj(tareaActual).map((tarea) => <Col><Link to={`/proyectos/${tarea.id}/ver-tarea/`}><Button>{tarea.nombre}</Button></Link></Col>)}
            </Col>
          </Row>}

          {/* <Row className="mt-5">
            <Col>
              <h4>Dependencias:</h4>
            </Col>
              {tareaActual.dependencies.map((dependency) => <Col xs={9}><Link to={`/proyectos/${params.id}/tareas/${dependency.id}/ver-tarea/`}><Button>{dependency.name}</Button></Link></Col>)}
            
            </Row>*/}
              {/*<Row><Select isMulti options={tareas} getOptionLabel={(dependency) => dependency.name}
                getOptionValue={(dependency) => dependency.id} onChange={handleDependencyDropdownButtonChange2}/></Row>*/}
           <Row className="mt-5">
            <Col>
              <h4>Esfuerzo estimado en horas</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="number"
                //value={tareaActual.estimated_hours_effort}
                min="0"
                name="estimated_hours_effort"
                placeholder={tareaActual.estimated_hours_effort}
                onChange={(e) => onChangeProjectData(e)}
              />
              {/*<h4>{tareaActual.estimated_hours_effort}</h4>*/}
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h4>Esfuerzo real en horas</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="number"
                //value={tareaActual.real_hours_effort?tareaActual.real_hours_effort:null}
                min="0"
                name="real_hours_effort"
                placeholder={tareaActual.real_hours_effort?tareaActual.real_hours_effort:null}
                onChange={(e) => onChangeProjectData(e)}
              />
              {/*<h4>{tareaActual.real_hours_effort?tareaActual.real_hours_effort:null}</h4>*/}
            </Col>
          </Row>
          

          <Row className="mt-5">
            <Col>
              <h4>Empleado asignado</h4>
            </Col>
            <Col xs={9}>
              {/* TODO: get clients */}
              {/*<DropdownButton
                variant="secondary"
                title={empleadoAsignado?empleadoAsignado.Nombre + " " + empleadoAsignado.Apellido:"Seleccionari"}
                //title={clients.find((client) => client.legajo === tareaActual.assignees[0].id).Nombre + " " + clients.find((client) => client.legajo === tareaActual.assignees[0].id).Apellido}
                onSelect={handleAssigneeDropdownButtonChange}
              >
                <Dropdown.Item eventKey={"Ninguno"} name="management">
                                {"Ninguno"}
                </Dropdown.Item>
                {clients.map((client) => {
                  return (
                    <Dropdown.Item eventKey={client.legajo} name="client">
                      {client.Nombre + " " + client.Apellido}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>*/}
              {/*<Select isMulti options={clients} getOptionLabel={(client) => client.Nombre}
                getOptionValue={(client) => client.legajo} onSelect={handleAssigneeDropdownButtonChange} onChange={handleAssigneeDropdownButtonChange}/>*/}
                {/*<Row>{mapIDResourceToName(AssigneebuttonTitle).map((nombre) => <Col><h5>{nombre}</h5></Col>)}</Row>*/}
                <Col xs={9}>
              {/* TODO: get clients */}
              <DropdownButton
                variant="secondary"
                title={AssigneebuttonTitle.legajo}
                //title="Seleccionar"
                onSelect={handleAssigneeDropdownButtonChange}
              >
                <Dropdown.Item eventKey={"Ninguno"} name="management">
                                {"Ninguno"}
                </Dropdown.Item>
                {clients.map((client) => {
                  return (
                    <Dropdown.Item eventKey={client.legajo} name="client">
                      {client.Nombre + " " + client.Apellido}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
            </Col>
          </Row>
          {/*<Row className="mt-5">
            <Col>
              <h4>Fecha de creación</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                name="creation_date"
                //value={tareaActual.creation_date}
                placeholder={tareaActual.creation_date}
                onChange={(e) => onChangeProjectData(e)}
            />*/}
              {/*<h4>{moment(tareaActual.creation_date, "DD-MM-YYYY").format('DD.MM.YYYY')}</h4>*/}
            {/*</Col>*/}
          {/*</Row>*/}
          <Row className="mt-5">
            <Col>
              <h4>Fecha estimada de inicio</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                name="estimated_start_date"
                //value={tareaActual.estimated_start_date}
                placeholder={moment(tareaActual.estimated_start_date, "YYYY-MM-DD").format('DD.MM.YYYY')}
                onChange={(e) => onChangeProjectData(e)}
              />
              </Col>
              {/*<Col xs={9}><h4>{moment(tareaActual.estimated_start_date, "YYYY-MM-DD").format('DD.MM.YYYY')}</h4></Col>*/}
              
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Fecha estimada de fin</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                name="estimated_finalization_date"
                //value={tareaActual.estimated_finalization_date}
                placeholder={moment(tareaActual.estimated_finalization_date, "YYYY-MM-DD").format('DD.MM.YYYY')}
                onChange={(e) => onChangeProjectData(e)}
            />
            {/*<h4>{moment(tareaActual.estimated_finalization_date, "YYYY-MM-DD").format('DD.MM.YYYY')}</h4>*/}
            </Col>
          </Row>

          {tareaActual.real_finalization_date && <Row className="mt-5">
            <Col>
              <h4>Fecha real de finalización</h4>
            </Col>
            <Col xs={9}>
              {/*<Form.Control
                type="text"
                name="estimated_finalization_date"
                value={tareaActual.real_finalization_date}
                placeholder="Ej: 18/12/2022"
                onChange={(e) => onChangeProjectData(e)}
              />*/}
              <h4>{tareaActual.real_finalization_date}</h4>
          </Col>
          
          </Row>}

          <Row className="mt-5">
            <Col>
              <h4>Prioridad:</h4>
            </Col>
            {/*<Col xs={9}>
              <h4>{tareaActual.priority}</h4>
            </Col>*/}
            <Col xs={9}>
              <Form.Control
                type="number"
                //value={tareaActual.estimated_hours_effort}
                min="1"
                name="priority"
                placeholder={tareaActual.priority}
                onChange={(e) => onChangeProjectData(e)}
              />
              {/*<h4>{tareaActual.estimated_hours_effort}</h4>*/}
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Estado</h4>
            </Col>
            <Col xs={9}>
              {/*<Form.Control
                type="string"
                placeholder="Ej: In progress"
                name="status"
                value={statusMapping[tareaActual.status]}
                onChange={(e) => onChangeProjectData(e)}
                onSelect={handleStatusDropdownButtonChange}
                inverseStatusMapping[tareaActual.status]
              />*/}
              {/*<h4>{statusMapping[tareaActual.status]}</h4>*/}
                <Dropdown title={StatusbuttonTitle}
                >
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                    </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey={"Ninguno"} name="management">
                                {"Ninguno"}
                            </Dropdown.Item>
                            <Dropdown.Item name="status" onClick={(e) => handleStatusDropdownButtonChange(e)}>Pendiente</Dropdown.Item>
                            <Dropdown.Item name="status" onClick={(e) => handleStatusDropdownButtonChange(e)}>En progreso</Dropdown.Item>
                            <Dropdown.Item name="status" onClick={(e) => handleStatusDropdownButtonChange(e)}>Finalizada</Dropdown.Item>
                        </Dropdown.Menu>
            </Dropdown>
          </Col>
          
          </Row>

          {/*<Row className="mt-5">
            <Col>
              <h4>Número de ticket relacionado</h4>
            </Col>
            {ticket && <Col xs={9}>
              {/*<Form.Control
                type="number"
                placeholder="Ej: In progress"
                name="status"
                value={ticket?ticket.id:0}
                onChange={(e) => onChangeProjectData(e)}
            />*/}
            {/*<h4>{ticket.id}</h4>*/}
            {/*</Col>*/}
            <Row>
          </Row>

          <Row className="mt-5">
            <h4>Descripción</h4>
          </Row>
          <Row className="mt-3">
            <textarea
              name="description"
              //value={tareaActual.description}
              //placeholder="Escribe una descripción..."
              placeholder={tareaActual.description}
              onChange={(e) => onChangeProjectData(e)}
            />
          </Row>

          <Row className="mt-5">
          <Col></Col>
            <Col xs={10}>
            <Link to={`/proyectos/${params.id}/tareas/${tareaActual.id}/ver-tarea/`}>
              <Button  onClick={handleGuardado}>Guardar</Button>
            </Link>
            </Col>

            <Col></Col>
            <Col xs={1}>
            <Link to={`/proyectos/${params.id}/tareas/${tareaActual.id}/ver-tarea/`}>
              <Button variant="danger">Cancelar</Button>
            </Link>
            </Col>
          </Row>
        </form>
      </Container>
    </Fragment>
  );
}
