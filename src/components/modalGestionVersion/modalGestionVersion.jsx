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

function ModalGestionVersion(producto) {
    
    const SERVER_NAME = "http://localhost:3000";
    const [show, setShow] = useState(false);
    const [versiones, setVersiones] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
        const getVersiones = async () => {
            const sendData = {idProducto:producto["producto"].id}
            axios
                .get(SERVER_NAME + "/versiones/producto", {params:sendData})
                .then((res) => {
                    setVersiones(res.data.versiones);
    
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        getVersiones();
    }, [])

    return (
        <>
            <Button variant="outline-primary" size="sm" onClick={handleShow}>Gestionar</Button>
            <Modal dialogClassName="modalContent1" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Gestion de versiones de {producto["producto"].nombre}: </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col className="v-center" sm={1}><h6>Filtros:</h6></Col>
                        <Col className="v-center" sm={2}><Form.Control type="filtro" placeholder="Version_ID" /></Col>
                        <Col className="v-center" sm={2}><Form.Control type="filtro" placeholder="Version" /></Col>
                        <Col className="v-center" sm={2}><Form.Control type="filtro" placeholder="Estado" /></Col>
                        <Col className="v-center"><Button variant="secondary" size="1">Aplicar</Button></Col>
                        <ModalVersionNueva className="h-end" idProducto={producto["producto"].id}/>
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
                                {versiones.length > 0 ? versiones.map((version) => (
                                    version.estado == "Activa" ? (
                                    <tr>
                                        <td>{version.id}</td>
                                        <td>{version.nombre}</td>
                                        <td>{version.estado}</td>
                                        <td>{version.fechaRelease.slice(0, 10)}</td>
                                        <td>-</td>
                                        <td>
                                            <Row>
                                                <Col sm={4}><ModalEditarVersion version={version}/></Col>
                                                <Col sm={3}><BotonDeprecarVersion version={version}></BotonDeprecarVersion></Col>
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
                                                <Col sm={4}><ModalEditarVersion version={version}/></Col>
                                                <Col sm={2}><BotonActivarVersion version={version}></BotonActivarVersion></Col>
                                            </Row>
                                        </td>
                                    </tr>
                                    )
                                )) : <Row className="centered">No existen versiones</Row>}
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