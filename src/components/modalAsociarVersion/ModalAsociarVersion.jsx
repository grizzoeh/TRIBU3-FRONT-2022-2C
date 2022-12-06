import React, { useEffect, useState } from 'react';
import "./modalAsociarVersion.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";
import { Snackbar } from "@mui/material";
import Alert from 'react-bootstrap/Alert';
import { wait } from '@testing-library/user-event/dist/utils/misc/wait';

function ModalAsociarVersion({cliente, compras, refreshCompras, refreshFiltradas, refreshAlert, camposAlert}) {

    const NuevaCompraVacia = {
        "producto": "",
        "version": "",
        "idProducto": null,
        "idVersion": null,
    };


    const [show, setShow] = useState(false);
    const [versiones, setVersiones] = useState([]);
    const [productos, setProductos] = useState([]);
    const [nuevaCompra, setNuevaCompra] = useState(NuevaCompraVacia);
    const [versionesFiltradas, setVersionesFiltradas] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        nuevaCompra.producto = "";
        nuevaCompra.version = "";
        nuevaCompra.idProducto = null;
        nuevaCompra.idVersion = null; 
        setShow(true);
    }

    const vertical = "top"
    const horizontal = "center"

    const [showBusquedaError, setShowBusquedaError] = useState(false);
    const [showBusquedaOk, setShowBusquedaOk] = useState(false);
    const handleCloseBusquedaOk = () => setShowBusquedaOk(false);
    const handleShowBusquedaOk = () => setShowBusquedaOk(true);
    const handleCloseBusquedaError = () => setShowBusquedaError(false);
    const handleShowBusquedaError = () => setShowBusquedaError(true);

    const handleDropdownChange = (e, idProducto, idVersion) => {
        if (e.target.name === "producto") {
            setVersionesFiltradas(versiones.filter(obj => { return obj.idProducto === idProducto }))
            setNuevaCompra({ ...nuevaCompra, ["idProducto"]: idProducto, ["producto"]: e.target.innerHTML, ["idVersion"]: "", ["version"]: "" });
        }
        if (e.target.name === "version") {
            setNuevaCompra({ ...nuevaCompra, ["idVersion"]: idVersion, ["version"]: e.target.innerHTML });

        }
    };

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

    const crearCompra = async () => {
        var currentdate = new Date();
        if (nuevaCompra.idProducto === "" || nuevaCompra.idProducto === null || nuevaCompra.idProducto === "Seleccionar" || nuevaCompra.idVersion === "" || nuevaCompra.idVersion === null || nuevaCompra.idVersion === "Seleccionar") {
            camposAlert();
        }
        else {
            axios.post(SERVER_NAME_SOPORTE + "/compras", {
                "idProducto": nuevaCompra.idProducto,
                "idCliente": cliente.id,
                "idVersion": nuevaCompra.idVersion,
                "fechaCompra": currentdate
            })
                .then((data) => {
                    if (data.data.ok) {
                        console.log("Compra creada");
                        setNuevaCompra(NuevaCompraVacia)
                        handleShowBusquedaOk();
                        refreshCompras();
                        if (refreshFiltradas) {
                            refreshFiltradas();
                        }
                        refreshAlert();
                        handleClose();
                    }
                })
                .catch((error) => {
                    console.log(error);
                    handleShowBusquedaError();
                });
        }
    }

    useEffect(() => {
        getProductos();
        getVersiones();
    }, [])


    return (
        <>
            <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>Asociar version</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear un nuevo producto: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Snackbar className="alerta" open={showBusquedaError} autoHideDuration={1500} onClose={handleCloseBusquedaError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert className="alerta" show={showBusquedaError} onClose={handleCloseBusquedaError} variant="danger" sx={{ width: '100%' }}>Error al crear la compra.</Alert>
                    </Snackbar>
                    <Row className="campo">
                        <Col className="v-center"><h6>Producto:</h6></Col>
                        <Col className="v-center">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="1">
                                    {nuevaCompra.producto !== "" ? nuevaCompra.producto : "Seleccionar producto"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {productos.length > 0 ? productos.sort((a, b) => a.id > b.id ? 1 : -1).filter(producto => producto.estado === "Activo").map((producto) => (
                                        <Dropdown.Item name="producto" onClick={(e) => { handleDropdownChange(e, producto.id, null) }}>{producto.nombre}</Dropdown.Item>
                                    )) : <></>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <Row className="campo">
                        <Col className="v-center"><h6>Version:</h6></Col>
                        <Col className="v-center">
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="1">
                                    {nuevaCompra.version !== "" ? nuevaCompra.version : "Seleccionar version"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {versionesFiltradas.length > 0 ? versionesFiltradas.sort((a, b) => a.id > b.id ? 1 : -1).filter(version => version.estado === "Activa").map((version) => (
                                        compras.some(compra => compra.idVersion === version.id) ? (
                                            <></>
                                        ) : (
                                            <Dropdown.Item name="version" onClick={(e) => handleDropdownChange(e, null, version.id)}>{version.nombre}</Dropdown.Item>
                                        )
                                    )) : <></>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button className="h-end" variant="primary" onClick={crearCompra}>Agregar Version</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalAsociarVersion;