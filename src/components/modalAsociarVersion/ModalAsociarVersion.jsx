import React, { useState } from 'react';
import "./modalAsociarVersion.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function ModalAsociarVersion() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>Asociar version</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear un nuevo producto: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Version:</h6></Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button className="h-end" variant="primary" onClick={handleClose}>Agregar Version</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalAsociarVersion;