import React, { useState } from 'react';
import "./modalProductoNuevo.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ModalProductoNuevo() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>+ Nuevo Producto</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear un nuevo producto: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Nombre de producto:</h6></Col>
                        <Col><Form.Control type="filtro" placeholder="Nombre de producto" /></Col>
                    </Row>
                    <Row className="campo">
                        <Col><h6>Version inicial del producto:</h6></Col>
                        <Col><Form.Control type="filtro" placeholder="Version inicial del producto" /></Col>
                    </Row>  
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={handleClose}>Crear Producto</Button>

                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalProductoNuevo;