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
import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";


export default function Dashboard() {
    const states =[{"name":"Todos"},{"name":"pending"},{"name":"analysis"},{"name":"development"},{"name":"production"},{"name":"post_production"}] ;
    const types = [{"name": "Todos"},{"name": "client"}, {"name": "support"}];

    const SERVER_NAME = "https://squad-8-projects.herokuapp.com";
    const [proyectos, setProyectos] = useState([]);
    const [assignees, setAssignees] = useState([]);
    const [clients, setClients] = useState([]);

    const [stateQuery, setStateQuery] = useState('');
    const [assigneeQuery, setAssigneeQuery] = useState('');
    //const [finishDateQuery, setFinishDateQuery] = useState("");
    const [typeQuery, setTypeQuery] = useState('');
    const [clientQuery, setClientQuery] = useState('');
    const [url, setUrl] = useState("/psa/projects/?");

    const [state, setState] = useState('Seleccionar');
    const [assignee, setAssignee] = useState('Seleccionar');
    const [type, setType] = useState('Seleccionar');
    const [client, setClient] = useState('Seleccionar');

    const handleStateFilter = (e) => {
        handleStateFilter2(e);
    };
    const handleStateFilter2 = (e) => {
  
        e==="Todos"?setStateQuery(''):setStateQuery("status="+e+"&");
        setState(statusMapping[e]);
        e==="Todos"?setStateQuery(''):setStateQuery("status="+e+"&");
        setState(statusMapping[e]);
        getProyectos();
    };

    const handleAssigneeFilter = (e) => {
        handleAssigneeFilter2(e);
        handleAssigneeFilter2(e);
    };
    const handleAssigneeFilter2 = (e) => {
        let assignee = assignees.find( element => element.legajo == e );
        e==="Todos"?setAssignee(e):setAssignee(assignee.Nombre+" "+assignee.Apellido);
        e==="Todos"?setAssigneeQuery(''):setAssigneeQuery("project_manager="+e+"&");
        getProyectos();
    };


    const handlerClientFilter = (e) => {
        handlerClientFilter2(e);
        handlerClientFilter2(e);
    };


    const handlerClientFilter2 = (e) => {
        let client = clients.find( element => element.id == e );
        e==="Todos"?setClient(e):setClient(client["razon social"]);
        e==="Todos"?setClientQuery(''):setClientQuery("client_id="+e+"&");
        getProyectos();
    };


    const handleTypeFilter = (e) => {
        handleTypeFilter2(e);
        handleTypeFilter2(e);

    };

    const handleTypeFilter2 = (e) => {
        setType(typeMapping[e]);
        e==="Todos"?setTypeQuery(''):setTypeQuery("type="+e+"&");
        getProyectos();
    };

    const getAssignees = async () => {
        axios
            .get(SERVER_NAMES.ASSIGNEES , {})
            .then((res) => {
                setAssignees(res.data);
            })
            .catch((err) => {
                alert('Se produjo un error al consultar los recursos', err);
            });
    };

    const getClients = async () => {
        /*
        axios
        .get('/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {

            })
            .then((res) => {
                setClients(res.data);
            })
            .catch((err) => {
                alert('Se produjo un error al consultar los clientes', err);
            });
        */
        setClients([{ "id": 1, "razon social": "FIUBA", "CUIT": "20-12345678-2" }, { "id": 2, "razon social": "FSOC", "CUIT": "20-12345678-5" }, { "id": 3, "razon social": "Macro", "CUIT": "20-12345678-3" }])
    };

    const getProyectos = async () => {
        console.log(SERVER_NAME +url+stateQuery+typeQuery+assigneeQuery+clientQuery)
        axios
            .get(SERVER_NAME + url+stateQuery+typeQuery+assigneeQuery+clientQuery, {})
            .then((res) => {
                setProyectos(res.data);
            })
            .catch((err) => {
                alert('Se produjo un error al consultar los proyectos', err);
            });
            
    };


    useEffect(() => {
        getAssignees();
        getClients();
        getProyectos();
        const interval = setInterval(() => {
            getAssignees();
            getProyectos();
            getClients();

        }, 600000);
        return () => clearInterval(interval);
    }, []);
    var statusMapping ={"Todos":"Todos","pending":"PENDIENTE","analysis":"EN ANALISIS",
                "development":"DESARROLLO","production":"PRODUCCION","post_production":"POST-PRODUCCION"}
    var typeMapping ={"Todos":"Todos","client":"DESARROLLO","support":"SOPORTE"}
  
 //   statusMapping[tareaActual.status]
    
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
                                        {statusMapping[state.name]}
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
                                        {typeMapping[type.name]}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </Col>
                    <Col>
                        <h4>Cliente</h4>
                    </Col>
                    <Col>
                        <DropdownButton
                            variant="secondary" id="dropdown-basic" size="xl"
                            title={client}
                            onSelect={handlerClientFilter}
                        >
                            <Dropdown.Item eventKey={"Todos"} name="management">
                                {"Todos"}
                            </Dropdown.Item>
                            {clients.map((client) => {
                                return (
                                    <Dropdown.Item eventKey={client.id} name="management">
                                        {client["razon social"]}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>

            <Body projects={proyectos} />
        </>
    );
}
