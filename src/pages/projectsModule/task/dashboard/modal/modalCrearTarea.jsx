import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalCrearTarea.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Snackbar } from "@mui/material";
import * as SERVER_NAMES from "../../../APIRoutes";
import DropdownButton from "react-bootstrap/DropdownButton";
import moment from 'moment';


const ModalCreacionTarea = ({ getDataProjectTask, onChangeshowCreacionTareaModal, project, tasks, assignees, setRefreshKey }) => {

    const vertical = "top"
    const horizontal = "center"

    const initialTask = {
        name: null,
        description: null,
        estimated_hours_effort: null,
        estimated_start_date: null,
        estimated_finalization_date: null,
        dependencies: [],
        assignees: [],
        creation_date: null,
        priority: 1,
        realEffort: null,
        parent_task_id: null
    }

    //const [proyectos, setProyectos] = useState();

    //const [proyectoSeleccionadoId, setProyectoSeleccionadoId] = useState();

    //const [proyectoSeleccionadoNombre, setProyectoSeleccionadoNombre] = useState();

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);

    const [show, setShow] = useState(false);

    const [TaskData, setTaskData] = useState(initialTask);

    const [DependencybuttonTitle, setDependencyButtonTitle] = useState('Seleccionar');

    const [AssigneebuttonTitle, setAssigneeButtonTitle] = useState('Seleccionar');

    //const [alertaTareaExito, setAlertaTareaExito] = useState(false);

    /*const handleClose = () => {
        onChangeshowCreacionTareaModal(false)
    };*/
    const handleClose = () => {
        setShow(false);
        //setAlertaTareaExito(false);
        setAlertaDatosNulos(false);
        setDependencyButtonTitle('Seleccionar');
        setAssigneeButtonTitle('Seleccionar');
        setRefreshKey(oldKey => oldKey +1);
    };

    const handleDependencyDropdownButtonChange = (e) => {
        setTaskData({ ...TaskData, parent_task: e });
        setDependencyButtonTitle(tasks.find((tarea) => tarea.id == e).name);
    };

    const handleAssigneeDropdownButtonChange = (e) => {
        if (e!= "Ninguno")  setTaskData({ ...TaskData, assignees: [e] });
        e==="Ninguno"?setAssigneeButtonTitle("Ninguno"):setAssigneeButtonTitle(assignees.find((client) => client.legajo == e).Nombre + " " + assignees.find((client) => client.legajo == e).Apellido);
    };

    const onChangeDateData = (e) => {
        setTaskData({ ...TaskData, [e.target.name]: moment(e.target.value,  "YYYY-MM-DD").format() });
      };

    //const [cuerpoTarea, setCuerpoTarea] = useState("");

    /*const onChangeCuerpoTarea = (e) => {
        setCuerpoTarea(e.target.value);
    };*/

    //const [tituloTarea, setTituloTarea] = useState("");

    /*const onChangeTituloTarea = (e) => {

        setTituloTarea(e.target.value);
    };*/

    //const [prioridadTarea, setPrioridadTarea] = useState("");



    /*const onChangeProyectoSeleccionado = (e) => {
        setProyectoSeleccionadoNombre(e.target.innerHTML);
        setProyectoSeleccionadoId(e.target.id);
    };*/

    /*const onChangePrioridadTarea = (e) => {
        setPrioridadTarea(e.target.value);
    };*/

    const handleCloseAlertaDatosNulos = () => {
        setAlertaDatosNulos(false);
    };

    const onChangeTaskData = (e) => {
        setTaskData({ ...TaskData, [e.target.name]: e.target.value });
      };

    const enviarTarea = async () => {

        

        if (TaskData.name === "" || TaskData.description === "" || TaskData.priority === "" || TaskData.name === null || TaskData.description === null || TaskData.priority === null) {
            setAlertaDatosNulos(true);

        }
        else {

            axios.post(SERVER_NAMES.PROJECTS + "/psa/projects/" + project.id + "/tasks/", TaskData)
                .then((data) => {
                    if (data.data.ok) {
                        console.log("Tarea creada");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            getDataProjectTask();
            //setAlertaTareaExito(true);
            handleClose();

        }
    }

    /*useEffect(() => {
        const getProyectos = async () => {
            axios
                .get(SERVER_NAMES.PROJECTS + '/psa/projects', {

                })
                .then((response) => {
                    console.log(response.data);
                    setProyectos(response.data);
                }
                )
                .catch((error) => {
                    console.log(error);
                });
        }

        getProyectos();
    }, []);*/


    return (
        <>
            <Button size="xl" variant="primary" onClick={() => { setShow(true) }}>Crear tarea</Button>
            <Modal dialogClassName="modalContentTarea" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Tarea de Proyecto #{project.id}  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Snackbar open={alertaDatosNulos} autoHideDuration={1500} onClose={handleCloseAlertaDatosNulos} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert size={"xs"} show={alertaDatosNulos} key='danger' variant='danger'>
                            No puedes dejar campos vacios!
                        </Alert>
                        {/*<Alert show={alertaTareaExito} variant='success'>
                            Tarea creada con exito.
                        </Alert>*/}
                    </Snackbar>
                    <Row className="mt-1">
                        <Col xs={1} md={2}>
                            <h5>Nombre de la tarea:</h5>
                        </Col>
                        <Col xs={3} >
                            <Form.Control size="sm" type="text" name="name" onChange={(e) => onChangeTaskData(e)} />
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col xs={2}>
                            <h6> Esfuerzo estimado en horas: </h6>

                        </Col>
                        <Col xs={3}>
                            <Form.Control size="sm" type="number" min="0" name="estimated_hours_effort" placeholder="Ej: 10" onChange={(e) => onChangeTaskData(e)} />


                        </Col>

                    </Row>

                    <Row className="mt-3">
                        <Col xs={2}>
                            <h6> Tarea padre: </h6>

                        </Col>
                        <Col xs={3}>
                        <DropdownButton
                            variant="secondary"
                            title={DependencybuttonTitle}
                            onSelect={handleDependencyDropdownButtonChange}
                        >
                            {tasks.map((tarea) => {
                                return (
                                    <Dropdown.Item eventKey={tarea.id} name="tarea">
                                    {tarea.name}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                        </Col>

                    </Row>

                    <Row className="mt-3">
                        <Col xs={2}>
                            <h6> Empleado asignado: </h6>

                        </Col>
                        <Col xs={3}>
                        <DropdownButton
                            variant="secondary"
                            title={AssigneebuttonTitle}
                            onSelect={handleAssigneeDropdownButtonChange}
                        >
                            <Dropdown.Item eventKey={"Ninguno"} name="management">
                                            {"Ninguno"}
                            </Dropdown.Item>
                            {assignees.map((client) => {
                                return (
                                    <Dropdown.Item eventKey={client.legajo} name="client">
                                    {client.Nombre + " " + client.Apellido}
                                    </Dropdown.Item>
                                );
                            })}
                        </DropdownButton>
                        </Col>

                    </Row>

                    <Row className="mt-3">
                        <Col xs={2}>
                            <h6> Fecha estimada de inicio: </h6>

                        </Col>
                        <Col xs={3}>
                        <Form.Control
                            type="date"
                            name="estimated_start_date"
                            placeholder="Ej: 18/12/2022"
                            onChange={(e) => onChangeDateData(e)}
                        />
                        </Col>

                    </Row>

                    <Row className="mt-3">
                        <Col xs={2}>
                            <h6> Fecha estimada de fin: </h6>

                        </Col>
                        <Col xs={3}>
                            <Form.Control
                                type="date"
                                name="estimated_finalization_date"
                                placeholder="Ej: 20/12/2022"
                                onChange={(e) => onChangeDateData(e)}
                            />
                        </Col>

                    </Row>

                    <Row className="mt-3">
                        <Col xs={2}>
                            <h6> Prioridad: </h6>

                        </Col>
                        <Col xs={3}>
                            <Form.Control size="sm" type="number" min="0" name="priority" placeholder="Ej: 2"onChange={(e) => onChangeTaskData(e)} />


                        </Col>

                    </Row>

                    {/*<Row className="mt-4">
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



                    </Row>*/}

                    <h6 className="mt-4">Descripción</h6>
                    <textarea className="box-reporte-final mt-4" name="description" placeholder="Escribe una descripción..." onChange={(e) => onChangeTaskData(e)} />


                </Modal.Body>
                <Modal.Footer>

                    <Col>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Col>

                    <Col xs={1}>
                        <Button variant="primary" onClick={enviarTarea}>
                            Crear Tarea
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalCreacionTarea;

