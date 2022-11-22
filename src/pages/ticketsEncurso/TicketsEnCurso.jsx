import React, { Fragment, useState } from "react";
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

const TicketsEnCurso = () => {


    const [showTicketModal, setShowTicketModal] = useState(false);


    const onChangeshowTicketModal = (newSomeState) => {
        setShowTicketModal(newSomeState);
    };

    const [showCreacionModal, setShowCreacionModal] = useState(false);

    const onChangeshowCreacionModal = (newSomeState) => {
        setShowCreacionModal(newSomeState);
    };

    const [showEnTicketsEnCurso, setShowEnTicketsEnCurso] = useState("En Curso");

    const handleDropdownEnCursoCerrado = (e) => {
        console.log(e.target.name);
        if (e.target.name === "En curso") {
            setShowEnTicketsEnCurso("En Curso");
        } else if (e.target.name === "Cerrados") {
            setShowEnTicketsEnCurso("Cerrados");
        }
    };

    const cardInfo = {
        "id": 1,
        "titulo": "Problema con el servidor",
        "nombreCliente": "Juan Perez",
        "severidad": "Alta",
        "estado": "En curso",

    }



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

                    <Row className="row-cards">
                        <Col>
                            <Card style={{ width: '22rem' }}>
                                <Card.Body>
                                    <Card.Title>
                                        <Row>
                                            <Col>
                                                Ticket  #{cardInfo.id}
                                            </Col>

                                        </Row>

                                        <Row className="mt-2">
                                            <Col>
                                                {cardInfo.titulo}
                                            </Col>

                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <Col xs={5}>
                                                <h5>Cliente: </h5>
                                            </Col>
                                            <Col>
                                                {cardInfo.nombreCliente}
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col xs={5}>
                                                <h5>Severidad: </h5>
                                            </Col>
                                            <Col>
                                                {cardInfo.severidad}
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col xs={5}>
                                                <h5>Estado: </h5>
                                            </Col>
                                            <Col>
                                                {cardInfo.estado}
                                            </Col>

                                        </Row>
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => setShowTicketModal(true)}>TicketInfo</Button>

                                    {showTicketModal ? (
                                        <ModalInfoTicketEnCurso numeroTicket="1" onChangeshowTicketModal={onChangeshowTicketModal} />
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

                    </Row>
                ) : (
                    <Row className="row-cards">
                        <Col>
                            <Card style={{ width: '22rem' }}>
                                <Card.Body>
                                    <Card.Title>
                                        <Row>
                                            <Col>
                                                Ticket  #{cardInfo.id}
                                            </Col>

                                        </Row>

                                        <Row className="mt-2">
                                            <Col>
                                                {cardInfo.titulo}
                                            </Col>

                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        <Row>
                                            <Col xs={5}>
                                                <h5>Cliente: </h5>
                                            </Col>
                                            <Col>
                                                {cardInfo.nombreCliente}
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Col xs={5}>
                                                <h5>Severidad: </h5>
                                            </Col>
                                            <Col>
                                                {cardInfo.severidad}
                                            </Col>

                                        </Row>

                                    </Card.Text>
                                    <Button variant="primary" onClick={() => setShowTicketModal(true)}>TicketInfo</Button>

                                    {showTicketModal ? (
                                        <ModalTicketCerrado numeroTicket="1" onChangeshowTicketModal={onChangeshowTicketModal} />
                                    ) :
                                        (null
                                        )}

                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                )}

            </Container>



        </Fragment >
    );

}
export default TicketsEnCurso