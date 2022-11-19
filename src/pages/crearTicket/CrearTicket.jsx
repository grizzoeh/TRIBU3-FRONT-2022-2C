import React, { Fragment, useState } from "react";
import "./crearTicket.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ModalCreacionTicket from "../../components/modalCreacionTicket/ModalCreacionTicket";

const CrearTicket = () => {



    return (
        <Fragment>



            <Container className="container-title">

                <Row>
                    <Col >
                        <h1>Creacion de Ticket</h1>
                    </Col>


                </Row>

            </Container>


            <Container className="container-cards">

                <ModalCreacionTicket />

            </Container>



        </Fragment>
    );

}
export default CrearTicket