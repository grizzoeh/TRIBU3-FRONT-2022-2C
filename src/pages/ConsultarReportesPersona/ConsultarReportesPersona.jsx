import React, { Fragment, useState } from "react";
import "./ConsultarReportesPersona.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalInformacionReportesPersona from "../../components/modalInformacionReportesPersona/ModalInformacionReportesPersona";
import NavbarRecursos from "../../components/navbarRecursos/NavbarRecursos";

const InformacionReportesPersona = () => {

    return (
        <Fragment>

            <NavbarRecursos />

            <Container className="container-title">

                <Row>
                    <Col >
                        <h1>Consultar reportes por persona</h1>
                    </Col>


                </Row>

            </Container>


            <Container className="container-cards">

                <ModalInformacionReportesPersona />

            </Container>



        </Fragment>
    );

}
export default InformacionReportesPersona