import React, { useState } from 'react';
import "./modalEditarProducto.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function ModalEditarProducto() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Col sm={2}><Button variant="secondary" size="sm" onClick={handleShow}>Editar</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Editar Producto [producto]: </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Nombre de producto:</h6></Col>
                        <Col><Form.Control type="filtro" placeholder="Nombre de Producto" /></Col>
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

export default ModalEditarProducto;