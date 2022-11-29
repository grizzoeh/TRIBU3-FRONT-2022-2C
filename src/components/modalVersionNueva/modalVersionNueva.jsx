import React, { useState } from 'react';
import "./modalVersionNueva.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import Dropdown from 'react-bootstrap/Dropdown';
import { SERVER_NAME_SOPORTE } from "../../environment";


function ModalVersionNueva(idProducto) {

    const VersionNula = {
        "nombre": null,
        "idProducto": idProducto.idProducto,
        "estado": null,
        "fechaRelease": null,
        "fechaDeprecacion": null
    }

    const [VersionData, setVersionData] = useState(VersionNula);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const onChangeVersionEditable = (e) => {
        setVersionData({ ...VersionData, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {
        setVersionData({ ...VersionData, [e.target.name]: e.target.innerHTML });
    }

    const crearVersion = async () => {
        axios.post(SERVER_NAME_SOPORTE + "/versiones", VersionData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Version creada");
                    window.location.reload();
                    handleClose();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
                        <Col><Form.Control name="nombre" type="filtro" placeholder="Nombre de la version" onChange={(e) => onChangeVersionEditable(e)} /></Col>
                    </Row>
                    <Row className="campo">
                        <Col><h6>Fecha Release:</h6></Col>
                        <Col><Form.Control name="fechaRelease" type="date" placeholder="Fecha de lanzamiento" onChange={(e) => onChangeVersionEditable(e)} /></Col>
                    </Row>
                    <Row className="campo">
                        <Col><h6>Estado de la version:</h6></Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {VersionData.estado ? VersionData.estado : "Seleccionar"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Activa</Dropdown.Item>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Deprecada</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={crearVersion}>Crear Version</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalVersionNueva;