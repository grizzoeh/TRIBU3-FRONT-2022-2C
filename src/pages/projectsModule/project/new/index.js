import React, { Fragment, useEffect, useState } from "react";

import * as SERVER_NAMES from "../../APIRoutes";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";

import axios from "axios";

export default function NewProject() {
  const initialProject = {
    name: "",
    description: "",
    type: "",
    client: 0,
    estimated_start_date: "",
    estimated_finalization_date: "",
    project_manager: "",
    resources: [123],
    stakeholders: [213124],
  };

  const [projectData, setProjectData] = useState(initialProject);
  const [clients, setClients] = useState();

  const getClients = async () => {
    const externalResourcesURI = new Request(`${SERVER_NAMES.EXTERNAL_RESOURCES}/clientes`);

    fetch(externalResourcesURI)
      .then((response) => {
        debugger;
        response.json()})
      .then((data) => {
        debugger
        console.log(data)})
      .catch(function (e) {
        debugger
        alert(e);
      });
  };

  useEffect(() => {
    getClients();
  }, []);

  const onChangeProjectData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.innerHTML });
  };

  const createProject = async () => {
    axios
      .post(SERVER_NAMES.PROJECTS + "/psa/projects/", projectData)
      .then((data) => {
        if (data.status === 200) {
          alert("Nuevo proyecto creado");
          // TODO: redirect to project dashboard
        }
      })
      .catch((err) => {
        alert("Se produjo un error al crear proyectos", err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject();
    setProjectData(initialProject);
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
            <h1>Creacion de nuevo proyecto</h1>
          </Col>
        </Row>
      </Container>

      <Container>
        <form onSubmit={handleSubmit}>
          <Row className="mt-5">
            <Col>
              <h4>Nombre del proyecto</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => onChangeProjectData(e)}
              />
            </Col>
          </Row>

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
                    Cliente
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="type"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    Soporte
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Cliente</h4>
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

                {/* TODO: get clients */}
                <Dropdown.Menu>
                  <Dropdown.Item
                    name="client"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    Cliente
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="client"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    Soporte
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Fecha de inicio</h4>
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
              <h4>Project manager</h4>
            </Col>
            <Col xs={9}>
              <Form.Control
                type="text"
                name="project_manager"
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
              <Button>Crear</Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Fragment>
  );
}
