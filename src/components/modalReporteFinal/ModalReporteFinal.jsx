import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalReporteFinal.css";
import Button2 from '@mui/material/Button';
import axios from "axios";
import Alert from "@mui/material/Alert";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';






const ModalReportefinal = ({ numeroTicket, onChangeshowReporteFinalModal }) => {

    const ReporteFinal = {
        "nombreResolutor": null,
        "area": null,
        "descripcion": null,
    }

    const [reporte, setReporte] = useState(ReporteFinal);

    const onChangeReporteFinal = (e) => {

        setReporte({ ...ReporteFinal, [e.target.name]: e.target.value });
    }

    const [show, setShow] = useState(true);

    const handleClose = () => {
        onChangeshowReporteFinalModal(false)

    };

    const handleEnviar = () => {
        onChangeshowReporteFinalModal(false)
    };



    const handleDropdownChange = (e) => {
        console.log(e);
        console.log(e.target.value);
        console.log(e.target.name);
        setReporte({ ...ReporteFinal, [e.target.name]: e.target.innerHTML });
    }


    return (
        <>
            <Modal dialogClassName="modalContentReporte" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Ticket #{numeroTicket} - Reporte Final </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Row className="mt-1">
                        <h4> Información resolutor: </h4>
                    </Row>

                    <Row className="mt-4">

                        <Col>
                            <h4> Area:</h4>
                        </Col>
                        <Col>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                    {ReporteFinal.area ? ReporteFinal.area : "Seleccionar"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item name="area" onClick={(e) => handleDropdownChange(e)}>Proyectos</Dropdown.Item>
                                    <Dropdown.Item name="area" onClick={(e) => handleDropdownChange(e)}>Soporte</Dropdown.Item>
                                    <Dropdown.Item name="area" onClick={(e) => handleDropdownChange(e)}>Recursos</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>

                        <Col>
                            <h4> Nombre: </h4>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="nombreResolutor" value={ReporteFinal.nombreResolutor} onChange={(e) => onChangeReporteFinal(e)} />

                        </Col>

                    </Row>

                    <h2 className="mt-5">Escribe un Reporte Final</h2>

                    <textarea className="box-reporte-final mt-4" name="descripcion" onChange={(e) => onChangeReporteFinal(e)} />


                </Modal.Body>
                <Modal.Footer>

                    <Col xs={10}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleEnviar}>
                            Enviar Reporte Final
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalReportefinal;

