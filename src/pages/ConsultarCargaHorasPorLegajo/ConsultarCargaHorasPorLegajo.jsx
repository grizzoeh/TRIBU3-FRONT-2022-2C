import React, { Fragment, useState } from "react";
import "./ConsultarCargaHorasPorLegajo.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalInformacionCargaHorasPorLegajo from "../../components/modalInformacionCargaHorasPorLegajo/ModalInformacionCargaHorasPorLegajo";
import NavbarRecursos from "../../components/navbarRecursos/NavbarRecursos";

const InformacionCargaDeHorasPorLegajo = () => {

    return (
        <Fragment>

            <NavbarRecursos />

            <Container className="container-title">

                <Row>
                    <Col >
                        <h1>Consultar por legajo</h1>
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