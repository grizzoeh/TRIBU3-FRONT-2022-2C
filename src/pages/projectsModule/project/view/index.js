import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as SERVER_NAMES from "../../APIRoutes";

import Select from "react-select";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";

import axios from "axios";

import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";

export default function ViewProject() {
  const initialPoject = {
    id: null,
    name: null,
    type: null,
    description: null,
    project_manager: null,
    sponsor: null,
    client: null,
    resources: [],
    stake_holders: [],
    estimated_start_date: null,
    estimated_finalization_date: null,
    status: null,
    client_id: null,
  };

  const params = useParams();
  let projectId = params.id;

  const [project, setProject] = useState(initialPoject);

  const getProject = () => {
    axios
      .get(`${SERVER_NAMES.PROJECTS}/psa/projects/${projectId}`, {})
      .then((res) => {
        setProject({
          id: res.data.id,
          name: res.data.name,
          type: res.data.type,
          description: res.data.description,
          project_manager: res.data.project_manager,
          sponsor: res.data.sponsor,
          client: res.data.client,
          resources: res.data.resources,
          stake_holders: res.data.stake_holders,
          estimated_start_date: res.data.estimated_start_date,
          status: res.data.status,
          client_id: res.data.client_id,
          estimated_finalization_date: res.data.estimated_finalization_date,
        });

        // if (projectManagers.length !== 0) {
        //   let selectedProjectManager = projectManagers.find(
        //     (projectManager) =>
        //       projectManager.legajo == res.data.project_manager.id
        //   );
        //   setProjectManagerButtonTitle(
        //     `${selectedProjectManager.Nombre} ${selectedProjectManager.Apellido}`
        //   );
        // }

        // if (resources.length !== 0) {
        //   let selectedResources = res.data.resources.map((resource) => {
        //     let selectedResource = resources.find(
        //       (resources) => resources.legajo == resource.id
        //     );

        //     return {
        //       lejago: resource.id,
        //       Nombre: selectedResource.Nombre,
        //       Apellido: selectedResource.Apellido,
        //     };
        //   });
        // }
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
      <Container className="container-title">
        <br />
        <br />
        <br />
        <Row>
          <Col>
            <h1>Ver proyecto</h1>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="mt-5">
          <Col>
            <h4>Nombre del proyecto</h4>
          </Col>
          <Col xs={9}>
            <h4>{project.name}</h4>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
