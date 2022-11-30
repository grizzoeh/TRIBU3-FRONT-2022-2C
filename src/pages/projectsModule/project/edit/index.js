import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as SERVER_NAMES from "../../APIRoutes";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import axios from "axios";

import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";

export default function EditProject() {
  const initialUpdatedProject = {
    name: null,
    description: null,
    estimatedStartDate: null,
    estimatedFinalizationDate: null,
    status: null,
  };

  const [updatedProject, setUpdatedProject] = useState(initialUpdatedProject);

  const navigate = useNavigate();

  const params = useParams();
  let projectId = params.id;

  const onChangeProjectData = (e) => {
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.value });
  };

  const navigateProjectDashboard = () => {
    navigate("/proyectos");
  };

  const editProject = async () => {
    axios
      .patch(
        `${SERVER_NAMES.PROJECTS}/psa/projects/${projectId}`,
        updatedProject
      )
      .then((data) => {
        if (data.status === 200) {
          navigateProjectDashboard();
        }
      })
      .catch((err) => {
        alert("Se produjo un error al editar el proyecto", err);
      });
  };

  const handleSubmit = (event) => {
    debugger
    event.preventDefault();
    editProject();
  };

  const getProject = async () => {
    axios
      .get(`${SERVER_NAMES.PROJECTS}/psa/projects/${projectId}`, {})
      .then((res) => {
        setUpdatedProject({
          name: res.data.name,
          description: res.data.description,
          estimatedStartDate: res.data.estimated_start_date,
          estimatedFinalizationDate: res.data.estimated_finalization_date,
          status: res.data.status,
        });
        debugger
      })
      .catch((err) => {
        alert("Se produjo un error al consultar el proyecto", err);
      });
  };

  useEffect(() => {
    getProject();
  }, []);

  return (
    <Fragment>
      <NavbarProyectos />
      <br />
      <Container className="container-title">
        <Row>
          <Col>
            <h1>Editar proyecto</h1>
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
                value={updatedProject.name}
                onChange={(e) => onChangeProjectData(e)}
              />
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
                value={updatedProject.estimatedStartDate}
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
                value={updatedProject.estimatedFinalizationDate}
                placeholder="Ej: 15/10/2025"
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
              value={updatedProject.description}
              placeholder="Escribe una descripción..."
              onChange={(e) => onChangeProjectData(e)}
            />
          </Row>

          <Row className="mt-5">
            <Col></Col>
            <Col xs={1}>
              <Button onClick={handleSubmit}>Listo</Button>
            </Col>
          </Row>
        </form>
      </Container>
    </Fragment>
  );
}
