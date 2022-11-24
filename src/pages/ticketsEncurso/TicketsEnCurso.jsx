import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ticketsEnCurso.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalInfoTicketEnCurso from "../../components/modalInfoTicketEnCurso/ModalInfoTicketEnCurso";
import ModalInfoTicketEnCurso2 from "../../components/modalInfoTicketEnCurso/ModalInfoTicketEnCurso";
import ModalCreacionTicket from "../../components/modalCreacionTicket/ModalCreacionTicket";
import Dropdown from 'react-bootstrap/Dropdown';
import ModalTicketCerrado from "../../components/modalTicketCerrado/ModalTicketCerrado";
import axios from "axios";
import { display } from "@mui/system";

const SERVER_NAME = "http://localhost:3000";

const TicketsEnCurso = () => {


    const [showTicketModalEnCurso, setShowTicketModalEncurso] = useState(false);

    const [filters, setFilters] = useState({
        "categoria": "Todas",
        "estado": "Todos",
        "criticidad": "Todas",
    });

    const onChangeshowTicketModalEnCurso = (newSomeState) => {
        setShowTicketModalEncurso(newSomeState);
    };

    const [showTicketModalCerrado, setShowTicketModalCerrado] = useState(false);


    const onChangeshowTicketModalCerrado = (newSomeState) => {
        setShowTicketModalCerrado(newSomeState);
    };

    const [showCreacionModal, setShowCreacionModal] = useState(false);

    const onChangeshowCreacionModal = (newSomeState) => {
        setShowCreacionModal(newSomeState);
    };

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

    const [categoriaFilter, setCategoriaFilter] = useState("Todas");

    const [severidadFilter, setSeveridadFilter] = useState("Todas");

    const [estadoFilter, setEstadoFilter] = useState("Todos");



    useEffect(() => {

        const getDataEnCurso = async () => {
            const send_data = { type: 'enCurso' };
            axios
                .get(SERVER_NAME + "/tickets/", {
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
                .get(SERVER_NAME + "/tickets/", {
                    params: send_data,
                })
                .then((res) => {
                    setTicketsCerradosData(res.data.tickets);

                })
                .catch((err) => {
                    console.log(err);
                });

        }

        getDataEnCurso();
        getDataCerrados();



    }, []);



    return (
        <Fragment>
            <Container className="container-title">
                <table>
                <tr>
                    <th>
                        <h1>Tickets en Curso</h1>
                    </th>
                    <th>
                        <Button className="btn-ticket" variant="primary" onClick={() => onChangeshowCreacionModal(true)}>Crear Ticket</Button>
                    </th>
                </tr>
                </table>
            </Container>

            <Container className="container-filters">
                <Row>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {showEnTicketsEnCurso}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item name="En curso" onClick={(e) => handleDropdownEnCursoCerrado(e)}>En curso</Dropdown.Item>
                                <Dropdown.Item name="Cerrados" onClick={(e) => handleDropdownEnCursoCerrado(e)}>Cerrados</Dropdown.Item>


                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <h4>Categoría:</h4>
                    </Col>
                    <Col >
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
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
                        <h4>Estado:</h4>
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
                </Row>

            </Container>

            <Container className="container-cards">

                {showEnTicketsEnCurso === "En Curso" ? (
                    <Row className="row-cards mt-4">
                        {ticketsEnCursoData.length > 0 ?
                            ticketsEnCursoData.map((ticketEnCurso) => (

                                <Col key={ticketEnCurso.id} className="mt-3">
                                    <div class="d-flex justify-content-center">
                                    <Card style={{ width: '22rem'}}>
                                        <Card.Body>
                                            <Card.Title>
                                                <Row>
                                                    <Col>
                                                        Ticket  #{ticketEnCurso.id}
                                                    </Col>
                                                    <Col>
                                                        {ticketEnCurso.categoria}
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
                                                        <h5>Cliente: </h5>
                                                    </Col>
                                                    <Col>
                                                        {ticketEnCurso.nombreCliente}
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h5>Severidad: </h5>
                                                    </Col>
                                                    <Col>
                                                        {ticketEnCurso.criticidad}
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h5>Estado: </h5>
                                                    </Col>
                                                    <Col>
                                                        {ticketEnCurso.estado}
                                                    </Col>

                                                </Row>
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => { setTicketSeleccionadoData(ticketEnCurso); setShowTicketModalEncurso(true) }}>TicketInfo</Button>

                                            {showTicketModalEnCurso ? (
                                                <ModalInfoTicketEnCurso data={ticketSeleccionadoData} numeroTicket={ticketSeleccionadoData.id} onChangeshowTicketModalEnCurso={onChangeshowTicketModalEnCurso} />
                                            ) :
                                                (null
                                                )}

                                        </Card.Body>
                                    </Card>

                                    {
                                        showCreacionModal ? (
                                            <ModalCreacionTicket onChangeshowCreacionModal={onChangeshowCreacionModal} />
                                        ) :
                                            (null
                                            )
                                    }
                                </div>
                                </Col>

                            )) : <h3>Cargando...</h3>}

                    </Row>
                ) : (
                    <Row className="row-cards mt-4">
                        {ticketsCerradosData.length > 0 ?
                            ticketsCerradosData.map((ticketCerrado) => (
                                <Col className="mt-3">
                                    <Card style={{ width: '22rem' }}>
                                        <Card.Body>
                                            <Card.Title>
                                                <Row>
                                                    <Col>
                                                        Ticket  #{ticketCerrado.id}
                                                    </Col>

                                                </Row>

                                                <Row className="mt-2">
                                                    <Col>
                                                        {ticketCerrado.titulo}
                                                    </Col>
                                                    <Col>
                                                        {ticketCerrado.categoria}
                                                    </Col>


                                                </Row>
                                            </Card.Title>
                                            <Card.Text>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h5>Cliente: </h5>
                                                    </Col>
                                                    <Col>
                                                        {ticketCerrado.nombreCliente}
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col xs={5}>
                                                        <h5>Severidad: </h5>
                                                    </Col>
                                                    <Col>
                                                        {ticketCerrado.criticidad}
                                                    </Col>

                                                </Row>

                                            </Card.Text>
                                            <Button variant="primary" onClick={() => { setTicketSeleccionadoData(ticketCerrado); setShowTicketModalCerrado(true) }}>TicketInfo</Button>

                                            {showTicketModalCerrado ? (
                                                <ModalTicketCerrado data={ticketSeleccionadoData} numeroTicket={ticketSeleccionadoData.id} onChangeshowTicketModalCerrado={onChangeshowTicketModalCerrado} />
                                            ) :
                                                (null
                                                )}

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