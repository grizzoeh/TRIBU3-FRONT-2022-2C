import React, { Fragment, useEffect, useState } from "react";
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
import BotonDeprecarProducto from "../../components/botonDeprecarProducto/BotonDeprecarProducto";
import BotonActivarProducto from "../../components/botonActivarProducto/BotonActivarProducto";
import axios from "axios";

const CrearProductoYVersion = () => {

    const SERVER_NAME = "http://localhost:3000";
    const [productos, setProductos] = useState([]);


    useEffect(() => {
        const getProductos = async () => {
            axios
                .get(SERVER_NAME + "/productos/", {
                })
                .then((res) => {
                    setProductos(res.data.productos);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        getProductos();
    }, [])


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
                                <th>Estado</th>
                                <th>Versiones</th>
                                <th>Acciones</th>
                            </tr> 
                        </thead>
                        <tbody>
                            {productos.length > 0 ? productos.map((producto) => (
                                producto.estado == "Activo" ? (
                                <tr>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.estado}</td>
                                    <td>
                                        <ModalGestionVersion producto={producto}/>
                                    </td>
                                    <td>
                                        <Row>
                                            <Col sm={3}><ModalEditarProducto producto={producto}/></Col>
                                            <Col sm={3}><BotonDeprecarProducto producto={producto}></BotonDeprecarProducto></Col>
                                        </Row>
                                    </td>
                                </tr>
                                ) : (
                                <tr>
                                    <td>{producto.id}</td>
                                    <td>{producto.nombre}</td>
                                    <td>{producto.estado}</td>
                                    <td>
                                        <ModalGestionVersion producto ={producto}/>
                                    </td>
                                    <td>
                                        <Row>
                                            <Col sm={3}><ModalEditarProducto producto={producto}/></Col>
                                            <Col sm={3}><BotonActivarProducto producto={producto}></BotonActivarProducto></Col>
                                        </Row>
                                    </td>
                                </tr>          
                                )
                            )) : <Row className="centered">No existen productos</Row>}
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </Fragment >
    );

}

export default CrearProductoYVersion