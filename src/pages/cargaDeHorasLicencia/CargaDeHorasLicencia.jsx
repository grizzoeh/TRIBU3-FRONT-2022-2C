import React, { Fragment, useState } from "react";
import "./CargaDeHorasLicencia.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalCreacionCargaHorasLicencia from "../../components/modalCreacionCargaHorasLicencia/ModalCreacionCargaHorasLicencia";
import NavbarRecursos from "../../components/navbarRecursos/NavbarRecursos";

const CargaDeHorasLicencia = () => {



    return (
        <Fragment>

            <NavbarRecursos />

            <Container className="container-cards">

                <ModalCreacionCargaHorasLicencia />

            </Container>



        </Fragment>
    );

}
export default CargaDeHorasLicencia