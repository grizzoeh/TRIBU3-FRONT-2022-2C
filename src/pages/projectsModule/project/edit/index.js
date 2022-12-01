import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as SERVER_NAMES from "../../APIRoutes";

import Select from 'react-select'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";
import moment from 'moment';

import axios from "axios";

import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";

export default function EditProject() {
  const initialUpdatedProject = {
    name: null,
    description: null,
    status: null,
    client: null,
    resources: [],
    stakeholders: [],
    project_manager: null,
  };

  const [updatedProject, setUpdatedProject] = useState(initialUpdatedProject);
  const [projectManagerButtonTitle, setProjectManagerButtonTitle] = useState('Seleccionar');
  const [projectManagers, setProjectManagers] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedResources, setselectedResources] = useState([]);

  const navigate = useNavigate();

  const params = useParams();
  let projectId = params.id;

  const onChangeDateData = (e) => {
    setUpdatedProject({ ...updatedProject, [e.target.name]: moment(e.target.value, "DD/MM/YYYY").format() });
  };

  const handleDropdownProjectManagerButtonChange = (e) => {
    setUpdatedProject({ ...updatedProject, project_manager: e });
    let selectedProjectManager = projectManagers.find((projectManager) => projectManager.legajo == e);
    setProjectManagerButtonTitle(`${selectedProjectManager.Nombre} ${selectedProjectManager.Apellido}`);
  };

  const handleResourcesDropdownButtonChange = (e) => {
    setUpdatedProject({ ...updatedProject, resources: e.map((item) => item.legajo) });
  };

  const onChangeProjectData = (e) => {
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setUpdatedProject({ ...updatedProject, [e.target.name]: e.target.innerHTML });
  };

  const navigateProjectDashboard = () => {
    navigate("/proyectos");
  };

  const editProject = async () => {
    axios.patch(`${SERVER_NAMES.PROJECTS}/psa/projects/${projectId}`, updatedProject)
      .then((data) => {
        if (data.status === 200) {
          navigateProjectDashboard();
        }
      })
      .catch((err) => {
        alert("Se produjo un error al editar el proyecto", err);
      });
  };

  const getResources = () => {
    axios
      .get(SERVER_NAMES.ASSIGNEES, {})
      .then((res) => {
        setProjectManagers(res.data);
        setResources(res.data);
      })
      .catch((err) => {
        alert('Se produjo un error al consultar los recursos', err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    editProject();
  };

  const getProject = () => {
    axios
      .get(`${SERVER_NAMES.PROJECTS}/psa/projects/${projectId}`, {})
      .then((res) => {
        setUpdatedProject({
          name: res.data.name,
          description: res.data.description,
          status: res.data.status,
          client: res.data.client_id,
          resources: res.data.resources.map((resource) => resource.id),
          stakeholders: res.data.stake_holders.map((stake_holder) => stake_holder.id),
          project_manager: res.data.project_manager.id,
        });

        if (projectManagers.length !== 0) {
          let selectedProjectManager = projectManagers.find((projectManager) => projectManager.legajo == res.data.project_manager.id);
          setProjectManagerButtonTitle(`${selectedProjectManager.Nombre} ${selectedProjectManager.Apellido}`);
        }

        if (resources.length !== 0) {
          let selectedResources = res.data.resources.map((resource) => {

            let selectedResource = resources.find((resources) => resources.legajo == resource.id);

            return {
              lejago: resource.id,
              Nombre: selectedResource.Nombre,
              Apellido: selectedResource.Apellido,
            }
          });
          
          setselectedResources(selectedResources);
        }
      })
      .catch((err) => {
        alert("Se produjo un error al consultar el proyecto", err);
      });
  };

  useEffect(() => {
    getResources();
  }, []);

  useEffect(() => {
    getProject();
  }, [projectManagers]);

  return (
    <Fragment>
      <NavbarProyectos />
      <br />
      <br />
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
              <h4>Estado</h4>
            </Col>
            <Col xs={9}>
              <Dropdown>
                <Dropdown.Toggle
                  variant="secondary"
                  id="dropdown-basic"
                  size="xl"
                >
                  {updatedProject.status ? updatedProject.status : "Seleccionar"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    name="status"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    pending
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="status"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    analysis
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="status"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    development
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="status"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    production
                  </Dropdown.Item>
                  <Dropdown.Item
                    name="status"
                    onClick={(e) => handleDropdownChange(e)}
                  >
                    post_production
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Project Manager</h4>
            </Col>
            <Col xs={9}>
              <DropdownButton
                variant="secondary"
                title={projectManagerButtonTitle}
                onSelect={handleDropdownProjectManagerButtonChange}
              >
                {projectManagers.map((projectManager) => {
                  return (
                    <Dropdown.Item eventKey={projectManager.legajo} name="projectManager">
                      {`${projectManager.Nombre} ${projectManager.Apellido}`}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Recursos</h4>
            </Col>
            <Col xs={9}>
              <Select isMulti options={resources} getOptionLabel={(resource) => `${resource.Nombre} ${resource.Apellido}`}
                getOptionValue={(resource) => resource.legajo} onChange={handleResourcesDropdownButtonChange} />
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
                onChange={(e) => onChangeDateData(e)}
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
                onChange={(e) => onChangeDateData(e)}
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
