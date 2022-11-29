import React, { useEffect, useState, version } from 'react';
import "./modalVersionesAdquiridas.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ModalAsociarVersion from '../modalAsociarVersion/ModalAsociarVersion';
import axios from "axios";

function ModalVersionesAdquiridas(cliente) {
    
    const FiltroVacios = {
        "version":"",
        "producto":"",
        "estado":"Cualquiera"
    };

    const [show, setShow] = useState(false);
    const [compras, setCompras] = useState([]);
    const [versiones, setVersiones] = useState([]);
    const [productos, setProductos] = useState([]);
    const [filtrado, setFiltrado] = useState(false);
    const [filtroTexto, setFiltroTexto] = useState(FiltroVacios);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const SERVER_NAME = "http://localhost:3000";
    const vertical = "top"
    const horizontal = "center"


    const testing = async () => {
        /*
        console.log("productos:", productos);
        console.log("versiones:", versiones);
        productos.find(producto => producto.id === compra.idProducto).nombre
        */
    }

    const getVersiones = async () => {
        axios
            .get(SERVER_NAME + "/versiones/", {
            })
            .then((res) => {
                setVersiones(res.data.versiones);
            })
            .catch((err) => {
                console.log(err);
            });
    }

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

    const getCompras= async () => {
        const sendData = {idCliente:cliente["cliente"].id}
        axios
            .get(SERVER_NAME + "/compras/compra/cliente", {params:sendData})
            .then((res) => {
                setCompras(res.data.compras);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getProductos();
        getVersiones();
        getCompras();
    }, [])

    return (
        <>
            <Button variant="outline-primary" size="sm" onClick={handleShow}>Gestionar</Button>
            <Modal dialogClassName="modalContent3" show={show} onHide={handleClose}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Gestion de versiones adquiridas: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="v-center" sm={1}><h6>Buscar:</h6></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" placeholder="Producto" /></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" placeholder="Version" /></Col>
                        <Col className="v-center"><Button variant="secondary" size="1">Buscar</Button></Col>
                        <Col><ModalAsociarVersion/></Col>
                    </Row>
                    <Row>
                        <Table compras>
                            <thead>
                                <tr>
                                    <th>ID_Compra</th>
                                    <th>Producto</th>
                                    <th>Version</th>
                                    <th>Fecha Compra</th>
                                    <th>Acciones</th>
                                </tr> 
                            </thead>
                            <tbody>
                            {filtrado ? (
                                compras.length > 0 ? compras.sort((a, b) => a.id > b.id ? 1 : -1).map((compra) => (
                                    <tr>
                                        <td>{compra.id}</td>
                                        <td>{compra.idProducto}</td>
                                        <td>{compra.idVersion}</td>
                                        <td>{compra.fechaCompra.slice(0, 10)}</td>
                                        <td><></></td>
                                    </tr>
                                    )) : <Row className="centered">No se encontraron compras para los filtros dados</Row>
                                ):(
                                compras.length > 0 ? compras.sort((a, b) => a.id > b.id ? 1 : -1).map((compra) => (
                                    <tr>
                                        <td>{compra.id}</td>
                                        <td>{productos.length > 0 ? (productos.find(producto => producto.id === compra.idProducto).nombre):(<></>)}</td>
                                        <td>{versiones.length > 0 ? (versiones.find(version => version.id === compra.idVersion).nombre):(<></>)}</td>
                                        <td>{compra.fechaCompra.slice(0, 10)}</td>
                                        <td><></></td>
                                    </tr>
                                )) : <Row className="centered">No se encontraron compras</Row>
                                )}
                            </tbody>
                        </Table>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalVersionesAdquiridas;