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
import { Snackbar } from "@mui/material";
import Alert from 'react-bootstrap/Alert';


function ModalVersionNueva({ idProducto, refreshVersiones, refreshFiltradas, refreshAlert, camposAlert}) {

    const VersionNula = {
        "nombre": null,
        "idProducto": idProducto,
        "estado": null,
        "fechaRelease": null,
        "fechaDeprecacion": null
    }

    const [VersionData, setVersionData] = useState(VersionNula);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setVersionData(VersionNula);
        setShow(true);
    }

    const vertical = "top"
    const horizontal = "center"
    const [showVersionError, setVersionError] = useState(false);
    const handleCloseVersionError = () => setVersionError(false);
    const handleShowVersionError = () => setVersionError(true);

    const onChangeVersionEditable = (e) => {
        setVersionData({ ...VersionData, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {
        setVersionData({ ...VersionData, [e.target.name]: e.target.innerHTML}); 
    }

    const crearVersion = async () => {
        const newVersion = {
            id: VersionData.id,
            nombre: VersionData.nombre,
            idProducto: VersionData.idProducto,
            estado: VersionData.estado,
            fechaRelease: VersionData.fechaRelease,
            fechaDeprecacion: VersionData.fechaDeprecacion
        }
        if (VersionData.nombre === null || VersionData.nombre === "" || VersionData.fechaRelease === null || VersionData.fechaRelease === "" || VersionData.estado === null || VersionData.estado === "" || VersionData.estado === "Seleccionar") {
            camposAlert();
        }
        else if ((VersionData.estado === "Deprecada") && (VersionData.fechaDeprecacion === null || VersionData.fechaDeprecacion === "")) {
            camposAlert();
        }
        else {
            axios.post(SERVER_NAME_SOPORTE + "/versiones", VersionData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Version creada");
                    refreshVersiones();
                    refreshFiltradas();
                    refreshAlert()
                    handleClose();
                }
            })
            .catch((error) => {
                handleShowVersionError();
                console.log(error);
            });       
        }
    }

    return (
        <>
            <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>✚ Nueva version</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <>
                    <Snackbar open={showVersionError} autoHideDuration={2000} onClose={handleCloseVersionError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert onClose={handleCloseVersionError} variant="danger" sx={{ width: '100%' }}>Error al crear version.</Alert>
                    </Snackbar>
                </>
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
                    {VersionData.estado === "Deprecada" ? (
                        <Row className="campo">
                            <Col className="v-center"><h6>Fecha deprecacion:</h6></Col>
                            <Col><Form.Control name="fechaDeprecacion" type="date" placeholder="Fecha de deprecacion" onChange={(e) => onChangeVersionEditable(e)} /></Col>
                        </Row>
                    ):(
                        <></>
                    )}
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