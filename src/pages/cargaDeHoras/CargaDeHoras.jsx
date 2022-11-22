import React, { Fragment, useState } from "react";
import "./CargaDeHoras.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalCreacionCargaHoras from "../../components/modalCreacionCargaHoras/ModalCreacionCargaHoras";

const CargaDeHoras = () => {



    return (
        <Fragment>



            <Container className="container-title">

                <Row>
                    <Col >
                        <h1>Cargar Horas</h1>
                    </Col>


                </Row>

            </Container>


            <Container className="container-cards">

                <ModalCreacionCargaHoras />

            </Container>



        </Fragment>
    );

}
export default CargaDeHoras