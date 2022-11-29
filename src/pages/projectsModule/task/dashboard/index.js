import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
//import "../../../ticketsEncurso/ticketsEnCurso.css";
import "./tareasProyecto.css"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';


import MockProjects from "../../../../Mock/projects";
import KanbanDashboard from "./kanbanDashboard";

export default function DashboardTareas() {
    const params = useParams();
  const SERVER_NAME = "https://squad-8-projects.herokuapp.com";
  const [tareas, setTareas] = useState([]);
  const [proyecto, setProyecto] = useState([]);


  useEffect(() => {
    // const getProyectos = async () => {
    //     setProyectos(MockProjects);
    // };

    const getProyecto = async () => {
        axios
          .get(SERVER_NAME + `/psa/projects/${params.id}`, {})
          .then((res) => {
            setProyecto(res.data);
          })
          .catch((err) => {
            alert('Se produjo un error al consultar los proyectos', err);
          });
      };

    const getTareas = async () => {
      axios
        .get(SERVER_NAME + `/psa/projects/${params.id}/tasks/`, {})
        .then((res) => {
          setTareas(res.data);
        })
        .catch((err) => {
          alert('Se produjo un error al consultar las tareas para el proyecto', err);
        });
    };

    getProyecto();
    getTareas();
  }, []);

  return (
    <Fragment>
        {/* TODO Proyectos: Mejorar estilo de padding  */}
        <Container className="container-title">

            <Row>
                <Col xs="auto">
                    <h1> {proyecto.name} - Tareas</h1>
                </Col>

            </Row>
            <Row xs="auto">
            < Col>
                    <Button variant="primary" onClick={console.log("click crear tarea")}>Crear Tarea</Button>
                    {/* <Button variant="primary" onClick={() => onChangeshowCreacionModal(true)}>Crear Ticket</Button> */}
            </Col>
            < Col>
                    <Button variant="primary" onClick={console.log("click diagrama gannt")}>
                        Diagrama de Gannt
                    </Button>
                    
            </Col>
            </Row>
            <Row>
                <Container className="container-cards">
                    <KanbanDashboard initialTasks={tareas} setTasks={setTareas}/>
                </Container>
            </Row>

        </Container>


    </Fragment >
);

}