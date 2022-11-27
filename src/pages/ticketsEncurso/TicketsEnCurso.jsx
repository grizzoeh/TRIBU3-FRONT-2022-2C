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

import { SERVER_NAME_SOPORTE } from "../../environment";

const TicketsEnCurso = () => {


    const [showTicketModalEnCurso, setShowTicketModalEncurso] = useState(false);

    const [clientes, setClientes] = useState();


    const [filters, setFilters] = useState({
        "categoria": "Todas",
        "estado": "Todos",
        "criticidad": "Todas",
        "cliente": "Todos",
    });

    const onChangeshowTicketModalEnCurso = (newSomeState) => {
        setShowTicketModalEncurso(newSomeState);
    };


    const [showTicketModalCerrado, setShowTicketModalCerrado] = useState(false);


    const onChangeshowTicketModalCerrado = (newSomeState) => {
        setShowTicketModalCerrado(newSomeState);
    };

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

        console.log("filters", filters);


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



    useEffect(() => {



        const getClientes = async () => {
            // axios
            //     .get('https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {
            //         headers: {
            //             "Access-Control-Allow-Origin": "*",
            //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            //             'Access-Control-Allow-Credentials': true,
            //             crossorigin: true
            //         }
            //     })
            //     .then((response) => {
            //         console.log(response);
            //         // setClientes(response.data);
            //     }
            //     )
            //     .catch((error) => {
            //         console.log(error);
            //     });
            setClientes([{ "id": 1, "razon social": "FIUBA", "CUIT": "20-12345678-2" }, { "id": 2, "razon social": "FSOC", "CUIT": "20-12345678-5" }, { "id": 3, "razon social": "Macro", "CUIT": "20-12345678-3" }])
        }

        getDataEnCurso();
        getDataCerrados();
        getClientes();



    }, []);



    return (


        <Fragment>
            <NavbarSoporte></NavbarSoporte>
            <Container className="container-title">

                <Row>
                    <Col xs={10}>
                        <h3>Tickets en Curso</h3>
                    </Col>
                    < Col xs={2}>
                        <Button size="sm" variant="primary" onClick={() => setShowCreacionModal(true)}>Crear</Button>
                    </Col>


                </Row>

            </Container>

            <Container className="container-filters">
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
                                        <Dropdown.Item name="cliente" onClick={(e) => handleDropdownFilter(e)}>{cliente["razon social"]}</Dropdown.Item>
                                    )
                                })}

                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row>

            </Container>

            <Container className="container-cards">

                {showEnTicketsEnCurso === "En Curso" ? (

                    <Row className="row-cards mt-4">
                        {ticketsEnCursoData.length > 0 && clientes ?

                            ticketsEnCursoData.filter(
                                (ticket) => {
                                    //apply filters with categoria, criticidad and estado
                                    return (
                                        (filters["categoria"] === "Todas" || ticket.categoria === filters["categoria"]) &&
                                        (filters["criticidad"] === "Todas" || ticket.criticidad === filters["criticidad"]) &&
                                        (filters["estado"] === "Todos" || ticket.estado === filters["estado"]) &&
                                        (filters["cliente"] === "Todos" || clientes[ticket.idCliente - 1]["razon social"] === filters["cliente"])
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
                                                        {clientes[ticketEnCurso.idCliente - 1]["razon social"]}
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
                                            </Card.Text>
                                            <Button size="sm" variant="primary" onClick={() => { setTicketSeleccionadoData(ticketEnCurso); setShowTicketModalEncurso(true) }}>Información</Button>

                                            {showTicketModalEnCurso ? (
                                                <ModalInfoTicketEnCurso data={ticketSeleccionadoData} numeroTicket={ticketSeleccionadoData.id} onChangeshowTicketModalEnCurso={onChangeshowTicketModalEnCurso} getDataEnCurso={getDataEnCurso} />

                                            ) :
                                                (null
                                                )}

                                        </Card.Body>
                                    </Card>

                                    {
                                        showCreacionModal ? (
                                            <ModalCreacionTicket getDataEnCurso={getDataEnCurso} showCreacionModal={showCreacionModal} setShowCreacionModal={setShowCreacionModal} />
                                        ) :
                                            (null
                                            )
                                    }

                                </Col>

                            )) : <h3>Cargando...</h3>}


                    </Row>
                ) : (
                    <Row className="row-cards mt-4">
                        {ticketsCerradosData.length > 0 ?
                            ticketsCerradosData.filter(
                                (ticket) => {
                                    //apply filters with categoria, criticidad and estado
                                    return (
                                        (filters["categoria"] === "Todas" || ticket.categoria === filters["categoria"]) &&
                                        (filters["criticidad"] === "Todas" || ticket.criticidad === filters["criticidad"]) &&
                                        (filters["estado"] === "Todos" || ticket.estado === filters["estado"]) &&
                                        (filters["cliente"] === "Todos" || clientes[ticket.idCliente - 1]["razon social"] === filters["cliente"])
                                    );
                                }

                            ).sort((a, b) => a.id > b.id ? 1 : -1).map((ticketCerrado) => (
                                <Col className="mt-3">
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

                                            </Card.Text>
                                            <Button size="sm" variant="primary" onClick={() => { setTicketSeleccionadoData(ticketCerrado); setShowTicketModalCerrado(true) }}>Información</Button>

                                            {showTicketModalCerrado ? (
                                                <ModalTicketCerrado data={ticketSeleccionadoData} numeroTicket={ticketSeleccionadoData.id} onChangeshowTicketModalCerrado={onChangeshowTicketModalCerrado} />
                                            ) :
                                                (null
                                                )}

                                        </Card.Body>
                                    </Card>
                                    {/* {
                                        showCreacionModal ? (
                                            <ModalCreacionTicket onChangeshowCreacionModal={onChangeshowCreacionModal} getDataEnCurso={getDataEnCurso} />
                                        ) :
                                            (null
                                            )
                                    } */}
                                </Col>
                            )) : <h3>Cargando...</h3>}

                    </Row>
                )}

            </Container>



        </Fragment >
    );

}
export default TicketsEnCurso