import React, { Fragment, useState } from "react";
import "./ConsultarReportes.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalInformacionReportes from "../../components/modalInformacionReportes/ModalInformacionReportes";
import NavbarRecursos from "../../components/navbarRecursos/NavbarRecursos";

const InformacionReportes = () => {

    return (
        <Fragment>

            <NavbarRecursos />

            <Container className="container-title">

                <Row>
                    <Col >
                        <h1>Consultar reportes</h1>
                    </Col>


                </Row>

            </Container>


            <Container className="container-cards">

                <ModalInformacionReportes />

            </Container>



        </Fragment>
    );

}
export default InformacionReportes