import React, { Fragment, useState } from "react";
import "./eliminarCategoria.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalEliminarCategoria from "../../components/modalEliminacionCategorias/ModalEliminacionCategorias";
import NavbarRecursos from "../../components/navbarRecursos/NavbarRecursos";

const EliminarCategoria = () => {



    return (
        <Fragment>

            <NavbarRecursos />

            <Container className="container-cards">
                <ModalEliminarCategoria />

            </Container>



        </Fragment>
    );

}
export default EliminarCategoria