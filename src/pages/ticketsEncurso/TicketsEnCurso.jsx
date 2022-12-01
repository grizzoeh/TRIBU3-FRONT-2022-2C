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


import { SERVER_NAME_SOPORTE } from "../../environment";
import { Snackbar } from "@mui/material";


const TicketsEnCurso = () => {



    const [clientes, setClientes] = useState();

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
        "asesor": "Todos"
    });

    const vertical = "top"
    const horizontal = "center"


    const [showCreacionModal, setShowCreacionModal] = useState(false);



    const [showEnTicketsEnCurso, setShowEnTicketsEnCurso] = useState("En Curso");

    const handleDropdownEnCursoCerrado = (e) => {
        if (e.target.name === "En curso") {
            setShowEnTicketsEnCurso("En Curso");
        } else if (e.target.name === "Cerrados") {
            setShowEnTicketsEnCurso("Cerrados");
        }

    };

    const handleDropdownFilter = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.innerHTML });
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
                console.log("Errorxd: ", err); // FIXME TOAST
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
            .get('/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {

            })
            .then((response) => {
                setClientes(response.data);
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
                // console.log(response);
                setRecursos(response.data);
            }
            )
            .catch((error) => {
                console.log(error);
            });
    }


    useEffect(() => {



        getDataEnCurso();
        getDataCerrados();
        getClientes();
        getRecursos();



    }, []);



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
                        <h1>Tickets en Curso</h1>
                    </Col>
                    < Col md="auto" className="v-center">
                        <Button size="sm" variant="primary" className="botoncrearticket" onClick={() => setShowCreacionModal(true)}> ✚ Nuevo Ticket</Button>
                    </Col>
                </Row>
                <Container className="spacer-line">
                    <SpacerLine className="spacer-line" color="black"></SpacerLine>
                </Container>

                {
                    showCreacionModal ? (
                        <ModalCreacionTicket getDataEnCurso={getDataEnCurso} showCreacionModal={showCreacionModal} setShowCreacionModal={setShowCreacionModal} setTicketCreadoExito={setTicketCreadoExito} />
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
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                {showEnTicketsEnCurso}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="En curso" onClick={(e) => handleDropdownEnCursoCerrado(e)}>En curso</Dropdown.Item>
                                <Dropdown.Item name="Cerrados" onClick={(e) => handleDropdownEnCursoCerrado(e)}>Cerrados</Dropdown.Item>


                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <h5>Categoría:</h5>
                    </Col>
                    <Col >
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

                    <Col>
                        <h5>Criticidad:</h5>
                    </Col>
                    <Col >
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

                    <Col>
                        <h5>Estado:</h5>
                    </Col>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
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
                        <h5>Cliente:</h5>
                    </Col>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                {filters["cliente"]}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="cliente" onClick={(e) => { handleDropdownFilter(e) }}>Todos</Dropdown.Item>
                                {clientes?.map((cliente) => {
                                    return (
                                        <Dropdown.Item key={cliente["id"]} name="cliente" onClick={(e) => handleDropdownFilter(e)}>{cliente["razon social"]}</Dropdown.Item>
                                    )
                                })}

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    <Col>
                        <h5>Asesor:</h5>
                    </Col>
                    <Col >
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

                </Row>

            </Container>

            <Container className="container-cards">

                {showEnTicketsEnCurso === "En Curso" ? (

                    <Row className="row-cards mt-4" md="auto" >
                        {ticketsEnCursoData.length > 0 && clientes ?

                            ticketsEnCursoData.filter(
                                (ticket) => {
                                    //apply filters with categoria, criticidad and estado
                                    return (
                                        (filters["categoria"] === "Todas" || ticket.categoria === filters["categoria"]) &&
                                        (filters["criticidad"] === "Todas" || ticket.criticidad === filters["criticidad"]) &&
                                        (filters["estado"] === "Todos" || ticket.estado === filters["estado"]) &&
                                        (filters["cliente"] === "Todos" || clientes?.find(cliente => cliente.id === ticket.idCliente)["razon social"] === filters["cliente"]) &&
                                        (filters["asesor"] === "Todos" || recursos.find(recurso => recurso.legajo === ticket.idAsesor).Nombre + " " + recursos.find(recurso => recurso.legajo === ticket.idAsesor).Apellido === filters["asesor"])

                                    );
                                }

                            ).sort((a, b) => a.id > b.id ? 1 : -1).map((ticketEnCurso) => (
                                <Col key={ticketEnCurso.id} className="mt-3">
                                    <Card style={{ width: '22rem' }}>
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
                                                        {clientes?.find(cliente => cliente.id === ticketEnCurso.idCliente)["razon social"]}
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Criticidad: </h6>
                                                    </Col>
                                                    <Col>
                                                        {ticketEnCurso.criticidad}
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Estado: </h6>
                                                    </Col>
                                                    <Col>
                                                        {ticketEnCurso.estado}
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


                                            <ModalInfoTicketEnCurso data={ticketEnCurso} numeroTicket={ticketEnCurso.id} getDataEnCurso={getDataEnCurso} getDataCerrados={getDataCerrados} setTicketResueltoExito={setTicketResueltoExito} />



                                        </Card.Body>
                                    </Card>



                                </Col>

                            )) : <h3>Cargando...</h3>}


                    </Row>
                ) : (
                    <Row className="row-cards mt-4" md="auto" >
                        {ticketsCerradosData.length > 0 ?
                            ticketsCerradosData.filter(
                                (ticket) => {
                                    //apply filters with categoria, criticidad and estado
                                    return (
                                        (filters["categoria"] === "Todas" || ticket.categoria === filters["categoria"]) &&
                                        (filters["criticidad"] === "Todas" || ticket.criticidad === filters["criticidad"]) &&
                                        (filters["estado"] === "Todos" || ticket.estado === filters["estado"]) &&
                                        (filters["cliente"] === "Todos" || clientes[ticket.idCliente - 1]["razon social"] === filters["cliente"]) &&
                                        (filters["asesor"] === "Todos" || recursos.find(recurso => recurso.legajo === ticket.idAsesorResolutor).Nombre + " " + recursos.find(recurso => recurso.legajo === ticket.idAsesorResolutor).Apellido === filters["asesor"])
                                    );
                                }

                            ).sort((a, b) => a.id > b.id ? 1 : -1).map((ticketCerrado) => (
                                <Col key={ticketCerrado.id} className="mt-3">
                                    <Card style={{ width: '22rem' }}>
                                        <Card.Body>
                                            <Card.Title>
                                                <Row>
                                                    <Col>
                                                        Ticket  #{ticketCerrado.id} - {ticketCerrado.categoria}
                                                    </Col>

                                                </Row>

                                                <Row className="mt-2">
                                                    <Col>
                                                        {ticketCerrado.titulo}
                                                    </Col>

                                                </Row>
                                            </Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Cliente: </h6>
                                                    </Col>
                                                    <Col>
                                                        {clientes[ticketCerrado.idCliente - 1]["razon social"]}
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Severidad: </h6>
                                                    </Col>
                                                    <Col>
                                                        {ticketCerrado.criticidad}
                                                    </Col>

                                                </Row>

                                                <Row>
                                                    <Col xs={5}>
                                                        <h6>Asesor: </h6>
                                                    </Col>
                                                    <Col>
                                                        {recursos?.find(recurso => recurso.legajo === ticketCerrado.idAsesorResolutor)["Nombre"] + " " + recursos?.find(recurso => recurso.legajo === ticketCerrado.idAsesorResolutor)["Apellido"]}

                                                    </Col>

                                                </Row>

                                            </Card.Text>

                                            <ModalTicketCerrado data={ticketCerrado} numeroTicket={ticketCerrado.id} />


                                        </Card.Body>
                                    </Card>

                                </Col>
                            )) : <h3>Cargando...</h3>}

                    </Row>
                )}

            </Container>



        </Fragment >
    );

}
export default TicketsEnCurso