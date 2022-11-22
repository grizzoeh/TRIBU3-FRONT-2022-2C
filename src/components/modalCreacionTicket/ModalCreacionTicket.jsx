import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalCreacionTicket.css";
import Button2 from '@mui/material/Button';
import axios from "axios";
import Alert from "@mui/material/Alert";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ModalReporteFinal from "../modalReporteFinal/ModalReporteFinal";
import ModalCreacionTarea from "../modalCreacionTarea/ModalCreacionTarea";






const ModalCreacionTicket = ({ onChangeshowCreacionModal }) => {

    const TicketViejo = {
        "criticidad": null,
        "estado": null,
        "fechaCreacion": null,
        "descripcion": null,
        "nombreCliente": null,
        "medioContacto": null,
        "correo": null,
        "nombreProducto": null,
        "version": null,
        "nombreAsesor": null,
        "areaAsesor": null,
        "notas": null,
    }

    const [ticketEditable, setTicketEditable] = useState(TicketViejo);


    const handleConfirmarCreacion = () => {

        onChangeshowCreacionModal(false);

    }

    const onChangeTicketEditable = (e) => {

        setTicketEditable({ ...ticketEditable, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {
        console.log(e);
        console.log(e.target.value);
        console.log(e.target.name);
        setTicketEditable({ ...ticketEditable, [e.target.name]: e.target.innerHTML });
    }

    const handleClose = () => {
        onChangeshowCreacionModal(false);
    }



    return (
        <>

            <Modal dialogClassName="modalContent" show={true} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear Ticket </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="div-body-infoticket">

                        <Row className="mt-4">
                            <Col>
                                <h4>Criticidad:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {ticketEditable.criticidad ? ticketEditable.criticidad : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                        <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                        <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col >
                                <h4>Estado:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {ticketEditable.estado ? ticketEditable.estado : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                        <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                        <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                        </Row>


                        <Row className="mt-5">
                            <Col>
                                <h4>Fecha de creación:</h4>
                            </Col>
                            <Col xs={9}>
                                <Form.Control type="text" name="fechaCreacion" placeholder="Ej: 18/12/2022" onChange={(e) => onChangeTicketEditable(e)} />

                            </Col>

                        </Row>


                        <Row className="mt-5">
                            <h4> Descripción </h4>
                        </Row>
                        <Row className="mt-3">
                            <textarea className="box-descripcion" name="descripcion" placeholder="Escribe una descripción..." onChange={(e) => onChangeTicketEditable(e)} />


                        </Row>


                        <Row className="mt-5">
                            <h4> Información Cliente: </h4>
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <h4> Nombre:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {ticketEditable.nombreCliente ? ticketEditable.nombreCliente : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="nombreCliente" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                        <Dropdown.Item name="nombreCliente" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                        <Dropdown.Item name="nombreCliente" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <h4> Medio de Contacto:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {ticketEditable.medioContacto ? ticketEditable.medioContacto : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="medioContacto" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                        <Dropdown.Item name="medioContacto" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                        <Dropdown.Item name="medioContacto" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Col>
                            {/* <Col>
                            <h4> Correo:  {ticketEditable.correo} </h4>
                        </Col> */}
                        </Row>


                        <Row className="mt-5">
                            <h4> Información Producto: </h4>
                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <h4> Nombre: </h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {ticketEditable.nombreProducto ? ticketEditable.nombreProducto : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="nombreProducto" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                        <Dropdown.Item name="nombreProducto" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                        <Dropdown.Item name="nombreProducto" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <h4> Versión:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {ticketEditable.version ? ticketEditable.version : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="version" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                        <Dropdown.Item name="version" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                        <Dropdown.Item name="version" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                        </Row>

                        <Row className="mt-5">
                            <h4> Información asesor: </h4>
                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <h4> Nombre: </h4>
                            </Col>
                            <Col>
                                <Form.Control type="text" name="nombreAsesor" placeholder="Nombre Asesor" onChange={(e) => onChangeTicketEditable(e)} />

                            </Col>
                            <Col>
                                <h4> Area:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {ticketEditable.areaAsesor ? ticketEditable.areaAsesor : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="areaAsesor" onClick={(e) => handleDropdownChange(e)}>Soporte</Dropdown.Item>
                                        <Dropdown.Item name="areaAsesor" onClick={(e) => handleDropdownChange(e)}>Proyectos</Dropdown.Item>
                                        <Dropdown.Item name="areaAsesor" onClick={(e) => handleDropdownChange(e)}>Recursos</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Col>

                        </Row>

                        <Row className="mt-5">
                            <h4> Notas </h4>
                        </Row>
                        <Row className="mt-3">
                            <textarea className="box-notas" name="notas" placeholder="Escribe una nota..." onChange={(e) => onChangeTicketEditable(e)} />

                        </Row>


                    </div>





                </Modal.Body>
                <Modal.Footer>

                    <Fragment>
                        <Col xs={1} > <Button onClick={handleConfirmarCreacion}>Crear</Button> </Col>
                    </Fragment>


                    <Col xs={1}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Col>

                </Modal.Footer>
            </Modal>

        </>
    )
}


export default ModalCreacionTicket;

