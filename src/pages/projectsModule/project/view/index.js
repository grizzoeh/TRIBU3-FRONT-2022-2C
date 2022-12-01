import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as SERVER_NAMES from "../../APIRoutes";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
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

  const [projectManager, setProjectManager] = useState([]);
  const [resources, setResources] = useState([]);
  const [client, setClient] = useState([]);

  var statusMapping ={"Todos":"Todos","pending":"PENDIENTE","analysis":"EN ANALISIS",
  "development":"DESARROLLO","production":"PRODUCCION","post_production":"POST-PRODUCCION"}
  var typeMapping ={"Todos":"Todos","client":"DESARROLLO","support":"SOPORTE"}

  const handleBorrado = async () => {
    axios.delete(SERVER_NAMES.PROJECTS + `/psa/projects/${projectId}`)
        .then((data) => { 
            if (data.data.ok) {
                console.log("Proyecto borrado");
            }
        })
        .catch((error) => {
            console.log(error);
        });
      }

  const getProject = () => {
    axios
      .get(SERVER_NAMES.PROJECTS+"/psa/projects/"+projectId, {})
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        alert("Se produjo un error al consultar el proyecto", err);
      });
    
  };
  const getProjectManager= async () => {
    axios
        .get(SERVER_NAMES.ASSIGNEES+ "/"+project.project_manager
            , {})
        .then((res) => {
          setProjectManager(res.data);
        })
        .catch(() => {
          setProjectManager({ Nombre: "", Apellido: "" });
        });
  };
  const getClient = async () => {
    axios
    .get('/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {
        })
        .then((res) => {
          setClient(res.data);
        })
        .catch(() => {
          setClient("");
        });
  };

  const getResources = async () => {
    axios
      .get(SERVER_NAMES.ASSIGNEES, {})
      .then((res) => {
        setResources(res.data);

      })
      .catch((err) => {
        alert("Se produjo un error al consultar los recursos", err);
      });
  };

  useEffect(() => {
    
    getProject();
    getResources();
    getProjectManager();
    getClient();
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
            <h1>Proyecto #{projectId}</h1>
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
            <h4>{typeMapping[project.type]}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Estado</h4>
          </Col>
          <Col xs={9}>
            <h4>{statusMapping[ project.status]}</h4>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Project Manager</h4>
          </Col>
          <Col xs={9}>
  <h4>{project.project_manager!=null?
      resources.find( element => element.legajo == project.project_manager.id)!=null?
      resources.find( element => element.legajo == project.project_manager.id).Apellido+" "+resources.find( element => element.legajo == project.project_manager.id).Apellido
      :"":""
      }</h4>
</Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Sponsors</h4>
          </Col>
  <Col xs={9}>
  <h4>{project.sponsor!=null?
      resources.find( element => element.legajo == project.sponsor.id)!=null?
      resources.find( element => element.legajo == project.sponsor.id).Apellido+" "+resources.find( element => element.legajo == project.sponsor.id).Apellido
      :"":""
      }</h4>
</Col>

        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Cliente</h4>
          </Col>
          <Col xs={9}>
            <h4>{project.client_id!=null?
      client.find( element => element.id == project.client_id)!=null?
      client.find( element => element.id == project.client_id)["razon social"]
      :"":""
      }</h4>
      </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h4>Recursos</h4>
          </Col>
          <Col xs={9}>
{project.resources.map(element => {
   return (
  <Col >  <h4>{
      element.id!=null?resources.find( thiselement => thiselement.legajo == element.id)!=null?
      resources.find( thiselement => thiselement.legajo == element.id).Apellido+" "+resources.find( thiselement => element.id == thiselement.legajo).Nombre
      :"":""
      }</h4>
    
</Col>)
})}
             </Col>           

        </Row>
        <Row className="mt-5">
          <Col>
            <h4>Stakerholders</h4>
          </Col>

          {project.stake_holders.map(element => {
   return (
  <Col xs={9}>
    {console.log(resources)}

  <h4>{
      element.id!=null?resources.find( thiselement => thiselement.legajo == element.id)!=null?
      resources.find( thiselement => thiselement.legajo == element.id).Apellido+" "+resources.find( thiselement => element.id == thiselement.legajo).Nombre
      :"":""
      }</h4>
</Col>)
})};
          
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
          <Col xs={9}>
            <Link to={`/proyectos`}>
              <Button variant="danger" onClick={handleBorrado}>Borrar</Button>
            </Link>
            </Col>
            <Col xs={1}>
            <Link to={`/proyectos/`}>
              <Button>Atrás</Button>
            </Link>
          </Col>
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
