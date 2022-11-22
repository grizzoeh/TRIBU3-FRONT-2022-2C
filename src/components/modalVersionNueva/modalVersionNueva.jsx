import React, { useState } from 'react';
import "./modalVersionNueva.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function ModalVersionNueva() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>+ Nueva version</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear nueva version: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Nombre de version:</h6></Col>
                        <Col><Form.Control type="filtro" placeholder="Nombre de la version" /></Col>
                    </Row> 
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={handleClose}>Crear Version</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalVersionNueva;