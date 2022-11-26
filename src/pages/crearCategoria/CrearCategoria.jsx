import React, { Fragment, useState } from "react";
import "./crearCategoria.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalCreacionCategoria from "../../components/modalCreacionCategorias/ModalCreacionCategorias";

const CreacionCategoria = () => {



    return (
        <Fragment>

            <Container className="container-title">

                <h2>Crear Categorias</h2>

            </Container>

            <Container className="container-cards">
                <ModalCreacionCategoria />

            </Container>



        </Fragment>
    );

}
export default CreacionCategoria