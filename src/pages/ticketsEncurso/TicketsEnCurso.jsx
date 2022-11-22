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

const SERVER_NAME = "http://localhost:3000";

const TicketsEnCurso = () => {


    const [showTicketModalEnCurso, setShowTicketModalEncurso] = useState(false);


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



    const [ticketsEnCursoData, setTicketsEnCursoData] = useState([]);
    const [ticketsCerradosData, setTicketsCerradosData] = useState([]);



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

                <Row>
                    <Col xs={10}>
                        <h1>Tickets en Curso</h1>
                    </Col>
                    < Col xs={2}>
                        <Button variant="primary" onClick={() => onChangeshowCreacionModal(true)}>Crear Ticket</Button>
                    </Col>


                </Row>

            </Container>

            <Container className="container-filters">
                <Row>
                    <Col xs={1}>
                        <Dropdown>
                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                {showEnTicketsEnCurso}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {showEnTicketsEnCurso === "En Curso" ? <Dropdown.Item name="Cerrados" onClick={(e) => handleDropdownEnCursoCerrado(e)}>Cerrados</Dropdown.Item> : <Dropdown.Item name="En Curso" onClick={(e) => handleDropdownEnCursoCerrado(e)}>En curso</Dropdown.Item>}

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
                                    <Card style={{ width: '22rem' }}>
                                        <Card.Body>
                                            <Card.Title>
                                                <Row>
                                                    <Col>
                                                        Ticket  #{ticketEnCurso.id}
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
                                            <Button variant="primary" onClick={() => setShowTicketModalEncurso(true)}>TicketInfo</Button>

                                            {showTicketModalEnCurso ? (
                                                <ModalInfoTicketEnCurso data={ticketEnCurso} numeroTicket={ticketEnCurso.id} onChangeshowTicketModalEnCurso={onChangeshowTicketModalEnCurso} />
                                            ) :
                                                (null
                                                )}

                                        </Card.Body>
                                    </Card>

                                    {showCreacionModal ? (
                                        <ModalCreacionTicket onChangeshowCreacionModal={onChangeshowCreacionModal} />
                                    ) :
                                        (null
                                        )}

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
                                            <Button variant="primary" onClick={() => setShowTicketModalCerrado(true)}>TicketInfo</Button>

                                            {showTicketModalCerrado ? (
                                                <ModalTicketCerrado data={ticketCerrado} numeroTicket={ticketCerrado.id} onChangeshowTicketModalCerrado={onChangeshowTicketModalCerrado} />
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