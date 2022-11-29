import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalCreacionTarea.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import { SERVER_NAME_SOPORTE } from "../../environment";


const ModalCreacionTarea = ({ numeroTicket, onChangeshowCreacionTareaModal, setAlertaTareaExito }) => {


    const [proyectos, setProyectos] = useState();

    const [proyectoSeleccionado, setProyectoSeleccionado] = useState("");
    const [proyectoSeleccionadoId, setProyectoSeleccionadoId] = useState();

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

    const onChangePrioridadTarea = (e) => {
        setPrioridadTarea(e.target.value);
    };

    const onChangeProyectoSeleccionado = (e, idProyecto) => {
        setProyectoSeleccionado(e.target.value);
        setProyectoSeleccionadoId(idProyecto);
    };

    const enviarTarea = async () => {

        const send_tarea = {
            "name": tituloTarea,
            "description": cuerpoTarea,
            "priority": prioridadTarea,
            "related_ticket": numeroTicket,
        }

        axios.post("https://squad-8-projects.herokuapp.com/psa/projects/" + proyectoSeleccionadoId + "/tasks", send_tarea)
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

                    <h3>Crea una tarea</h3>

                    <Row className="mt-5">
                        <Col xs={1} >
                            <h4>Título</h4>
                        </Col>
                        <Col xs={3}>
                            <Form.Control type="text" name="tituloTarea" onChange={(e) => onChangeTituloTarea(e)} />
                        </Col>

                        <Col xs={2}>
                            <h4> Prioridad:</h4>

                        </Col>
                        <Col xs={2}>
                            <Form.Control type="number" min="0" name="tituloTarea" onChange={(e) => onChangeTituloTarea(e)} />


                        </Col>

                    </Row>
                    <Row className="mt-5">
                        <Col xs={2}>
                            <h4> Proyecto Destino:</h4>
                        </Col>
                        <Col xs={3}>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                    {prioridadTarea ? prioridadTarea : "Selecciona un proyecto"}


                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {proyectos && proyectos.map((proyecto) => (
                                        <Dropdown.Item name="proyectoSeleccionado" onClick={(e) => onChangeProyectoSeleccionado(e, proyecto.id)}>{proyecto.name}</Dropdown.Item>
                                    ))}


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

