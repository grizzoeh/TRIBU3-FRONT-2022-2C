import React, { useEffect, useState, version } from 'react';
import "./modalGestionVersion.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import ModalVersionNueva from '../modalVersionNueva/modalVersionNueva';
import SpacerLine from '../spacerLine/spacerLine';
import Container from 'react-bootstrap/Container';
import ModalEditarVersion from '../modalEditarVersion/modalEditarVersion';
import BotonDeprecarVersion from '../botonDeprecarVersion/BotonDeprecarVersion';
import axios from "axios";
import BotonActivarVersion from '../botonActivarVersion/BotonActivarVersion';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Snackbar } from "@mui/material";
import Alert from 'react-bootstrap/Alert';
import { SERVER_NAME_SOPORTE } from "../../environment";


function ModalGestionVersion(producto) {

    const FiltroVacios = {
        "nombre": "",
        "estado": "Cualquiera",
    };

    const [show, setShow] = useState(false);
    const [filtroTexto, setFiltroTexto] = useState(FiltroVacios);
    const [filtrado, setFiltrado] = useState(false);
    const [versiones, setVersiones] = useState([]);
    const [versionesFiltradas, setVersionesFiltradas] = useState([]);
    const [checked, setChecked] = useState(false);

    const vertical = "top"
    const horizontal = "center"

    const [showBusquedaError, setShowBusquedaError] = useState(false);
    const [showBusquedaOk, setShowBusquedaOk] = useState(false);
    const [showVersionCreadoOK, setVersionCreadoOK] = useState(false);
    const [showVersionEditadoOK, setVersionEditadoOK] = useState(false);
    const [showVersionDeprecadoOK, setVersionDeprecadoOK] = useState(false);
    const [showVersionActivadoOK, setVersionActivadoOK] = useState(false);
    const handleCloseVersionActivadoOK = () => setVersionActivadoOK(false);
    const handleShowVersionActivadoOK = () => setVersionActivadoOK(true);
    const handleCloseVersionDeprecadoOK = () => setVersionDeprecadoOK(false);
    const handleShowVersionDeprecadoOK = () => setVersionDeprecadoOK(true);
    const handleCloseVersionEditadoOK = () => setVersionEditadoOK(false);
    const handleShowVersionEditadoOK = () => setVersionEditadoOK(true);
    const handleCloseVersionCreadoOK = () => setVersionCreadoOK(false);
    const handleShowVersionCreadoOK = () => setVersionCreadoOK(true);
    const handleCloseBusquedaOk = () => setShowBusquedaOk(false);
    const handleShowBusquedaOk = () => setShowBusquedaOk(true);
    const handleCloseBusquedaError = () => setShowBusquedaError(false);
    const handleShowBusquedaError = () => setShowBusquedaError(true);



    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        setFiltrado(false);
        setFiltroTexto(FiltroVacios)
    }


    const getVersiones = async () => {
        const sendData = { idProducto: producto["producto"].id }
        axios
            .get(SERVER_NAME_SOPORTE + "/versiones/producto", { params: sendData })
            .then((res) => {
                setVersiones(res.data.versiones);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleDropdownChange = (e) => {
        setFiltroTexto({ ...filtroTexto, [e.target.name]: e.target.innerHTML });
    };

    const onChangeFiltroTexto = async (e) => {
        setFiltroTexto({ ...filtroTexto, [e.target.name]: e.target.value });
    }

    const handleBotonFiltrado = async () => {
        setVersionesFiltradas(versiones);
        if (filtroTexto.estado == "Cualquiera") {
            if (filtroTexto.nombre == "") {
                handleShowBusquedaError();
                return;
            }
            else {
                setVersionesFiltradas(versiones.filter(obj => { return obj.nombre === filtroTexto.nombre }))
            }
        }
        else {
            if (filtroTexto.nombre == "") {
                setVersionesFiltradas(versiones.filter(obj => { return obj.estado === filtroTexto.estado }))
            }
            else {
                setVersionesFiltradas(versiones.filter(obj => { return obj.nombre === filtroTexto.nombre & obj.estado === filtroTexto.estado }))
            }
        }
        handleShowBusquedaOk();
        setFiltrado(true)
    }

    const handleBotonQuitarFiltrado = async (e) => {
        setFiltrado(false);
    }

    useEffect(() => {
        getVersiones();
    }, [])

    return (
        <>
            <>
                <Snackbar open={showBusquedaOk} autoHideDuration={1500} onClose={handleCloseBusquedaOk} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseBusquedaOk} variant="info" sx={{ width: '100%' }}>Busqueda realizada con exito.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showBusquedaError} autoHideDuration={2000} onClose={handleCloseBusquedaError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseBusquedaError} variant="danger" sx={{ width: '100%' }}>Error: primero se debe ingresar al menos un parametro de busqueda.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showVersionCreadoOK} autoHideDuration={1500} onClose={handleCloseVersionCreadoOK} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseVersionCreadoOK} variant="success" sx={{ width: '100%' }}>Version creada con exito.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showVersionEditadoOK} autoHideDuration={1500} onClose={handleCloseVersionEditadoOK} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseVersionEditadoOK} variant="success" sx={{ width: '100%' }}>Version editada con exito.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showVersionDeprecadoOK} autoHideDuration={1500} onClose={handleCloseVersionDeprecadoOK} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseVersionDeprecadoOK} variant="success" sx={{ width: '100%' }}>Version deprecada con exito.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showVersionActivadoOK} autoHideDuration={1500} onClose={handleCloseVersionActivadoOK} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseVersionActivadoOK} variant="success" sx={{ width: '100%' }}>Version activada con exito.</Alert>
                </Snackbar>
            </>
            <Button variant="outline-primary" size="sm" onClick={handleShow}>Gestionar</Button>
            <Modal dialogClassName="modalContent1" show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Gestion de versiones de {producto["producto"].nombre}: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="v-center" md="auto"><h6>Buscar:</h6></Col>
                        <Col className="v-center" sm={4}><Form.Control name="nombre" type="filtro" placeholder="Version" onChange={(e) => onChangeFiltroTexto(e)} /></Col>
                        <Col className="v-center" md="auto" >
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="1">
                                    {filtroTexto.estado ? filtroTexto.estado : "Cualquiera"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Cualquiera</Dropdown.Item>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Activa</Dropdown.Item>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Deprecada</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown></Col>
                        {filtrado ? (
                            <Col md="auto" className="v-center"><Button variant="secondary" size="1" onClick={handleBotonQuitarFiltrado}>Remover busqueda</Button></Col>
                        ) : (
                            <Col md="auto" className="v-center"><Button variant="secondary" size="1" onClick={handleBotonFiltrado}>Buscar</Button></Col>
                        )}
                        {producto["producto"].estado === "Deprecado" ? (
                            <Col className="v-center"><Button variant="primary" size="1" disabled={true}>+ Nueva version</Button></Col>
                        ) : (
                            <Col className="v-center" sm={3}><ModalVersionNueva className="h-end" idProducto={producto["producto"].id} refreshVersiones={getVersiones} refreshFiltradas={handleBotonQuitarFiltrado} refreshAlert={handleShowVersionCreadoOK} /></Col>
                        )}

                    </Row>
                    <Row>
                        <Table versiones>
                            <thead>
                                <tr>
                                    <th>Version_ID</th>
                                    <th>Version</th>
                                    <th>Estado</th>
                                    <th>Fecha Release</th>
                                    <th>Fecha Deprecacion</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtrado ? (
                                    versionesFiltradas.length > 0 ? versionesFiltradas.sort((a, b) => a.id > b.id ? 1 : -1).map((version) => (
                                        version.estado == "Activa" ? (
                                            <tr>
                                                <td>{version.id}</td>
                                                <td>{version.nombre}</td>
                                                <td>{version.estado}</td>
                                                <td>{version.fechaRelease.slice(0, 10)}</td>
                                                <td>-</td>
                                                <td>
                                                    <Row>
                                                        <Col sm={4}><ModalEditarVersion version={version} refreshVersiones={getVersiones} refreshFiltradas={handleBotonQuitarFiltrado} refreshAlert={handleShowVersionEditadoOK} /></Col>
                                                        <Col sm={3}><BotonDeprecarVersion version={version} refreshVersiones={getVersiones} refreshFiltradas={handleBotonQuitarFiltrado} refreshAlert={handleShowVersionDeprecadoOK}></BotonDeprecarVersion></Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td>{version.id}</td>
                                                <td>{version.nombre}</td>
                                                <td>{version.estado}</td>
                                                <td>{version.fechaRelease.slice(0, 10)}</td>
                                                <td>{version.fechaDeprecacion.slice(0, 10)}</td>
                                                <td>
                                                    <Row>
                                                        <Col sm={4}><ModalEditarVersion version={version} refreshVersiones={getVersiones} refreshFiltradas={handleBotonQuitarFiltrado} refreshAlert={handleShowVersionEditadoOK} /></Col>
                                                        <Col sm={2}><BotonActivarVersion version={version} refreshVersiones={getVersiones} refreshFiltradas={handleBotonQuitarFiltrado} refreshAlert={handleShowVersionActivadoOK}></BotonActivarVersion></Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        )
                                    )) : <Row className="centered">No se encontraron versiones para los filtros dados</Row>
                                ) : (
                                    versiones.length > 0 ? versiones.sort((a, b) => a.id > b.id ? 1 : -1).map((version) => (
                                        version.estado == "Activa" ? (
                                            <tr>
                                                <td>{version.id}</td>
                                                <td>{version.nombre}</td>
                                                <td>{version.estado}</td>
                                                <td>{version.fechaRelease.slice(0, 10)}</td>
                                                <td>-</td>
                                                <td>
                                                    <Row>
                                                        <Col sm={4}><ModalEditarVersion version={version} refreshVersiones={getVersiones} refreshAlert={handleShowVersionEditadoOK} /></Col>
                                                        <Col sm={3}><BotonDeprecarVersion version={version} refreshVersiones={getVersiones} refreshAlert={handleShowVersionDeprecadoOK}></BotonDeprecarVersion></Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        ) : (
                                            <tr>
                                                <td>{version.id}</td>
                                                <td>{version.nombre}</td>
                                                <td>{version.estado}</td>
                                                <td>{version.fechaRelease.slice(0, 10)}</td>
                                                <td>{version.fechaDeprecacion.slice(0, 10)}</td>
                                                <td>
                                                    <Row>
                                                        <Col sm={4}><ModalEditarVersion version={version} refreshVersiones={getVersiones} refreshAlert={handleShowVersionEditadoOK} /></Col>
                                                        <Col sm={2}><BotonActivarVersion version={version} refreshVersiones={getVersiones} refreshAlert={handleShowVersionActivadoOK}></BotonActivarVersion></Col>
                                                    </Row>
                                                </td>
                                            </tr>
                                        )
                                    )) : <Row className="centered">No existen versiones</Row>
                                )}

                            </tbody>
                        </Table>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalGestionVersion;