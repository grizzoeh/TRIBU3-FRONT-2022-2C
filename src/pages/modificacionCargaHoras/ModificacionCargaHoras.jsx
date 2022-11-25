import React, { Fragment, useState } from "react";
import "./ModificacionCargaHoras.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalModificacionCargaHoras from "../../components/modalModificacionCargaHoras/ModalModificacionCargaHoras";

const ModificacionCargaDeHoras = () => {



    return (
        <Fragment>



            <Container className="container-title">

                <Row>
                    <Col >
                        <h1>Test</h1>
                    </Col>


                </Row>

            </Container>


            <Container className="container-cards">

                <ModalModificacionCargaHoras />

            </Container>



        </Fragment>
    );

}
export default ModificacionCargaDeHoras