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

const SERVER_NAME = "http://localhost:3000";





const ModalReportefinal = ({ numeroTicket, onChangeshowReporteFinalModal }) => {


    const [reporte, setReporte] = useState("");
    const [nombreAsesorResolutor, setNombreAsesorResolutor] = useState("");
    const [areaAsesorResolutor, setAreaAsesorResolutor] = useState("");


    const [recursos, setRecursos] = useState();

    const [TicketData, setTicketData] = useState();

    const [fechaCierre, setFechaCierre] = useState("");

    const [idAsesorResolutor, setIdAsesorResolutor] = useState(1);

    const onChangeReporteFinal = (e) => {

        setReporte(e.target.value);
    }

    const [show, setShow] = useState(true);

    const handleClose = () => {
        onChangeshowReporteFinalModal(false)

    };

    const handleEnviar = async () => {

        setTicketData({ ...TicketData, ["nombreAsesorResolutor"]: nombreAsesorResolutor, ["areaAsesorResolutor"]: areaAsesorResolutor, ["reporteFinal"]: reporte, ["fechaCierre"]: fechaCierre, idAsesorResolutor: idAsesorResolutor });

        axios.post(SERVER_NAME + "/tickets/ticket/resuelto", TicketData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Ticket creado");
                }
            })
            .catch((error) => {
                console.log(error);
            });

        const send_data_for_delete = {
            id: numeroTicket,
            type: "enCurso"
        }

        axios.delete(SERVER_NAME + "/tickets/ticket/", { data: send_data_for_delete })
            .then((data) => {
                if (data.data.ok) {
                    console.log("Ticket eliminado");
                }
            })
            .catch((error) => {
                console.log(error);
            });



        onChangeshowReporteFinalModal(false)
    };





    const handleDropdownChangeNombre = (e) => {
        setNombreAsesorResolutor(e.target.innerHTML);
    }

    const handleDropdownChangeArea = (e) => {
        setAreaAsesorResolutor(e.target.innerHTML);
    }

    const onChangeFechaCierre = (e) => {
        setFechaCierre(e.target.value);
    }


    useEffect(() => {
        const getRecursos = async () => {
            // axios
            //     .get('https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {
            //         headers: {
            //             "Access-Control-Allow-Origin": "*",
            //             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            //             'Access-Control-Allow-Credentials': true,
            //             crossorigin: true
            //         }
            //     })
            //     .then((response) => {
            //         console.log(response);
            //         // setClientes(response.data);
            //     }
            //     )
            //     .catch((error) => {
            //         console.log(error);
            //     });
            setRecursos([{ "legajo": 1, "Nombre": "Mario", "Apellido": "Mendoza" }, { "legajo": 2, "Nombre": "Maria", "Apellido": "Perez" }, { "legajo": 3, "Nombre": "Patricia", "Apellido": "Gaona" }])
        }

        const getInfoTicket = async () => {
            const send_data = { type: 'enCurso', id: numeroTicket }

            axios
                .get(SERVER_NAME + "/tickets/ticket", {
                    params: send_data,
                })
                .then((res) => {
                    setTicketData(res.data.ticket);
                    console.log(res.data.ticket);

                })
                .catch((err) => {
                    console.log("Errorxd: ", err); // FIXME TOAST
                });

        }


        getRecursos();
        getInfoTicket();

    }, []);


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
                                    {areaAsesorResolutor ? areaAsesorResolutor : "Seleccionar"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item name="area" onClick={(e) => handleDropdownChangeArea(e)}>Soporte</Dropdown.Item>
                                    <Dropdown.Item name="area" onClick={(e) => handleDropdownChangeArea(e)}>Recursos</Dropdown.Item>
                                    <Dropdown.Item name="area" onClick={(e) => handleDropdownChangeArea(e)}>Proyectos</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>

                        <Col>
                            <h4> Nombre: </h4>
                        </Col>
                        <Col>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                    {nombreAsesorResolutor ? nombreAsesorResolutor : "Seleccionar"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {recursos?.map((recurso) => (
                                        <Dropdown.Item name="nombre" onClick={(e) => handleDropdownChangeNombre(e)}>{recurso.Nombre} {recurso.Apellido}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                    </Row>

                    <Row className="mt-5">
                        <Col>
                            <h4>Fecha de cierre:</h4>
                        </Col>
                        <Col xs={9}>
                            <Form.Control type="date" name="fechaCierre" placeholder="Ej: 18/12/2022" onChange={(e) => onChangeFechaCierre(e)} />

                        </Col>

                    </Row>


                    <h2 className="mt-5">Escribir Reporte Final</h2>

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
                            Enviar Reporte Final y Resolver
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalReportefinal;

