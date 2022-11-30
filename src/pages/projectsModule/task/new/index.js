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
import { useParams } from 'react-router-dom';

import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";

export default function NewTask() {
  const initialTask = {
    name: null,
    description: null,
    estimated_hours_effort: null,
    estimated_start_date: null,
    estimated_finalization_date: null,
    creation_date: null,
    dependencies: [],
    assignees: [],
    priority: null,
  };
  const params = useParams();
  const [tareas, setTareas] = useState([]);
  const [AssigneebuttonTitle, setAssigneeButtonTitle] = useState('Seleccionar');
  const [DependencybuttonTitle, setDependencyButtonTitle] = useState('Seleccionar');
  const [projectData, setProjectData] = useState(initialTask);
  const [clients, setClients] = useState([]);
  
  
   useEffect(() => {
        const getTareas = async () => {
            axios
            .get(SERVER_NAMES.PROJECTS + `/psa/projects/${params.id}/tasks/`, {})
            .then((res) => {
                setTareas(res.data);
            })
            .catch((err) => {
                alert('Se produjo un error al consultar las tareas para el proyecto', err);
            });
        };

        const getAssignees = async () => {
          axios
              .get(SERVER_NAMES.ASSIGNEES , {})
              .then((res) => {
                  setClients(res.data);
              })
              .catch((err) => {
                  alert('Se produjo un error al consultar los clientes', err);
              });
        };

        getAssignees();
        getTareas();
   }, [params.id]);

  const onChangeProjectData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleDependencyDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, dependencies: [e] });
    setDependencyButtonTitle(tareas.find((tarea) => tarea.id == e).name);
  };

  const handleDependencyDropdownButtonChange2 = (e) => {
    setProjectData({ ...projectData, dependencies: [e] });
    //setDependencyButtonTitle(tareas.find((tarea) => tarea.id == e).name);
  };

  const handleAssigneeDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, assignees: [e] });
    setAssigneeButtonTitle(clients.find((client) => client.legajo == e).Nombre + " " + clients.find((client) => client.legajo == e).Apellido);
  };

  const createTask = async () => {
    axios
      .post(SERVER_NAMES.PROJECTS + `/psa/projects/${params.id}/tasks`, projectData)
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
            <h1>Creacion de nueva tarea</h1>
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
          <Row className="mt-5">
            <Col>
              <h4>Esfuerzo estimado en horas</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="number"
                min="0"
                name="estimated_hours_effort"
                placeholder="Ej: 10"
                onChange={(e) => onChangeProjectData(e)}
              />
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h4>Dependencias</h4>
            </Col>
            <Col xs={9}>
              {/* TODO: get clients */}
              <Select isMulti options={tareas} getOptionLabel={(tarea) => tarea.name}
              getOptionValue={(tarea) => tarea.id} onChange={handleDependencyDropdownButtonChange2}/>
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
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Empleado asignado</h4>
            </Col>
            <Col xs={9}>
              {/* TODO: get clients */}
              <DropdownButton
                variant="secondary"
                title={AssigneebuttonTitle}
                onSelect={handleAssigneeDropdownButtonChange}
              >
                {clients.map((client) => {
                  return (
                    <Dropdown.Item eventKey={client.legajo} name="client">
                      {client.Nombre + " " + client.Apellido}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Fecha estimada de inicio</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                name="estimated_start_date"
                placeholder="Ej: 18/12/2022"
                onChange={(e) => onChangeProjectData(e)}
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Fecha estimada de fin</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                name="estimated_finalization_date"
                placeholder="Ej: 18/12/2022"
                onChange={(e) => onChangeProjectData(e)}
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Prioridad</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="number"
                min="1"
                placeholder="Ej: 2"
                name="priority"
                onChange={(e) => onChangeProjectData(e)}
              />
            </Col>
          </Row>

          <Row className="mt-5">
            <h4>Descripción</h4>
          </Row>
          <Row className="mt-3">
            <textarea
              name="description"
              placeholder="Escribe una descripción..."
              onChange={(e) => onChangeProjectData(e)}
            />
          </Row>

          <Row className="mt-5">
            <Col></Col>
            <Col xs={1}>
              <Button onClick={handleSubmit}>Crear</Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Fragment>
  );
}
