import React, { useState } from 'react';
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

function ModalGestionVersion(producto) {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="secondary" size="sm" onClick={handleShow}>Gestionar</Button>
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
                        <ModalVersionNueva className="h-end"/>
                    </Row>
                    <Container>
                        <SpacerLine color="black"></SpacerLine>
                    </Container>
                    <Row>
                        <Table productos>
                            <thead>
                                <tr>
                                    <th>Version_ID</th>
                                    <th>Version</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01</td>
                                    <td>1.0.0</td>
                                    <td>Activa</td>
                                    <td>
                                        <Row>
                                            <ModalEditarVersion/>
                                            <Col sm={2}><Button variant="danger" size="sm">Reprocar</Button></Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td>2.0.0</td>
                                    <td>Activa</td>
                                    <td>
                                        <Row>
                                            <ModalEditarVersion/>
                                            <Col sm={2}><Button variant="danger" size="sm">Reprocar</Button></Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td>03</td>
                                    <td>3.0.0</td>
                                    <td>Activa</td>
                                    <td>
                                        <Row>
                                            <ModalEditarVersion/>
                                            <Col sm={2}><Button variant="danger" size="sm">Reprocar</Button></Col>
                                        </Row>
                                    </td>
                                </tr>
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