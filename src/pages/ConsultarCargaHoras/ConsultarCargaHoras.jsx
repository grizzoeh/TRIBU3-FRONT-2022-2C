import React, { Fragment, useState } from "react";
import "./ConsultarCargaHoras.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalInformacionCargaHoras from "../../components/modalInformacionCargaHoras/ModalInformacionCargaHoras";

const InformacionCargaDeHoras = () => {

    return (
        <Fragment>



            <Container className="container-title">

                <Row>
                    <Col >
                        <h1>Consultar carga</h1>
                    </Col>


                </Row>

            </Container>


            <Container className="container-cards">

                <ModalInformacionCargaHoras />

            </Container>



        </Fragment>
    );

}
export default InformacionCargaDeHoras