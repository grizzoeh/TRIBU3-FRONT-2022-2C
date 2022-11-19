import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalCreacionTarea.css";
import Button2 from '@mui/material/Button';
import axios from "axios";
import Alert from "@mui/material/Alert";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';






const ModalCreacionTarea = ({ numeroTicket, onChangeshowCreacionTareaModal }) => {




    const [show, setShow] = useState(true);

    const handleClose = () => {
        onChangeshowCreacionTareaModal(false)

    };

    const handleEnviar = () => {
        onChangeshowCreacionTareaModal(false)
    };

    const [cuerpoTarea, setCuerpoTarea] = useState("");

    const onChangeCuerpoTarea = (e) => {
        setCuerpoTarea(e.target.value);
    };

    const [tituloTarea, setTituloTarea] = useState("");

    const onChangeTituloTarea = (e) => {
        console.log("AAAAAAAA");
        console.log(e.target.value);
        setTituloTarea(e.target.value);
    };

    const [prioridadTarea, setPrioridadTarea] = useState("");

    const onChangePrioridadTarea = (e) => {
        console.log(e.target.value);
        setPrioridadTarea(e.target.value);
    };


    return (
        <>
            <Modal dialogClassName="modalContentTarea" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Tarea de Ticket #{numeroTicket}  </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <h3>Crea una tarea</h3>

                    <Row className="mt-5">
                        <Col xs={1} >
                            <h4>Título</h4>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="tituloTarea" onChange={(e) => onChangeTituloTarea(e)} />
                        </Col>

                        <Col>
                            <h4> Prioridad:</h4>
                        </Col>
                        <Col>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                    {prioridadTarea ? prioridadTarea : "Selecciona una prioridad"}


                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item name="prioridadTarea" onClick={(e) => onChangePrioridadTarea(e)}>Alta</Dropdown.Item>
                                    <Dropdown.Item name="prioridadTarea" onClick={(e) => onChangePrioridadTarea(e)}>Media</Dropdown.Item>
                                    <Dropdown.Item name="prioridadTarea" onClick={(e) => onChangePrioridadTarea(e)}>Baja</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>

                    </Row>

                    <h4 className="mt-5">Descripción</h4>
                    <textarea className="box-reporte-final mt-4" name="reporteFinal" onChange={(e) => onChangeCuerpoTarea(e)} />


                </Modal.Body>
                <Modal.Footer>

                    <Col xs={10}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleEnviar}>
                            Enviar Tarea
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalCreacionTarea;

