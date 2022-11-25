import React, { useState } from 'react';
import "./modalEditarProducto.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function ModalEditarProducto(producto) {
    
    const [nuevoNombre, setNuevoNombre] = useState(producto["producto"])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const SERVER_NAME = "http://localhost:3000";

    const onChangeNuevoNombre = async (e) => {
        setNuevoNombre({ ...nuevoNombre, [e.target.name]: e.target.value });
    }

    const modificarProducto = async () => {
        axios.patch(SERVER_NAME + "/productos/producto", nuevoNombre)
        .then((data) => {
            if (data.data.ok) {
                console.log("Producto editado");
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <Col><Button variant="outline-primary" size="sm" onClick={handleShow}>Renombrar</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Renombrar {producto["producto"].nombre}: </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Nuevo nombre:</h6></Col>
                        <Col><Form.Control name="nombre" type="filtro" value={nuevoNombre.nombre} onChange={(e) => onChangeNuevoNombre(e)}/></Col>
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