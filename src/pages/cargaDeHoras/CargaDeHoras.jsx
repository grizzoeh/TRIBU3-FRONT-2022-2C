import React, { Fragment, useState } from "react";
import "./CargaDeHoras.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalCreacionCargaHoras from "../../components/modalCreacionCargaHoras/ModalCreacionCargaHoras";
import NavbarRecursos from "../../components/navbarRecursos/NavbarRecursos";

const CargaDeHoras = () => {



    return (
        <Fragment>


        <NavbarRecursos />

            <Container className="container-cards">
                <h1 id='titulo'>Carga tus horas</h1>
                <ModalCreacionCargaHoras />

            </Container>



        </Fragment>
    );

}
export default CargaDeHoras