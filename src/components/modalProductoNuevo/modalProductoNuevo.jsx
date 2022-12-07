import React, { useState } from 'react';
import "./modalProductoNuevo.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";
import { Snackbar } from "@mui/material";
import Alert from 'react-bootstrap/Alert';

function ModalProductoNuevo({ refreshProductos, refreshFiltradas, refreshAlert }) {

    const ProductoNulo = {
        "nombre": null,
        "estado": null
    }

    const [ProductData, setProductData] = useState(ProductoNulo);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setProductData(ProductoNulo);
        setShow(true);
    }

    const vertical = "top"
    const horizontal = "center"
    const [showProductoError, setProductoError] = useState(false);

    const handleCloseProductoError = () => setProductoError(false);
    const handleShowProductoError = () => setProductoError(true);

    const [showCamposError, setCamposError] = useState(false);
    const handleCloseCamposError = () => setCamposError(false);
    const handleShowCamposError = () => setCamposError(true);


    const onChangeProductoEditable = (e) => {
        setProductData({ ...ProductData, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {
        setProductData({ ...ProductData, [e.target.name]: e.target.innerHTML });
    }

    const crearProducto = async () => {
        if (ProductData.nombre === null || ProductData.nombre === "" || ProductData.estado === null || ProductData.estado === "" || ProductData.estado === "Seleccionar") {
            handleShowCamposError()
        }
        else {
            axios.post(SERVER_NAME_SOPORTE + "/productos", ProductData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Producto creado");
                    refreshAlert();
                    refreshProductos();
                    refreshFiltradas();
                    handleClose();
                }
            })
            .catch((error) => {
                handleShowProductoError();
                console.log(error);
            });
        }
    }

    return (
        <>
            <>
                <Snackbar open={showProductoError} autoHideDuration={2000} onClose={handleCloseProductoError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseProductoError} variant="danger" sx={{ width: '100%' }}>Error al crear producto.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showCamposError} autoHideDuration={2000} onClose={handleCloseCamposError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseCamposError} variant="danger" sx={{ width: '100%' }}>No puedes dejar campos vacios!</Alert>
                </Snackbar>
            </>
            <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>✚ Nuevo Producto</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear un nuevo producto: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Nombre del producto:</h6></Col>
                        <Col><Form.Control name="nombre" type="filtro" placeholder="Nombre del producto" onChange={(e) => onChangeProductoEditable(e)} /></Col>
                    </Row>
                    <Row className="campo">
                        <Col><h6>Estado del producto:</h6></Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {ProductData.estado ? ProductData.estado : "Seleccionar"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Activo</Dropdown.Item>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Deprecado</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={crearProducto}>Crear Producto</Button>

                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalProductoNuevo;
