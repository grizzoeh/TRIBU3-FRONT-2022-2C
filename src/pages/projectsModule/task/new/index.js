import React, { Fragment, useEffect, useState } from "react";

import * as SERVER_NAMES from "../../APIRoutes";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";

import axios from "axios";
//import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';

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
  //const location = useLocation();
  const [buttonTitle, setButtonTitle] = useState('Seleccionar');
  const [projectData, setProjectData] = useState(initialTask);
  // preguntar si esta hecho manualmente temporalmente
  const [clients, setClients] = useState([
    {
      id: 1,
      "razon social": "FIUBA",
      CUIT: "20-12345678-2",
    },
    {
      id: 2,
      "razon social": "FSOC",
      CUIT: "20-12345678-5",
    },
    {
      id: 3,
      "razon social": "Macro",
      CUIT: "20-12345678-3",
    },
  ]);
  // modificar para pedir al modulo recursos los empleados
  // preguntar por que no usa getClients en index.js de proyecto
  const getEmployees = async () => {
    const externalResourcesURI = new Request(
      `${SERVER_NAMES.RESOURCES}/recursos/empleados/empleado`
    );

    fetch(externalResourcesURI)
      .then((response) => {
        debugger;
        response.json();
      })
      .then((data) => {
        debugger;
        // preguntar si aca agarro la data
        console.log(data);
      })
      .catch(function (e) {
        debugger;
        alert(e);
      });
  };
  
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
            //setTareas([{"name":"Desarrollar nuevo endpoint para carga de Riesgos","description":"Alguna descripción","estimated_hours_effort":1,"estimated_start_date":"2022-12-18","estimated_finalization_date":"2022-12-18","dependencies":[1,2,123],"assignees":[213124,433543],"priority":"low"}])
        };
      // getEmployees();
        getTareas();
   }, [params.id]);

  const onChangeProjectData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };
  /*
  const handleDropdownChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.innerHTML });
  };*/

  const handleDependencyDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, dependencies: [e] });
    setButtonTitle(clients.find((client) => client.id == e).CUIT);
  };

  const handleAssigneeDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, assignees: [e] });
    setButtonTitle(clients.find((client) => client.id == e).CUIT);
  };

  const createTask = async () => {
    //const location = useLocation();
    axios
      .post(SERVER_NAMES.PROJECTS + `/psa/projects/${params.id}/tasks`, projectData)
      .then((data) => {
        if (data.status === 200) {
          alert("Nueva tarea creada");
          // TODO: redirect to project dashboard
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
      <Container>
        <br />
        <br />
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
              <DropdownButton
                variant="secondary"
                title={buttonTitle}
                onSelect={handleDependencyDropdownButtonChange}
              >
                {tareas.map((tarea) => {
                  return (
                    <Dropdown.Item eventKey={tarea.id} name="tarea">
                      {tarea.id}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
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
                title={buttonTitle}
                onSelect={handleAssigneeDropdownButtonChange}
              >
                {clients.map((client) => {
                  return (
                    <Dropdown.Item eventKey={client.id} name="client">
                      {client.CUIT}
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
