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
import moment from 'moment';

import axios from "axios";

import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";

export default function NewProject() {
  const navigate = useNavigate();

  const navigateProjectDashboard = () => {
    navigate('/proyectos');
  };

  const findFormErrors = (proyecto) => {
    if ( !proyecto.name || proyecto.name === '' ) {
      alert("El proyecto debe tener un nombre");
      navigateProjectDashboard();
      return null;}
    else return 1; 
  }

  const initialProject = {
    name: null,
    type: null,
    description: null,
    projectManager: null,
    sponsor: null,
    client: null,
    resources: [],
    stakeholders: [],
    estimated_start_date: null,
    estimated_finalization_date: null,
  };

  const [sponsorButtonTitle, setSponsorButtonTitle] = useState('Seleccionar');
  const [projectManagerButtonTitle, setProjectManagerButtonTitle] = useState('Seleccionar');
  const [clientButtonTitle, setClientButtonTitle] = useState('Seleccionar');

  const [projectData, setProjectData] = useState(initialProject);

  const [projectManagers, setProjectManagers] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [resources, setResources] = useState([]);
  const [stakeholders, setStakeholders] = useState([]);
  const [clients, setClients] = useState([]);
  
  const handleDropdownSponsorsButtonChange = (e) => {
    setProjectData({ ...projectData, sponsor: e });
    let selectedSponsor = sponsors.find((sponsor) => sponsor.legajo == e);
    setSponsorButtonTitle(`${selectedSponsor.Nombre} ${selectedSponsor.Apellido}`);
  };

  const handleDropdownProjectManagerButtonChange = (e) => {
    setProjectData({ ...projectData, projectManager: e });
    let selectedProjectManager = projectManagers.find((projectManager) => projectManager.legajo == e);
    setProjectManagerButtonTitle(`${selectedProjectManager.Nombre} ${selectedProjectManager.Apellido}`);
  };

  const handleDropdownClientButtonChange = (e) => {
    setProjectData({ ...projectData, client: e });
    let selectedClient = clients.find((client) => client.id == e);
    setClientButtonTitle(selectedClient["razon social"]);
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
        alert('Se produjo un error al consultar los recursos', err);
      });
  };

  const getClients = async () => {
    axios
      .get("https://psa-soporte-squad7.herokuapp.com/tickets/clientes", {})
      .then((res) => {
        debugger
        setClients(res.data);
      })
      .catch((err) => {
        alert('Se produjo un error al consultar los clientes', err);
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
    getClients();
  }, []);

  const onChangeDateData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: moment(e.target.value, "DD/MM/YYYY").format() });
  };

  const onChangeProjectData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.innerHTML });
  };

  const handleResourcesDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, resources: e.map((item) => item.legajo) });
  };

  const handleStakeHoldersDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, stakeholders: e.map((item) => item.legajo) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProject();
    setProjectData(initialProject);
  };

  return (
    <Fragment>
      <NavbarProyectos/>
      <Container className="container-title">
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
                    <Dropdown.Item eventKey={sponsor.legajo} name="sponsor">
                      {`${sponsor.Nombre} ${sponsor.Apellido}`}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h4>Cliente</h4>
            </Col>
            <Col xs={9}>
              <DropdownButton
                variant="secondary"
                title={clientButtonTitle}
                onSelect={handleDropdownClientButtonChange}
              >
                {clients.map((client) => {
                  return (
                    <Dropdown.Item eventKey={client.id} name="client">
                      {client["razon social"]}
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
              <h4>Stake holders</h4>
            </Col>
            <Col xs={9}>
              <Select isMulti options={stakeholders} getOptionLabel={(stakeholder) => `${stakeholder.Nombre} ${stakeholder.Apellido}`}
                getOptionValue={(stakeholder) => stakeholder.legajo} onChange={handleStakeHoldersDropdownButtonChange} />
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
