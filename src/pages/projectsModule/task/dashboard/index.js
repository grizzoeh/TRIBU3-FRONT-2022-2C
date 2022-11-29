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
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

import MockProjects from "../../../../Mock/projects";
import KanbanDashboard from "./kanbanDashboard";

export default function DashboardTareas() {
    const params = useParams();
  const SERVER_NAME = "https://squad-8-projects.herokuapp.com";
  const [tareas, setTareas] = useState([]);
  const [proyecto, setProyecto] = useState([]);

  const [filters, setFilters] = useState({
      "Estado": "Todas",
      "estado": "Todos",
      "criticidad": "Todas",
      "cliente": "Todos",
  });

  const handleDropdownFilter = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.innerHTML });

    console.log("filters", filters);


};


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
                {/*<a href="/crear-tarea">*/}
                <Link
                /*
                    to={{
                    pathname: "/crear-tarea",
                    state: { proyecto: {
                    //id: params.id,
                    id: proyecto.id,
                    name: proyecto.name
                        }}
                    }}
                */
                    to={`/proyectos/${proyecto.id}/crear-tarea/`}
                >
                    <Button variant="primary" onClick={console.log("click crear tarea")}>Crear Tarea</Button>
                    {/* <Button variant="primary" onClick={() => onChangeshowCreacionModal(true)}>Crear Ticket</Button> */}
                </Link>
                {/*</a>*/}
            </Col>
            < Col>
                    <Button variant="primary" onClick={console.log("click diagrama gannt")}>
                        Diagrama de Gannt
                    </Button>
                    
            </Col>
            </Row>

            <Row><Container className="container-filters">
                <Row>
                    {/*<Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {showEnTicketsEnCurso}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="En curso" onClick={(e) => handleDropdownEnCursoCerrado(e)}>En curso</Dropdown.Item>
                                <Dropdown.Item name="Cerrados" onClick={(e) => handleDropdownEnCursoCerrado(e)}>Cerrados</Dropdown.Item>


                            </Dropdown.Menu>
                        </Dropdown>
  </Col>*/}
                    <Col>
                        <h4>Estado:</h4>
                    </Col>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {filters["Estado"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="Estado" onClick={(e) => handleDropdownFilter(e)}>Todas</Dropdown.Item>
                                <Dropdown.Item name="Estado" onClick={(e) => handleDropdownFilter(e)}>Por hacer</Dropdown.Item>
                                <Dropdown.Item name="Estado" onClick={(e) => handleDropdownFilter(e)}>En curso</Dropdown.Item>
                                <Dropdown.Item name="Estado" onClick={(e) => handleDropdownFilter(e)}>Finalizada</Dropdown.Item>


                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col>
                        <h4>Criticidad:</h4>
                    </Col>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {filters["criticidad"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Todas</Dropdown.Item>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Baja</Dropdown.Item>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Media</Dropdown.Item>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Alta</Dropdown.Item>
                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownFilter(e)}>Crítica</Dropdown.Item>



                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col>
                        <h4>Estado2:</h4>
                    </Col>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {filters["estado"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Todos</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Abierto</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>En análisis</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Derivado</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Resuelto</Dropdown.Item>
                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownFilter(e)}>Cancelado</Dropdown.Item>



                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col>
                        <h4>Cliente:</h4>
                    </Col>
                    {/*<Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {filters["cliente"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="cliente" onClick={(e) => { handleDropdownFilter(e) }}>Todos</Dropdown.Item>
                                {clientes?.map((cliente) => {
                                    return (
                                        <Dropdown.Item name="cliente" onClick={(e) => handleDropdownFilter(e)}>{cliente["razon social"]}</Dropdown.Item>
                                    )
                                })}

                            </Dropdown.Menu>
                        </Dropdown>
                              </Col>*/}
                </Row>

            </Container></Row>
            <Row>
                <Container className="container-cards">
                <KanbanDashboard initialTasks={tareas} setTasks={setTareas}/>

                    {/* {tareas.filter(
                      (tarea) => {
                        //apply filters with categoria, criticidad and estado
                        return (
                          (filters["Estado"] === "Todas" || tarea.categoria === filters["Estado"]) &&
                          (filters["criticidad"] === "Todas" || tarea.criticidad === filters["criticidad"]) &&
                          (filters["estado"] === "Todos" || tarea.estado === filters["estado"])
                          //(filters["cliente"] === "Todos" || clientes[ticket.idCliente - 1]["razon social"] === filters["cliente"])
                        );
                      }
                    )} */}
                </Container>
            </Row>

        </Container>


    </Fragment >
);

}