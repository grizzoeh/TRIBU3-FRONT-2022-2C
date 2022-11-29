import React, { Fragment, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

import * as SERVER_NAMES from "../../APIRoutes";

import Select from 'react-select'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import DropdownButton from "react-bootstrap/DropdownButton";

import axios from "axios";

export default function NewProject() {
  const navigate = useNavigate();

  const navigateProjectDashboard = () => {
    navigate('/proyectos');
  };

  const initialProject = {
    name: null,
    type: null,
    description: null,
    projectManager: null,
    sponsor: null,
    resources: [],
    stakeholders: [],
  };

  const [sponsorButtonTitle, setSponsorButtonTitle] = useState('Seleccionar');
  const [projectManagerButtonTitle, setProjectManagerButtonTitle] = useState('Seleccionar');

  const [projectData, setProjectData] = useState(initialProject);

  const [projectManagers, setProjectManagers] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [resources, setResources] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  
  const handleDropdownSponsorsButtonChange = (e) => {
    setProjectData({ ...projectData, projectManager: e });
    setSponsorButtonTitle(sponsors.find((client) => client.id == e).CUIT);
  };

  const handleDropdownProjectManagerButtonChange = (e) => {
    setProjectData({ ...projectData, sponsor: e });
    setProjectManagerButtonTitle(projectManagers.find((client) => client.id == e).CUIT);
  };

  const getResources = async () => {
    axios
      .get(SERVER_NAMES.EXTERNAL_RESOURCES + "/clientes", {})
      .then((res) => {
        setProjectManagers(res.data);
        setSponsors(res.data);
        setResources(res.data);
        setStakeholders(res.data);
      })
      .catch((err) => {
        alert('Se produjo un error al consultar los recursos', err);
      });
  };

  const createProject = async () => {
    axios
      .post(SERVER_NAMES.PROJECTS + "/psa/projects", projectData)
      .then((data) => {
        if (data.status === 200) {
          navigateProjectDashboard();
        }
      })
      .catch((err) => {
        alert("Se produjo un error al crear el proyecto", err);
      });
  };

  useEffect(() => {
    getResources();
  }, []);

  const onChangeProjectData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.innerHTML });
  };

  const handleResourcesDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, resources: e.map((item) => item.id) });
  };

  const handleStakeHoldersDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, stakeholders: e.map((item) => item.id) });
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
                    <Dropdown.Item eventKey={projectManager.id} name="projectManager">
                      {projectManager.CUIT}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Sponsor</h4>
            </Col>
            <Col xs={9}>
              <DropdownButton
                variant="secondary"
                title={sponsorButtonTitle}
                onSelect={handleDropdownSponsorsButtonChange}
              >
                {sponsors.map((sponsor) => {
                  return (
                    <Dropdown.Item eventKey={sponsor.id} name="sponsor">
                      {sponsor.CUIT}
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
              <Select isMulti options={resources} getOptionLabel={(resource) => resource.CUIT}
                getOptionValue={(resource) => resource.id} onChange={handleResourcesDropdownButtonChange} />
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Stake holders</h4>
            </Col>
            <Col xs={9}>
              <Select isMulti options={stakeholders} getOptionLabel={(stakeholder) => stakeholder.CUIT}
                getOptionValue={(stakeholder) => stakeholder.id} onChange={handleStakeHoldersDropdownButtonChange} />
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
