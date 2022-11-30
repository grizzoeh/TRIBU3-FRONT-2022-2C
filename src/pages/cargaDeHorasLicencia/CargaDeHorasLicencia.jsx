import React, { Fragment, useState } from "react";
import "./CargaDeHorasLicencia.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalCreacionCargaHorasLicencia from "../../components/modalCreacionCargaHorasLicencia/ModalCreacionCargaHorasLicencia";

const CargaDeHorasLicencia = () => {



    return (
        <Fragment>

            <Container className="container-cards">

                <ModalCreacionCargaHorasLicencia />

            </Container>



        </Fragment>
    );

}
export default CargaDeHorasLicencia