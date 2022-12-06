import React, { Fragment, useState, useEffect } from "react";

import CardCustom from "./card";
import "./task.css";
import "./StateContainer.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as SERVER_NAMES from "../../APIRoutes";
import ModalInfoProyecto from "../view/ModalInfoProyecto";

import axios from "axios";

export default function StateContainer({ projects, getProjects, resources }) {
  const [clientes, setClientes] = useState();
  const [recursos, setRecursos] = useState([]);
  const [proyectos, setProyectos] = useState(projects);

  const getClientes = async () => {
    axios
      .get(
        "/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes",
        {}
      )
      .then((response) => {
        setClientes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRecursos = async () => {
    axios
      .get(SERVER_NAMES.ASSIGNEES, {})
      .then((response) => {
        setRecursos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRecursos();
    getClientes();
  }, []);

  useEffect(() => {
    setProyectos(projects);
  }, [projects]);

  var inverseStatusMapping = {
    pending: "PENDIENTE",
    analysis: "EN ANALISIS",
    development: "DESARROLLO",
    production: "PRODUCCION",
    post_production: "POST PRODUCTION",
  };

  var typeMapping = { client: "DESARROLLO", support: "SOPORTE" };

  const getResourceNameFor = (
    resources,
    nameMapper,
    projectField,
    defaultValue
  ) => {
    if (resources) {
      let name = nameMapper(resources, projectField);
      return name.length !== 0 ? name : defaultValue;
    }

    return defaultValue;
  };

  const mapClientIdToName = (clientes, projectClientId) => {
    let name = clientes
      .filter((cliente) => cliente.id === projectClientId)
      .map((client) => `${client["razon social"]}`);
    return name;
  };

  const mapProjectManagerIdToName = (resources, projectManagerId) => {
    let name = resources
      .filter((resource) => resource.legajo === projectManagerId)
      .map((resource) => `${resource.Nombre} ${resource.Apellido}`);
    return name;
  };

  return (
    <>
      <Container>
        <Row>
          {proyectos.length > 0 ? (
            <Table proyectos>
              <thead>
                <tr>
                  <th>Número</th>
                  <th>Nombre</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Tipo</th>
                  <th>Project manager</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proyectos.length > 0 ? (
                  projects.map((project) => (
                    <tr>
                      <td>{project?.id}</td>
                      <td>{project?.name}</td>
                      <td>
                        {getResourceNameFor(
                          clientes,
                          mapClientIdToName,
                          project?.client_id,
                          "Sin asignar"
                        )}
                      </td>
                      <td>{inverseStatusMapping[project?.status]}</td>
                      <td>{typeMapping[project?.type]}</td>
                      <td>
                        {getResourceNameFor(
                          recursos,
                          mapProjectManagerIdToName,
                          project?.project_manager?.id,
                          "Sin asignar"
                        )}
                      </td>
                      <td>
                        <Row>
                          <Col sm={6}>
                            <Button
                              size="sm"
                              variant="outline-primary"
                              href={`/proyectos/${project.id}/ver-tareas/`}
                            >
                              Ver Tareas
                            </Button>
                          </Col>
                          <Col sm={6}>
                            <ModalInfoProyecto
                              data={project}
                              getDataProyectos={getProjects}
                              recursos2={resources}
                            />
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  ))
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
          ) : (
            <Col className="centered"><h5>No hay proyectos para mostrar</h5></Col>
          )}
        </Row>
      </Container>
    </>
  );
}
