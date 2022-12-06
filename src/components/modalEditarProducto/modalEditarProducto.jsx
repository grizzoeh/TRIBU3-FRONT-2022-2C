import React, { useState } from 'react';
import "./modalEditarProducto.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import { Snackbar } from "@mui/material";
import Alert from 'react-bootstrap/Alert';
import { SERVER_NAME_SOPORTE } from "../../environment";


function ModalEditarProducto({producto, refreshProductos, refreshFiltradas, refreshAlert}) {

    const [nuevoNombre, setNuevoNombre] = useState(producto)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setNuevoNombre(producto);
        setShow(true);
    }
    
    const vertical = "top"
    const horizontal = "center"
    const [showCamposError, setCamposError] = useState(false);
    const handleCloseCamposError = () => setCamposError(false);
    const handleShowCamposError = () => setCamposError(true);

    const onChangeNuevoNombre = async (e) => {
        setNuevoNombre({ ...nuevoNombre, [e.target.name]: e.target.value });
    }

    const modificarProducto = async () => {
        if (nuevoNombre.nombre === "" || nuevoNombre.nombre === null) {
            handleShowCamposError();
        }
        else {
            axios.patch(SERVER_NAME_SOPORTE + "/productos/producto", nuevoNombre)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Producto editado");
                    refreshProductos();
                    refreshAlert();
                    handleClose();
                    if (refreshFiltradas) {
                        refreshFiltradas();
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }

    }

    return (
        <>
            <>
                <Snackbar open={showCamposError} autoHideDuration={2000} onClose={handleCloseCamposError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseCamposError} variant="danger" sx={{ width: '100%' }}>No puedes dejar campos vacios!</Alert>
                </Snackbar>
            </>
            <Col><Button variant="outline-primary" size="sm" onClick={handleShow}>Renombrar</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Renombrar {producto.nombre}: </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Nuevo nombre:</h6></Col>
                        <Col><Form.Control name="nombre" type="filtro" value={nuevoNombre.nombre} onChange={(e) => onChangeNuevoNombre(e)} /></Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={modificarProducto}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>

        </>
    )

}

export default ModalEditarProducto;