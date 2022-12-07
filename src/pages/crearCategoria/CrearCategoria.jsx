import React, { Fragment, useState } from "react";
import "./crearCategoria.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalCreacionCategoria from "../../components/modalCreacionCategorias/ModalCreacionCategorias";
import NavbarRecursos from "../../components/navbarRecursos/NavbarRecursos";

const CreacionCategoria = () => {



    return (
        <Fragment>

            <NavbarRecursos />

            <Container className="container-cards">

                <h1>Crear Categoria</h1>

                <ModalCreacionCategoria />

            </Container>



        </Fragment>
    );

}
export default CreacionCategoria