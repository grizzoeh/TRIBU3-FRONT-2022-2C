import React, { Fragment, useState } from "react";
import "./ConsultarCargaHorasLegajo.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalInformacionCargaHorasPorLegajo from "../../components/modalInformacionCargaHorasPorLegajo/ModalInformacionCargaHorasPorLegajo";

const InformacionCargaDeHorasPorLegajo = () => {

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

                <ModalInformacionCargaHorasPorLegajo />

            </Container>



        </Fragment>
    );

}
export default InformacionCargaDeHorasPorLegajo