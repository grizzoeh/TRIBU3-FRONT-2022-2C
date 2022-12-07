import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalCreacionTarea.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Snackbar } from "@mui/material";




const ModalCreacionTarea = ({ numeroTicket, onChangeshowCreacionTareaModal, setAlertaTareaExito }) => {

    const vertical = "top"
    const horizontal = "center"

    const [proyectos, setProyectos] = useState();

    const [proyectoSeleccionadoId, setProyectoSeleccionadoId] = useState();

    const [proyectoSeleccionadoNombre, setProyectoSeleccionadoNombre] = useState();

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);

    const [show, setShow] = useState(true);

    const handleClose = () => {
        onChangeshowCreacionTareaModal(false)

    };



    const [cuerpoTarea, setCuerpoTarea] = useState("");

    const onChangeCuerpoTarea = (e) => {
        setCuerpoTarea(e.target.value);
    };

    const [tituloTarea, setTituloTarea] = useState("");

    const onChangeTituloTarea = (e) => {

        setTituloTarea(e.target.value);
    };

    const [prioridadTarea, setPrioridadTarea] = useState("");



    const onChangeProyectoSeleccionado = (e) => {
        setProyectoSeleccionadoNombre(e.target.innerHTML);
        setProyectoSeleccionadoId(e.target.id);
    };

    const onChangePrioridadTarea = (e) => {
        setPrioridadTarea(e.target.value);
    };

    const handleCloseAlertaDatosNulos = () => {
        setAlertaDatosNulos(false);
    };

    const enviarTarea = async () => {

        const send_tarea = {
            "name": tituloTarea,
            "description": cuerpoTarea,
            "priority": prioridadTarea,
            "related_ticket": numeroTicket,
        }

        if (send_tarea.name === "" || send_tarea.description === "" || send_tarea.priority === "" || send_tarea.related_ticket === "" || send_tarea.name === null || send_tarea.description === null || send_tarea.priority === null || send_tarea.related_ticket === null) {
            setAlertaDatosNulos(true);
        }
        else if (!proyectoSeleccionadoId || !proyectoSeleccionadoNombre) {
            setAlertaDatosNulos(true);
        }
        else {

            axios.post("https://squad-8-projects.herokuapp.com/psa/projects/" + proyectoSeleccionadoId + "/tasks/", send_tarea)
                .then((data) => {
                    if (data.data.ok) {
                        console.log("Tarea creada");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            setAlertaTareaExito(true);
            handleClose();

        }
    }

    useEffect(() => {
        const getProyectos = async () => {
            axios
                .get('https://squad-8-projects.herokuapp.com/psa/projects?type=support', {

                })
                .then((response) => {
                    console.log(response.data);
                    setProyectos(response.data);
                }
                )
                .catch((error) => {
                    console.log(error);
                });
            //setProyectos([{ "id": 1, "nombre": "Devops" }, { "id": 2, "nombre": "Environ" }, { "id": 3, "nombre": "W2022" }])
        }

        getProyectos();

    }
        , []);


    return (
        <>
            <Modal dialogClassName="modalContentTarea" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Tarea de Ticket #{numeroTicket}  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Snackbar open={alertaDatosNulos} autoHideDuration={1500} onClose={handleCloseAlertaDatosNulos} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert size={"xs"} show={alertaDatosNulos} key='danger' variant='danger'>
                            No puedes dejar campos vacios!
                        </Alert>
                    </Snackbar>
                    <Row className="mt-1">
                        <Col xs={1} md={2}>
                            <h5>Título:</h5>
                        </Col>
                        <Col xs={3} >
                            <Form.Control size="sm" type="text" name="tituloTarea" onChange={(e) => onChangeTituloTarea(e)} />
                        </Col>
                    </Row>


                    <Row className="mt-3">
                        <Col xs={2}>
                            <h6> Prioridad: </h6>

                        </Col>
                        <Col xs={3}>
                            <Form.Control size="sm" type="number" min="0" name="prioridadTarea" onChange={(e) => onChangePrioridadTarea(e)} />


                        </Col>

                    </Row>

                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6> Proyecto Destino:</h6>
                        </Col>
                        <Col >
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {proyectoSeleccionadoNombre ? proyectoSeleccionadoNombre : "Selecciona un proyecto"}


                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {proyectos && proyectos.map((proyecto) => (
                                        <Dropdown.Item name="proyectoSeleccionado" id={proyecto.id} onClick={(e) => onChangeProyectoSeleccionado(e)}>{proyecto.name}</Dropdown.Item>
                                    ))}


                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>



                    </Row>

                    <h6 className="mt-4">Descripción</h6>
                    <textarea className="box-reporte-final mt-4" name="reporteFinal" onChange={(e) => onChangeCuerpoTarea(e)} />


                </Modal.Body>
                <Modal.Footer>

                    <Col xs={10}>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Col>

                    <Col>
                        <Button variant="primary" onClick={enviarTarea}>
                            Enviar Tarea
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalCreacionTarea;

