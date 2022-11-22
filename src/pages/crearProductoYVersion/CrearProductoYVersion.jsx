import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./crearProductoYVersion.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SpacerLine from "../../components/spacerLine/spacerLine";
import Col from 'react-bootstrap/Col';
import ModalProductoNuevo from "../../components/modalProductoNuevo/modalProductoNuevo";
import ModalGestionVersion from "../../components/modalGestionVersion/modalGestionVersion";
import ModalEditarProducto from "../../components/modalEditarProducto/modalEditarProducto";

const CrearProductoYVersion = () => {

    return (
        <Fragment>

            <Container className="container-title">
                <Row>
                    <h1>Productos y versiones:</h1>
                </Row>
            </Container>

            <Container className="spacer-line">
                <SpacerLine className="spacer-line" color="black"></SpacerLine>
            </Container>

            <Container className="filtros-tabla">
                <Form>
                    <Row>
                        <Col className="v-center" sm={1}><h6>Filtros:</h6></Col>
                        <Col className="v-center" sm={2}><Form.Control type="filtro" placeholder="Product ID" /></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" placeholder="Nombre de producto" /></Col>
                        <Col className="v-center"><Button variant="secondary" size="1">Aplicar</Button></Col>
                        <ModalProductoNuevo />
                    </Row>
                </Form>
            </Container>

            <Container className="tabla-productos">
                <Row>
                    <Table productos>
                        <thead>
                            <tr>
                                <th>Product_ID</th>
                                <th>Nombre del Producto</th>
                                <th>Versiones</th>
                                <th>Acciones</th>
                            </tr> 
                        </thead>
                        <tbody>

                            <tr>
                                <td>1</td>
                                <td>PsaGestiones</td>
                                <td>
                                    <ModalGestionVersion />
                                </td>
                                <td>
                                    <Row>
                                        <ModalEditarProducto/>
                                        <Col sm={2}><Button variant="danger" size="sm">Deprecar</Button></Col>
                                    </Row>
                                </td>
                            </tr>

                            <tr>
                                <td>2</td>
                                <td>PsaCalculator</td>
                                <td>
                                    <ModalGestionVersion />
                                </td>
                                <td>
                                    <Row>
                                        <ModalEditarProducto/>
                                        <Col sm={2}><Button variant="danger" size="sm">Deprecar</Button></Col>
                                    </Row>
                                </td>
                            </tr>

                            


                        </tbody>
                    </Table>
                </Row>
            </Container>
        </Fragment >
    );

}

export default CrearProductoYVersion