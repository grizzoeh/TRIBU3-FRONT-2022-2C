import React, { Fragment, useState } from "react";
import "./EliminarCargaHoras.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalEliminacionCargaHoras from "../../components/modalEliminacionCargaHoras/ModalEliminacionCargaHoras";

const EliminacionCargaDeHoras = () => {



    return (
        <Fragment>



            <Container className="container-title">

                <Row>
                    <Col>
                        <h2>Eliminar carga de horas</h2>
                    </Col>
                </Row>

            </Container>


            <Container className="container-cards">

                <ModalEliminacionCargaHoras />

            </Container>



        </Fragment>
    );

}
export default EliminacionCargaDeHoras