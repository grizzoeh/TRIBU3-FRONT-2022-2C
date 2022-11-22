import React, { useState } from 'react';
import "./modalEditarVersion.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

function ModalEditarVersion() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Col sm={2}><Button variant="secondary" size="sm" onClick={handleShow}>Editar</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Editar Version [version]: </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Version:</h6></Col>
                        <Col><Form.Control type="filtro" placeholder="Version" /></Col>
                    </Row>
                    <Row className="campo">
                        <Col><h6>Estado:</h6></Col>
                        <Col><Form.Control type="filtro" placeholder="Estado" /></Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={handleClose}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )

}

export default ModalEditarVersion;