import React, {useEffect, useState} from "react";
import Header from "./header";
import Body from "./body";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Container from 'react-bootstrap/Container';
import * as SERVER_NAMES from "../../APIRoutes";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";


export default function Dashboard() {
    const states =[{"name":"Todos"},{"name":"pending"},{"name":"analysis"},{"name":"development"},{"name":"production"},{"name":"post_production"}] ;
    const types = [{"name": "Todos"},{"name": "client"}, {"name": "support"}];

    const SERVER_NAME = "https://squad-8-projects.herokuapp.com";
    const [proyectos, setProyectos] = useState([]);
    const [assignees, setAssignees] = useState([]);
    let stateQuery="";
    let assigneeQuery="";
    let finishDateQuery="";
    let typeQuery="";

    const [state, setState] = useState('Seleccionar');
    const [assignee, setAssignee] = useState('Seleccionar');
    const [finishDate, setFinishDate] = useState('---');
    const [type, setType] = useState('Seleccionar');

    const handleStateFilter = (e) => {
        setState(e);
        e==="Todos"?stateQuery="":stateQuery="status="+e+"&";
        getProyectos();
    };
    const handleAssigneeFilter = (e) => {

        setAssignee(e);
        e==="Ninguno"?assigneeQuery="":assigneeQuery="assignee="+e+"&";
        getProyectos();
    };
    const handlePriorityFilter = (e) => {
        setFinishDate(e);
        finishDateQuery="finishDate="+e+"&";
        getProyectos();
    };
    const handleTypeFilter = (e) => {
        setType(e);
        e==="Todos"?typeQuery="":typeQuery="type="+e+"&";
        getProyectos();
    };

    const getAssignees = async () => {
        axios
            .get(SERVER_NAMES.ASSIGNEES , {})
            .then((res) => {
                setAssignees(res.data);
            })
            .catch((err) => {
                alert('Se produjo un error al consultar los clientes', err);
            });
        console.log(assignees);
    };
    const getProyectos = async () => {
        let url = "/psa/projects/?";
        setProyectos([])
        url += stateQuery;
        url += typeQuery;
        url += finishDateQuery;
        url += assigneeQuery;
        axios
            .get(SERVER_NAME + url, {})
            .then((res) => {
                setProyectos(res.data);
            })
            .catch((err) => {
                alert('Se produjo un error al consultar los proyectos', err);
            });
    };


    useEffect(() => {
        const interval = setInterval(() => {
            getAssignees();
            getProyectos();

        }, 600000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <br></br>
        <br></br>
        <br></br>
            <NavbarProyectos/>
            <Header/>

            <Container className="container-filters">
                <Row className="mt-5">
                    <Col>
                        <h4>Estados</h4>
                    </Col>
                    <Col>
                        <DropdownButton
                            variant="secondary" id="dropdown-basic" size="xl"
                            title={state}
                            onSelect={handleStateFilter}
                        >

                            {states.map((state) => {
                                return (
                                    <Dropdown.Item eventKey={state.name} name="state">
                                        {state.name}
                                    </Dropdown.Item>
                                );
                            })}

                        </DropdownButton>
                    </Col>

                    <Col>
                        <h4>Project Management</h4>
                    </Col>
                    <Col>
                        <DropdownButton
                            variant="secondary" id="dropdown-basic" size="xl"
                            title={assignee}
                            onSelect={handleAssigneeFilter}
                        >
                            <Dropdown.Item eventKey={"Todos"} name="management">
                                {"Todos"}
                            </Dropdown.Item>
                            {assignees.map((assignee) => {
                                return (
                                    <Dropdown.Item eventKey={assignee.legajo} name="management">
                                        {assignee.Nombre} {assignee.Apellido}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </Col>
                </Row>

                    <Row className="mt-5">
                    <Col>
                        <h4>Fecha de Finalizacion</h4>
                    </Col>
                    <Col>
                        <ButtonGroup className="me-5" aria-label="First group"    onClick={handlePriorityFilter}>
                            <Form.Control
                                type="text"
                                placeholder={finishDate}
                                aria-label={finishDate}
                                aria-describedby="btnGroupAddon"
                            />
                            <Button variant="secondary">Filtrar</Button>{' '}

                        </ButtonGroup>
                    </Col>
                    <Col>
                        <h4>Tipo</h4>
                    </Col>
                    <Col>
                        <DropdownButton
                            variant="secondary" id="dropdown-basic" size="xl"
                            title={type}
                            onSelect={handleTypeFilter}
                        >
                            {types.map((type) => {
                                return (
                                    <Dropdown.Item eventKey={type.name} name="client">
                                        {type.name}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>

            <Body projects={proyectos} filtrosStado={states}/>
        </>
    );
}
