import React, { useState } from 'react';
import "./modalEditarVersion.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function ModalEditarVersion(version) {
    
    const [nuevoNombre, setNuevoNombre] = useState(version["version"])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const SERVER_NAME = "http://localhost:3000";

    const modificarVersion = async () => {
        axios.patch(SERVER_NAME + "/versiones/version", nuevoNombre)
        .then((data) => {
            if (data.data.ok) {
                console.log("Version editado");
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const onChangeNuevoNombre = async (e) => {
        setNuevoNombre({ ...nuevoNombre, [e.target.name]: e.target.value });
    }

    const testing = async (e) => {
        console.log(nuevoNombre);
    }

    return (
        <>
            <Col sm={2}><Button variant="outline-primary" size="sm" onClick={handleShow}>Renombrar</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Editar Version [version]: </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Version:</h6></Col>
                        <Col><Form.Control name="nombre" type="filtro" value={nuevoNombre.nombre} onChange={(e) => onChangeNuevoNombre(e)}/></Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={modificarVersion}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
            
        </>
    )

}

export default ModalEditarVersion;