import React, { Fragment, useState } from "react";
import "./modificarCategoria.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalModificarCategoria from "../../components/modalModificarCategorias/ModalModificarCategorias";

const ModificarCategoria = () => {



    return (
        <Fragment>


            <Container className="container-cards">
                <ModalModificarCategoria />

            </Container>



        </Fragment>
    );

}
export default ModificarCategoria