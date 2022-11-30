import React, { Fragment, useState } from "react";
import "./CargaDeHorasProyecto.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalCreacionCargaHorasProyecto from "../../components/modalCreacionCargaHorasProyecto/ModalCreacionCargaHorasProyecto";

const CargaDeHorasProyecto = () => {



    return (
        <Fragment>

            <Container className="container-cards">

                <ModalCreacionCargaHorasProyecto />

            </Container>



        </Fragment>
    );

}
export default CargaDeHorasProyecto