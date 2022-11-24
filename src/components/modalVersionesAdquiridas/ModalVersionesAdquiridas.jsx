import React, { useState } from 'react';
import styles from "./modalVersionesAdquiridas.css";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import SpacerLine from '../spacerLine/spacerLine';
import Container from 'react-bootstrap/Container';
import ModalAsociarVersion from '../modalAsociarVersion/ModalAsociarVersion';

function ModalVersionesAdquiridas() {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" size="sm" onClick={handleShow}>Gestionar</Button>
            <Modal dialogClassName="modalContent1" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Gestion de versiones adquiridas: </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row>
                        <Col className="v-center" sm={2}><h6>Filtros:</h6></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" placeholder="Version_ID" /></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" placeholder="Version" /></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" placeholder="Estado" /></Col>
                        <Col className="v-center"><Button variant="secondary" size="1">Aplicar</Button></Col>
                        <Col className="v-center"><ModalAsociarVersion/></Col>
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
                                            <Col sm={2}><Button variant="danger" size="sm">Quitar</Button></Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td>2.0.0</td>
                                    <td>Activa</td>
                                    <td>
                                        <Row>
                                            <Col sm={2}><Button variant="danger" size="sm">Quitar</Button></Col>
                                        </Row>
                                    </td>
                                </tr>
                                <tr>
                                    <td>03</td>
                                    <td>3.0.0</td>
                                    <td>Activa</td>
                                    <td>
                                        <Row>
                                            <Col sm={2}><Button variant="danger" size="sm">Quitar</Button></Col>
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

export default ModalVersionesAdquiridas;