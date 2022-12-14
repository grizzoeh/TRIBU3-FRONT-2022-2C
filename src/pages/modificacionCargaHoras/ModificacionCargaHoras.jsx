import React, { Fragment, useState } from "react";
import "./ModificacionCargaHoras.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalModificacionCargaHoras from "../../components/modalModificacionCargaHoras/ModalModificacionCargaHoras";
import NavbarRecursos from "../../components/navbarRecursos/NavbarRecursos";

const ModificacionCargaDeHoras = () => {



    return (
        <Fragment>

            <NavbarRecursos />            

            <Container className="container-title">

                <Row>
                    <Col>
                        <h2>Modificar carga de horas</h2>
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