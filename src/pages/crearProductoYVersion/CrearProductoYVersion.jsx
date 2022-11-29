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
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import NavbarSoporte from "../../components/navbarSoporte/NavbarSoporte";

const CrearProductoYVersion = () => {

    const FiltroVacios = {
        "nombre": "",
        "estado": "Cualquiera"
    };

    const SERVER_NAME = "http://localhost:3000";
    const [productos, setProductos] = useState([]);
    const [filtroTexto, setFiltroTexto] = useState(FiltroVacios);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [filtrado, setFiltrado] = useState(false);

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

    const handleDropdownChange = (e) => {
        setFiltroTexto({ ...filtroTexto, [e.target.name]: e.target.innerHTML });
    };

    const onChangeFiltroTexto = async (e) => {
        setFiltroTexto({ ...filtroTexto, [e.target.name]: e.target.value });
    }

    const handleBotonFiltrado = async () => {
        setProductosFiltrados(productos);
        if (filtroTexto.estado === "Cualquiera") {
            if (filtroTexto.nombre === "") {
                return
            }
            else {
                setProductosFiltrados(productos.filter(obj => { return obj.nombre === filtroTexto.nombre }))
            }
        }
        else {
            if (filtroTexto.nombre === "") {
                setProductosFiltrados(productos.filter(obj => { return obj.estado === filtroTexto.estado }))
            }
            else {
                setProductosFiltrados(productos.filter(obj => { return obj.nombre === filtroTexto.nombre & obj.estado === filtroTexto.estado }))
            }
        }
        setFiltrado(true)
    }

    const handleBotonQuitarFiltrado = async (e) => {
        setFiltrado(false);
    }

    useEffect(() => {
        getProductos();
    }, [])


    return (
        <Fragment>
            <NavbarSoporte />

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
                        <Col className="v-center" sm={1}><h6>Buscar:</h6></Col>
                        <Col className="v-center" sm={4}><Form.Control name="nombre" type="filtro" placeholder="Nombre de producto" onChange={(e) => onChangeFiltroTexto(e)} /></Col>
                        <Col className="v-center" sm={2}>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="1">
                                    {filtroTexto.estado ? filtroTexto.estado : "Cualquiera"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Cualquiera</Dropdown.Item>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Activo</Dropdown.Item>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Deprecado</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></Col>
                        {filtrado ? (
                            <Col className="v-center"><Button variant="secondary" size="1" onClick={handleBotonQuitarFiltrado}>Remover busqueda</Button></Col>
                        ) : (
                            <Col className="v-center"><Button variant="secondary" size="1" onClick={handleBotonFiltrado}>Buscar</Button></Col>
                        )}
                        <Col className="v-center" sm={3}><ModalProductoNuevo /></Col>
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
                            {filtrado ? (
                                productosFiltrados.length > 0 ? productosFiltrados.sort((a, b) => a.id > b.id ? 1 : -1).map((producto) => (
                                    producto.estado === "Activo" ? (
                                        <tr>
                                            <td>{producto.id}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.estado}</td>
                                            <td>
                                                <ModalGestionVersion producto={producto} />
                                            </td>
                                            <td>
                                                <Row>
                                                    <Col sm={4}><ModalEditarProducto producto={producto} /></Col>
                                                    <Col sm={4}><BotonDeprecarProducto producto={producto}></BotonDeprecarProducto></Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    ) : (
                                        <tr>
                                            <td>{producto.id}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.estado}</td>
                                            <td>
                                                <ModalGestionVersion producto={producto} />
                                            </td>
                                            <td>
                                                <Row>
                                                    <Col sm={3}><ModalEditarProducto producto={producto} /></Col>
                                                    <Col sm={3}><BotonActivarProducto producto={producto}></BotonActivarProducto></Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    )
                                )) : <Row className="centered">No se encontraron productos para los filtros dados</Row>
                            ) : (
                                productos.length > 0 ? productos.sort((a, b) => a.id > b.id ? 1 : -1).map((producto) => (
                                    producto.estado === "Activo" ? (
                                        <tr>
                                            <td>{producto.id}</td>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.estado}</td>
                                            <td>
                                                <ModalGestionVersion producto={producto} />
                                            </td>
                                            <td>
                                                <Row>
                                                    <Col sm={3}><ModalEditarProducto producto={producto} /></Col>
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
                                                <ModalGestionVersion producto={producto} />
                                            </td>
                                            <td>
                                                <Row>
                                                    <Col sm={3}><ModalEditarProducto producto={producto} /></Col>
                                                    <Col sm={3}><BotonActivarProducto producto={producto}></BotonActivarProducto></Col>
                                                </Row>
                                            </td>
                                        </tr>
                                    )
                                )) : <Row className="centered">No existen productos</Row>
                            )}

                        </tbody>
                    </Table>
                </Row>
            </Container>
        </Fragment >
    );

}

export default CrearProductoYVersion