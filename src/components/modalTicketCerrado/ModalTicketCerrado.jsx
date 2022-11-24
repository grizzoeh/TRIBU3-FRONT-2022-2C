import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalTicketCerrado.css";
import Button2 from '@mui/material/Button';
import axios from "axios";
import Alert from "@mui/material/Alert";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';







const ModalTicketCerrado = ({ numeroTicket, onChangeshowTicketModalCerrado, data }) => {

    const TicketInfo = {
        "titulo": "Problema con el servidor",
        "criticidad": "Alta",
        "estado": "Cerrado",
        "fechaCreacion": "12/12/2021",
        "descripcion": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel",
        "nombreCliente": "Juan Perez",
        "medioContacto": "Mail",
        "correo": "hola@gmail.com",
        "nombreProducto": "PsaNeitor 3000",
        "version": "4.4.2",
        "nombreAsesor": "Paulo Dybala",
        "areaAsesor": "Soporte",
        "nombreAsesorResolutor": "Lionel Messi",
        "areaAsesorResolutor": "Marketing",
        "notas": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel",
        "reporteFinal": " Rep Final Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc velLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc vel",
    }

    const [TicketData, setTicketData] = useState(data);



    const [show, setShow] = useState(true);

    const handleClose = () => {
        onChangeshowTicketModalCerrado(false)

    };








    return (
        <>
            <Modal dialogClassName="modalContent" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Ticket #{numeroTicket} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="div-body-infoticket">
                        <Row className="mt-1">
                            <Col>
                                <h4> Título: </h4>
                            </Col>
                            <Col >
                                {TicketData.titulo}
                            </Col>
                            <Col>
                                <h4> Categoría: </h4>
                            </Col>
                            <Col >
                                {TicketData.categoria}
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col >
                                <h4>Criticidad:   </h4>
                            </Col>
                            <Col>
                                {TicketData.criticidad}
                            </Col>
                            <Col >
                                <h4>Estado: </h4>
                            </Col>
                            <Col >
                                {TicketData.estado}
                            </Col>

                        </Row>


                        <Row className="mt-3">
                            <Col >
                                <h4>Fecha de creación:</h4>
                            </Col>
                            <Col >
                                {TicketData.fechaCreacion}
                            </Col>

                            <Col >
                                <h4>Fecha de cierre: </h4>
                            </Col>
                            <Col >
                                {TicketData.fechaCierre}
                            </Col>

                        </Row>


                        <Row className="mt-3">
                            <h4> Descripción </h4>
                        </Row>
                        <Row className="mt-2">
                            <p>
                                {TicketData.descripcion}
                            </p>
                        </Row>


                        <Row className="mt-4">
                            <h4> Información Cliente: </h4>
                        </Row>

                        <Row className="mt-2">
                            <Col>
                                <h4> Nombre:  </h4>
                            </Col>
                            <Col>
                                {TicketData.nombreCliente}
                            </Col>

                            <Col>
                                <h4> Medio de Contacto: </h4>
                            </Col>
                            <Col>
                                {TicketData.medioContactoCliente}
                            </Col>

                        </Row>


                        <Row className="mt-4">
                            <h4> Información Producto: </h4>
                        </Row>

                        <Row className="mt-2">
                            <Col>
                                <h4> Nombre: </h4>
                            </Col>
                            <Col>
                                {TicketData.nombreProducto}
                            </Col>

                            <Col>
                                <h4> Versión:   </h4>
                            </Col>
                            <Col>
                                {TicketData.versionProducto}
                            </Col>

                        </Row>

                        <Row className="mt-4">
                            <h4> Información asesor creador: </h4>
                        </Row>

                        <Row>
                            <Col>
                                <h4> Nombre:</h4>
                            </Col>
                            <Col>
                                {TicketData.nombreAsesor}
                            </Col>
                            <Col>
                                <h4> Area:  </h4>
                            </Col>
                            <Col>
                                {TicketData.areaAsesor}
                            </Col>

                        </Row>

                        <Row className="mt-4">
                            <h4> Información asesor resolutor: </h4>
                        </Row>

                        <Row>
                            <Col>
                                <h4> Nombre:</h4>
                            </Col>
                            <Col>
                                {TicketData.nombreAsesorResolutor}
                            </Col>
                            <Col>
                                <h4> Area:  </h4>
                            </Col>
                            <Col>
                                {TicketData.areaAsesorResolutor}
                            </Col>

                        </Row>

                        <Row className="mt-4">
                            <h4> Notas </h4>
                        </Row>
                        <Row className="mt-3">
                            <p>
                                {TicketData.notas}
                            </p>
                        </Row>

                        <Row className="mt-4">
                            <h4> Reporte Final </h4>
                        </Row>
                        <Row className="mt-3">
                            <p>
                                {TicketData.reporteFinal}
                            </p>
                        </Row>


                    </div>






                </Modal.Body>
                <Modal.Footer>



                    <Col xs={1}>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Col>

                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalTicketCerrado;

