import React, { useEffect, useState } from 'react';
import "./modalVersionesAdquiridas.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ModalAsociarVersion from '../modalAsociarVersion/ModalAsociarVersion';
import BotonQuitarCompra from '../botonQuitarCompra/BotonQuitarCompra';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";
import { Snackbar } from "@mui/material";
import Alert from 'react-bootstrap/Alert';


function ModalVersionesAdquiridas(cliente) {

    const FiltroVacios = {
        "version": "",
        "producto": "",
    };

    const [show, setShow] = useState(false);
    const [compras, setCompras] = useState([]);
    const [versiones, setVersiones] = useState([]);
    const [productos, setProductos] = useState([]);
    const [comprasFiltradas, setComprasFiltradas] = useState([]);
    const [filtrado, setFiltrado] = useState(false);
    const [filtroTexto, setFiltroTexto] = useState(FiltroVacios);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const vertical = "top"
    const horizontal = "center"

    const [showBusquedaError, setShowBusquedaError] = useState(false);
    const [showBusquedaOk, setShowBusquedaOk] = useState(false);
    const [showEliminar, setShowEliminar] = useState(false);
    const handleCloseBusquedaOk = () => setShowBusquedaOk(false);
    const handleShowBusquedaOk = () => setShowBusquedaOk(true);
    const handleCloseBusquedaError = () => setShowBusquedaError(false);
    const handleShowBusquedaError = () => setShowBusquedaError(true);
    const handleCloseEliminar = () => setShowEliminar(false);
    const handleShowEliminar = () => setShowEliminar(true);


    const handleBotonFiltrado = async () => {
        setComprasFiltradas(compras);
        if (filtroTexto.producto === "" & filtroTexto.version === "") {
            handleShowBusquedaError();
            return;
        }
        if (filtroTexto.producto === "" & filtroTexto.version !== "") {
            /* Busco Version */
            setComprasFiltradas(compras.filter(compra => { return versiones.find(version => version.id === compra.idVersion).nombre === filtroTexto.version }));
        }
        if (filtroTexto.producto !== "" & filtroTexto.version === "") {
            /* Busco Producto */
            setComprasFiltradas(compras.filter(compra => { return productos.find(producto => producto.id === compra.idProducto).nombre === filtroTexto.producto }));
        }
        if (filtroTexto.producto !== "" & filtroTexto.version !== "") {
            /* Busco Ambas */
            setComprasFiltradas(compras.filter(compra => { return productos.find(producto => producto.id === compra.idProducto).nombre === filtroTexto.producto & versiones.find(version => version.id === compra.idVersion).nombre === filtroTexto.version }));
        }
        handleShowBusquedaOk();
        setFiltrado(true);
    }

    const handleBotonQuitarFiltrado = async (e) => {
        setFiltrado(false);
    }

    const onChangeFiltroTexto = async (e) => {
        setFiltroTexto({ ...filtroTexto, [e.target.name]: e.target.value });
    }

    const getVersiones = async () => {
        axios
            .get(SERVER_NAME_SOPORTE + "/versiones/", {
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
            .get(SERVER_NAME_SOPORTE + "/productos/", {
            })
            .then((res) => {
                setProductos(res.data.productos);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const getCompras = async () => {
        const sendData = { idCliente: cliente["cliente"].id }
        axios
            .get(SERVER_NAME_SOPORTE + "/compras/compra/cliente", { params: sendData })
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
            <>
                <Snackbar open={showBusquedaOk} autoHideDuration={1500} onClose={handleCloseBusquedaOk} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseBusquedaOk} variant="info" sx={{ width: '100%' }}>Busqueda realizada con exito.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showBusquedaError} autoHideDuration={2000} onClose={handleCloseBusquedaError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseBusquedaError} variant="danger" sx={{ width: '100%' }}>Error: primero se debe ingresar al menos un parametro de busqueda.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showEliminar} autoHideDuration={1500} onClose={handleCloseEliminar} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseEliminar} variant="info" sx={{ width: '100%' }}>Compra eliminada con exito.</Alert>
                </Snackbar>
            </>
            <Button variant="outline-primary" size="sm" onClick={handleShow}>Gestionar</Button>
            <Modal dialogClassName="modalContent3" show={show} onHide={handleClose}>
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Gestion de versiones adquiridas: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="v-center" sm={1}><h6>Buscar:</h6></Col>
                        <Col className="v-center" sm={3}><Form.Control name="producto" type="filtro" placeholder="Producto" onChange={(e) => onChangeFiltroTexto(e)} /></Col>
                        <Col className="v-center" sm={3}><Form.Control name="version" type="filtro" placeholder="Version" onChange={(e) => onChangeFiltroTexto(e)} /></Col>
                        {filtrado ? (
                            <Col className="v-center"><Button variant="secondary" size="1" onClick={handleBotonQuitarFiltrado}>Remover busqueda</Button></Col>
                        ) : (
                            <Col className="v-center"><Button variant="secondary" size="1" onClick={handleBotonFiltrado}>Buscar</Button></Col>
                        )}
                        <Col><ModalAsociarVersion compras={compras} cliente={cliente["cliente"]} refreshCompras={getCompras}/></Col>
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
                                    comprasFiltradas.length > 0 ? comprasFiltradas.sort((a, b) => a.id > b.id ? 1 : -1).map((compra) => (
                                        <tr>
                                            <td>{compra.id}</td>
                                            <td>{productos.length > 0 ? (productos.find(producto => producto.id === compra.idProducto).nombre) : (<></>)}</td>
                                            <td>{versiones.length > 0 ? (versiones.find(version => version.id === compra.idVersion).nombre) : (<></>)}</td>
                                            <td>{compra.fechaCompra.slice(0, 10)}</td>
                                            <td><BotonQuitarCompra compra={compra} refreshCompras={getCompras} refreshAlert={handleShowEliminar}/></td>
                                        </tr>
                                    )) : <Row className="centered">No se encontraron compras para los filtros dados</Row>
                                ) : (
                                    compras.length > 0 ? compras.sort((a, b) => a.id > b.id ? 1 : -1).map((compra) => (
                                        <tr>
                                            <td>{compra.id}</td>
                                            <td>{productos.length > 0 ? (productos.find(producto => producto.id === compra.idProducto).nombre) : (<></>)}</td>
                                            <td>{versiones.length > 0 ? (versiones.find(version => version.id === compra.idVersion).nombre) : (<></>)}</td>
                                            <td>{compra.fechaCompra.slice(0, 10)}</td>
                                            <td><BotonQuitarCompra compra={compra} refreshCompras={getCompras} refreshAlert={handleShowEliminar}/></td>
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