import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalInfoTicketEnCurso.css";
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






const ModalInfoTicketEnCurso = ({ numeroTicket, onChangeshowTicketModalEnCurso, data }) => {

    const [TicketViejo, setTicketViejo] = useState(data);

    const [ticketEditable, setTicketEditable] = useState(data);

    // const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);


    const [show, setShow] = useState(true);

    const handleClose = () => {
        onChangeshowTicketModalEnCurso(false)
        setEditMode(false);

    };

    // const handleShow = () => onChangeshowTicketModalEnCurso(true);

    const handleConfirmarEdicion = () => {
        setEditMode(false);
    }
    const handleCancelarEdicion = () => {
        setEditMode(false);
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

    const [showReporteFinalModal, setShowReporteFinalModal] = useState(false);

    const onChangeshowReporteFinalModal = (newSomeState) => {
        setShowReporteFinalModal(newSomeState);
    };

    const [showCreacionTareaModal, setShowCreacionTareaModal] = useState(false);

    const onChangeshowCreacionTareaModal = (newSomeState) => {
        setShowCreacionTareaModal(newSomeState);
    };


    return (
        <>
            <Modal dialogClassName="modalContent" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Ticket #{numeroTicket} </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    {editMode ? (
                        //DENTRO DE EDIT MODE BODY
                        <div className="div-body-infoticket">
                            <Row>
                                <Col xs={1}>
                                    <h4> Título: </h4>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name="titulo" value={ticketEditable.titulo} onChange={(e) => onChangeTicketEditable(e)} />
                                </Col>

                                <Col>
                                    <h4>Categoría:</h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {ticketEditable.categoria}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item name="categoria" onClick={(e) => handleDropdownChange(e)}>Consulta</Dropdown.Item>
                                            <Dropdown.Item name="categoria" onClick={(e) => handleDropdownChange(e)}>Reclamo</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>

                            <Row className="mt-4">
                                <Col>
                                    <h4>Criticidad:</h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {ticketEditable.criticidad}
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
                                            {ticketEditable.estado}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                            <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                            <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                            </Row>


                            <Row className="mt-4">
                                <Col>
                                    <h4>Fecha de creación:</h4>
                                </Col>
                                <Col xs={9}>
                                    <Form.Control type="text" name="fechaCreacion" value={ticketEditable.fechaCreacion} onChange={(e) => onChangeTicketEditable(e)} />

                                </Col>

                            </Row>


                            <Row className="mt-3">
                                <h4> Descripción </h4>
                            </Row>
                            <Row>
                                <textarea className="box-descripcion" name="descripcion" value={ticketEditable.descripcion} onChange={(e) => onChangeTicketEditable(e)} />


                            </Row>


                            <Row className="mt-3">
                                <h4> Información Cliente: </h4>
                            </Row>

                            <Row className="mt-2">
                                <Col>
                                    <h4> Nombre:</h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {ticketEditable.nombreCliente}
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
                                    <Form.Control type="text" name="medioContactoCliente" value={ticketEditable.medioContactoCliente} onChange={(e) => onChangeTicketEditable(e)} />


                                </Col>
                                {/* <Col>
                            <h4> Correo:  {ticketEditable.correo} </h4>
                        </Col> */}
                            </Row>


                            <Row className="mt-4">
                                <h4> Información Producto: </h4>
                            </Row>

                            <Row className="mt-2">
                                <Col>
                                    <h4> Nombre: </h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {ticketEditable.nombreProducto}
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
                                            {ticketEditable.versionProducto}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                            <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                            <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                            </Row>

                            <Row className="mt-5">
                                <h4> Información asesor: </h4>
                            </Row>

                            <Row className="mt-2">

                                <Col>
                                    <h4> Area:</h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {ticketEditable.areaAsesor}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item name="areaAsesor" onClick={(e) => handleDropdownChange(e)}>Soporte</Dropdown.Item>
                                            <Dropdown.Item name="areaAsesor" onClick={(e) => handleDropdownChange(e)}>Proyectos</Dropdown.Item>
                                            <Dropdown.Item name="areaAsesor" onClick={(e) => handleDropdownChange(e)}>Recursos</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>

                                </Col>

                                <Col>
                                    <h4> Nombre: </h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {ticketEditable.nombreAsesor}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                            <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                            <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                            </Row>

                            <Row className="mt-4">
                                <h4> Notas </h4>
                            </Row>
                            <Row className="mt-2">
                                <textarea className="box-notas" name="notas" value={ticketEditable.notas} onChange={(e) => onChangeTicketEditable(e)} />

                            </Row>


                        </div>
                    ) : (
                        // FUERA DE EDIT MODE BODY
                        <div className="div-body-infoticket">
                            <Row className="mt-1">
                                <Col>
                                    <h4> Título: </h4>
                                </Col>
                                <Col xs={6}>
                                    {ticketEditable.titulo}
                                </Col>
                                <Col>
                                    <h4> Categoría: </h4>
                                </Col>
                                <Col >
                                    {ticketEditable.categoria}
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col >
                                    <h4>Criticidad:   </h4>
                                </Col>
                                <Col>
                                    {ticketEditable.criticidad}
                                </Col>

                                <Col >
                                    <h4>Estado: </h4>
                                </Col>
                                <Col >
                                    {ticketEditable.estado}
                                </Col>

                            </Row>


                            <Row className="mt-3">
                                <Col >
                                    <h4>Fecha de creación:</h4>
                                </Col>
                                <Col >
                                    {ticketEditable.fechaCreacion}
                                </Col>

                            </Row>


                            <Row className="mt-3">
                                <h4> Descripción </h4>
                            </Row>
                            <Row className="mt-2">
                                <p>
                                    {ticketEditable.descripcion}
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
                                    {ticketEditable.nombreCliente}
                                </Col>

                                <Col>
                                    <h4> Medio de Contacto: </h4>
                                </Col>
                                <Col>
                                    {ticketEditable.medioContactoCliente}
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
                                    {ticketEditable.nombreProducto}
                                </Col>

                                <Col>
                                    <h4> Versión:   </h4>
                                </Col>
                                <Col>
                                    {ticketEditable.versionProducto}
                                </Col>

                            </Row>

                            <Row className="mt-4">
                                <h4> Información asesor: </h4>
                            </Row>

                            <Row>
                                <Col>
                                    <h4> Nombre:</h4>
                                </Col>
                                <Col>
                                    {ticketEditable.nombreAsesor}
                                </Col>
                                <Col>
                                    <h4> Area:  </h4>
                                </Col>
                                <Col>
                                    {ticketEditable.areaAsesor}
                                </Col>

                            </Row>

                            <Row className="mt-4">
                                <h4> Notas </h4>
                            </Row>
                            <Row className="mt-3">
                                <p>
                                    {ticketEditable.notas}
                                </p>
                            </Row>


                        </div>
                    )
                    }




                </Modal.Body>
                <Modal.Footer>
                    {editMode ? (
                        // DENTRO DE EDIT MODE FOOTER HEADER
                        <Fragment>
                            <Col xs={1}><Button onClick={handleCancelarEdicion}> Cancelar </Button> </Col>
                            <Col> <Button onClick={handleConfirmarEdicion}>Confirmar</Button> </Col>
                        </Fragment>

                    ) : (
                        // FUERA DE EDIT MODE FOOTER HEADER
                        <Fragment>
                            <Col xs={1}><Button onClick={() => setShowReporteFinalModal(true)}> Resolver </Button> </Col>
                            <Col> <Button onClick={() => setShowCreacionTareaModal(true)}>Crear Tarea Asociada</Button> </Col>
                            <Col xs={-1}>
                                <Button onClick={() => setEditMode(true)}>Editar</Button>
                            </Col>
                        </Fragment>

                    )}
                    <Col xs={1}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Col>
                    {showReporteFinalModal ? (
                        <ModalReporteFinal numeroTicket="1" onChangeshowReporteFinalModal={onChangeshowReporteFinalModal} />) :
                        (
                            null)}

                    {showCreacionTareaModal ? (
                        <ModalCreacionTarea numeroTicket="1" onChangeshowCreacionTareaModal={onChangeshowCreacionTareaModal} />) :
                        (
                            null)}
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalInfoTicketEnCurso;

