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
import moment from "moment";
import { Link } from "react-router-dom";

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

  const [projectManagers, setProjectManagers] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [resources, setResources] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);

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

  const getResources = async () => {
    axios
      .get(SERVER_NAMES.ASSIGNEES, {})
      .then((res) => {
        setProjectManagers(res.data);
        setSponsors(res.data);
        setResources(res.data);
        setStakeholders(res.data);
      })
      .catch((err) => {
        alert("Se produjo un error al consultar los recursos", err);
      });
  };

  useEffect(() => {
    getResources();
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
        <Row className="mt-5">
          <Col>
            <h4>Descripcion</h4>
          </Col>
          <Col xs={9}>
            <h4>{project.description}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Tipo</h4>
          </Col>
          <Col xs={9}>
            <h4>{project.type}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Estado</h4>
          </Col>
          <Col xs={9}>
            <h4>{project.status}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Estado</h4>
          </Col>
          <Col xs={9}>
            <h4>{project.status}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Project Manager</h4>
          </Col>
          <Col xs={9}>
            <h4>{project.status}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Sponsor</h4>
          </Col>

          <Col xs={9}>
            <h4>{project.status}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Cliente</h4>
          </Col>

          <Col xs={9}>
            <h4>{project.status}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Recursos</h4>
          </Col>

          <Col xs={9}>
            <h4>{project.status}</h4>
          </Col>
          
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Stakerholders</h4>
          </Col>

          <Col xs={9}>
            <h4>{project.status}</h4>
          </Col>
          
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Fecha estimada de inicio</h4>
          </Col>
          <Col xs={9}>
            <h4>
              {moment(project.estimated_start_date, "YYYY-MM-DD").format(
                "DD.MM.YYYY"
              )}
            </h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Fecha estimada de fin</h4>
          </Col>
          <Col xs={9}>
            <h4>
              {moment(project.estimated_finalization_date, "YYYY-MM-DD").format(
                "DD.MM.YYYY"
              )}
            </h4>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col></Col>
          <Col xs={1}>
            <Link to={`/proyectos/${projectId}/editar-proyecto/`}>
              <Button>Editar</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
