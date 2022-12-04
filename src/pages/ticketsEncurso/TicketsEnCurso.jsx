import React, { Fragment, useEffect, useState } from "react";
import "./ticketsEnCurso.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalInfoTicketEnCurso from "../../components/modalInfoTicketEnCurso/ModalInfoTicketEnCurso";
import ModalCreacionTicket from "../../components/modalCreacionTicket/ModalCreacionTicket";
import Dropdown from 'react-bootstrap/Dropdown';
import ModalTicketCerrado from "../../components/modalTicketCerrado/ModalTicketCerrado";
import axios from "axios";
import NavbarSoporte from "../../components/navbarSoporte/NavbarSoporte";
import Alert from 'react-bootstrap/Alert';
import SpacerLine from "../../components/spacerLine/spacerLine";
import Badge from 'react-bootstrap/Badge';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';


import { SERVER_NAME_SOPORTE } from "../../environment";
import { Snackbar } from "@mui/material";


const TicketsEnCurso = () => {
    const [refreshKey, setRefreshKey] = useState(0);


    const [clientes, setClientes] = useState([]);

    const [ticketCreadoExito, setTicketCreadoExito] = useState(false);
    const handleCloseCreadoExito = () => setTicketCreadoExito(false);

    const [ticketResueltoExito, setTicketResueltoExito] = useState(false);
    const handleCloseResueltoExito = () => setTicketResueltoExito(false);
    

    const [recursos, setRecursos] = useState();



    const [filters, setFilters] = useState({
        "categoria": "Todas",
        "estado": "Todos",
        "criticidad": "Todas",
        "cliente": "Todos",
        "asesor": "Todos",
        "resolutor":"Todos"
    });



    const vertical = "top"
    const horizontal = "center"


    const [showCreacionModal, setShowCreacionModal] = useState(false);

    const [allTickets, setAllTickets] = useState([]);

    const [showEnTicketsEnCurso, setShowEnTicketsEnCurso] = useState("En Curso");

    const handleDropdownEnCursoCerrado = (e) => {
        if (e.target.name === "En curso") {
            setShowEnTicketsEnCurso("En Curso");
        } else if (e.target.name === "Resueltos") {
            setShowEnTicketsEnCurso("Resueltos");
        }

    };

    const handleDropdownFilter = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.innerHTML });
    };

    const handleChangeMostrar = (val) => {
        if (val !== "Resuelto") {
            setFilters({ ...filters, ["estado"]: val, ["resolutor"]: "Todos"});
        }
        else {
            setFilters({ ...filters, ["estado"]: val});
        }
    };


    const [ticketsEnCursoData, setTicketsEnCursoData] = useState([]);
    const [ticketsCerradosData, setTicketsCerradosData] = useState([]);



    const [ticketSeleccionadoData, setTicketSeleccionadoData] = useState();

    const getDataEnCurso = async () => {
        const send_data = { type: 'enCurso' };
        axios
            .get(SERVER_NAME_SOPORTE + "/tickets/", {
                params: send_data,
            })
            .then((res) => {
                setTicketsEnCursoData(res.data.tickets);

            })
            .catch((err) => {
                console.log("Error: ", err); // FIXME TOAST
            });

    };

    const getDataCerrados = async () => {
        const send_data = { type: "resueltos" };
        axios
            .get(SERVER_NAME_SOPORTE + "/tickets/", {
                params: send_data,
            })
            .then((res) => {
                setTicketsCerradosData(res.data.tickets);

            })
            .catch((err) => {
                console.log(err);
            });

    }

    const getClientes = async () => {
        axios
            .get('https://psa-soporte-squad7.herokuapp.com/tickets/clientes', {

            })
            .then((response) => {
                setClientes(response.data.data);

            }
            )
            .catch((error) => {
                console.log(error);
            });
        //setClientes([{ "id": 1, "razon social": "FIUBA", "CUIT": "20-12345678-2" }, { "id": 2, "razon social": "FSOC", "CUIT": "20-12345678-5" }, { "id": 3, "razon social": "Macro", "CUIT": "20-12345678-3" }])
    }

    const getRecursos = async () => {
        axios
            .get('https://squad920222c-production.up.railway.app/recursos/empleados/empleado', {

            })
            .then((response) => {
                setRecursos(response.data);
            }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    const getAllTickets = async () => {
        getDataEnCurso();
        getDataCerrados();
        setAllTickets(ticketsEnCursoData.concat(ticketsCerradosData));
        setRefreshKey(oldKey => oldKey+1);
    }



    useEffect(() => {
        getDataEnCurso();
        getDataCerrados();
        getClientes();
        getRecursos();
        getAllTickets();
    }, [setRefreshKey]);



    return (
        <Fragment>
            <NavbarSoporte></NavbarSoporte>
            <Snackbar open={ticketCreadoExito} autoHideDuration={2000} onClose={handleCloseCreadoExito} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                <Alert show={ticketCreadoExito} variant='success'>
                    Ticket creado con exito!
                </Alert>
            </Snackbar>

            <Snackbar open={ticketResueltoExito} autoHideDuration={2000} onClose={handleCloseResueltoExito} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                <Alert show={ticketResueltoExito} variant='success'>
                    Ticket resuelto!
                </Alert>
            </Snackbar>
            <Container className="container-title">
                <Row>
                    <Col md="auto">
                        <h1>Tickets:</h1>
                    </Col>
                </Row>
            <Container className="spacer-line">
                <SpacerLine className="spacer-line" color="black"></SpacerLine>
            </Container>
                {
                    showCreacionModal ? (
                        <ModalCreacionTicket getDataEnCurso={getDataEnCurso} getDataCerrados={getDataCerrados} showCreacionModal={showCreacionModal} setShowCreacionModal={setShowCreacionModal} setTicketCreadoExito={setTicketCreadoExito} />
                    ) :
                        (
                            <></>
                        )
                }
            </Container >
            <Container className="spacer-line">
                <SpacerLine className="spacer-line" color="black"></SpacerLine>
            </Container>

            <Container>
                <Row>
                    <Col><h5>Filtros:</h5></Col>
                    < Col className="end">
                        <Button size="lg" variant="primary" onClick={() => setShowCreacionModal(true)}> ✚ Nuevo Ticket</Button>
                    </Col>
                </Row>
                <Row>
                    <Col classname="toggleEstados" md="auto"><h6>Estado del ticket:</h6></Col>
                    <Col classname="toggleEstados" md="auto">
                        <ToggleButtonGroup type="radio" name="options" defaultValue={"Todos"} onChange={handleChangeMostrar}>
                            <ToggleButton id="tbg-radio-1" value={"Todos"}>
                                Cualquiera
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-6" value={"Abierto"}>
                                Abierto
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-2" value={"En análisis"}>
                                En análisis
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-3" value={"Derivado"}>
                                Derivado
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-4" value={"Resuelto"}>
                                Resuelto
                            </ToggleButton>
                            <ToggleButton id="tbg-radio-5" value={"Cancelado"}>
                                Cancelado
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Col>
                </Row>
                <Row className="filtros">
                    <Col md="auto">
                        <h6>Categoría:</h6>
                    </Col>
                    <Col md="auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                {filters["categoria"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="categoria" onClick={(e) => handleDropdownFilter(e)}>Todas</Dropdown.Item>
                                <Dropdown.Item name="categoria" onClick={(e) => handleDropdownFilter(e)}>Reclamo</Dropdown.Item>
                                <Dropdown.Item name="categoria" onClick={(e) => handleDropdownFilter(e)}>Consulta</Dropdown.Item>


                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col md="auto">
                        <h6>Criticidad:</h6>
                    </Col>
                    <Col md="auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
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
                    <Col md="auto">
                        <h6>Cliente:</h6>
                    </Col>
                    <Col md="auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                {filters["cliente"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="cliente" onClick={(e) => { handleDropdownFilter(e) }}>Todos</Dropdown.Item>
                                {clientes.length > 0 ?
                                    clientes.map((cliente) => {
                                        return (
                                            <Dropdown.Item key={cliente["id"]} name="cliente" onClick={(e) => handleDropdownFilter(e)}>{cliente["razon social"]}</Dropdown.Item>
                                        )
                                    }) : <></>}

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col md="auto">
                        <h6>Asesor:</h6>
                    </Col>
                    <Col md="auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                {filters["asesor"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="asesor" onClick={(e) => handleDropdownFilter(e)}>Todos</Dropdown.Item>
                                {recursos?.map((asesor) => {
                                    return (
                                        <Dropdown.Item key={asesor["legajo"]} name="asesor" onClick={(e) => handleDropdownFilter(e)}>{asesor["Nombre"]} {asesor["Apellido"]}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    {filters.estado === "Resuelto" ? (
                    <Col md="auto">
                        <h6>Resolutor:</h6>
                    </Col>
                    ):
                    (
                        <></>
                    )}

                    {filters.estado === "Resuelto" ? (
                    <Col md="auto">
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                {filters["resolutor"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="resolutor" onClick={(e) => handleDropdownFilter(e)}>Todos</Dropdown.Item>
                                {recursos?.map((asesor) => {
                                    return (
                                        <Dropdown.Item key={asesor["legajo"]} name="resolutor" onClick={(e) => handleDropdownFilter(e)}>{asesor["Nombre"]} {asesor["Apellido"]}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    ):
                    (
                        <></>
                    )}
                </Row>

            </Container>
            <Container className="container-cards">
                {showEnTicketsEnCurso === "En Curso" ? (
                    <Row className="row-cards mt-4" md="auto" >
                        {console.log(allTickets)}
                        {ticketsEnCursoData.concat(ticketsCerradosData).length > 0 && clientes ?
                            ticketsEnCursoData.concat(ticketsCerradosData).filter(
                                (ticket) => {
                                    //apply filters with categoria, criticidad and estado
                                    return (
                                        (filters["categoria"] === "Todas" || ticket.categoria === filters["categoria"]) &&
                                        (filters["criticidad"] === "Todas" || ticket.criticidad === filters["criticidad"]) &&
                                        (filters["estado"] === "Todos" || ticket.estado === filters["estado"]) &&
                                        (filters["cliente"] === "Todos" || clientes?.find(cliente => cliente.id === ticket.idCliente)["razon social"] === filters["cliente"]) &&
                                        (filters["asesor"] === "Todos" || recursos.find(recurso => recurso.legajo === ticket.idAsesor).Nombre + " " + recursos.find(recurso => recurso.legajo === ticket.idAsesor).Apellido === filters["asesor"]) &&
                                        (filters["resolutor"] === "Todos" || recursos.find(recurso => recurso.legajo === ticket.idAsesorResolutor).Nombre + " " + recursos.find(recurso => recurso.legajo === ticket.idAsesorResolutor).Apellido === filters["resolutor"])
                                    );
                                }
                            ).sort((a, b) => a.id > b.id ? 1 : -1).map((ticketEnCurso) => (
                                <Col key={ticketEnCurso.id} className="mt-3">
                                    <Card style={{ width: '26rem' }}>
                                        <Card.Body>
                                            <Card.Title>
                                                <Row>
                                                    <Col>
                                                        Ticket  #{ticketEnCurso.id} - {ticketEnCurso.categoria}
                                                    </Col>


                                                </Row>

                                                <Row className="mt-2">
                                                    <Col>
                                                        {ticketEnCurso.titulo}
                                                    </Col>


                                                </Row>
                                            </Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Cliente: </h6>
                                                    </Col>
                                                    <Col>
                                                        {clientes.length > 0 ?
                                                            clientes.find(cliente => cliente.id === ticketEnCurso.idCliente)["razon social"]
                                                            : <></>}
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Criticidad:</h6>
                                                    </Col>
                                                    <Col>
                                                        <Badge className={ticketEnCurso.criticidad.replace(/\s/g, '')}>{ticketEnCurso.criticidad}</Badge>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Estado: </h6>
                                                    </Col>
                                                    <Col>
                                                        <Badge className={ticketEnCurso.estado.replace(/\s/g, '')}>{ticketEnCurso.estado}</Badge>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Asesor: </h6>
                                                    </Col>
                                                    <Col>
                                                        {recursos?.find(recurso => recurso.legajo === ticketEnCurso.idAsesor)["Nombre"] + " " + recursos?.find(recurso => recurso.legajo === ticketEnCurso.idAsesor)["Apellido"]}

                                                    </Col>

                                                </Row>
                                            </Card.Text>

                                            {ticketEnCurso.estado === "Resuelto" ? (
                                                <ModalTicketCerrado data={ticketEnCurso} numeroTicket={ticketEnCurso.id} />
                                            ):(
                                                <ModalInfoTicketEnCurso data={ticketEnCurso} numeroTicket={ticketEnCurso.id} getDataEnCurso={getDataEnCurso} getDataCerrados={getDataCerrados} setTicketResueltoExito={setTicketResueltoExito} getAllData={getAllTickets} setRefreshKey={setRefreshKey}/>
                                            )}

                                        </Card.Body>
                                    </Card>



                                </Col>

                            )) : <h3>Cargando...</h3>}


                    </Row>
                ) : (
                    <Row className="row-cards mt-4" md="auto" >
                    </Row>
                )}

            </Container>



        </Fragment >
    );

}
export default TicketsEnCurso