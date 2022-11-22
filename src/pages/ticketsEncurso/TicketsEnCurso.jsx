import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ticketsEnCurso.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalInfoTicketEnCurso from "../../components/modalInfoTicketEnCurso/ModalInfoTicketEnCurso";

const TicketsEnCurso = () => {

    const [showTicketModal, setShowTicketModal] = useState(false);

    const onChangeshowTicketModal = (newSomeState) => {
        setShowTicketModal(newSomeState);
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
                    <Col >
                        <h1>Tickets en Curso</h1>
                    </Col>


                </Row>

            </Container>


            <Container className="container-cards">

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
                    </Col>
                    <Col>
                        <Card style={{ width: '22rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '22rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="row-cards">
                    <Col>
                        <Card style={{ width: '22rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '22rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: '22rem' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

            </Container>



        </Fragment >
    );

}
export default TicketsEnCurso