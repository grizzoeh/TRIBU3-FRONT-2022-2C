import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalReporteFinal.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';

import { SERVER_NAME_SOPORTE } from "../../environment";







const ModalReportefinal = ({ numeroTicket, onChangeshowReporteFinalModal, handleCloseTicket, getDataCerrados, getDataEnCurso, setTicketResueltoExito }) => {


    const [reporte, setReporte] = useState("");
    const [nombreAsesorResolutor, setNombreAsesorResolutor] = useState("");
    const [areaAsesorResolutor, setAreaAsesorResolutor] = useState(1);


    const [recursos, setRecursos] = useState();

    const [TicketData, setTicketData] = useState();

    const [fechaCierre, setFechaCierre] = useState("");


    //const [idAsesorResolutor, setIdAsesorResolutor] = useState(1);


    const onChangeReporteFinal = (e) => {

        setReporte(e.target.value);
        setTicketData({ ...TicketData, ["reporteFinal"]: e.target.value });

    }

    const [show, setShow] = useState(true);

    const handleClose = () => {
        onChangeshowReporteFinalModal(false)


    };

    const handleEnviar = async () => {


        axios.post(SERVER_NAME_SOPORTE + "/tickets/ticket/resuelto", TicketData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Reporte creado");
                    axios.delete(SERVER_NAME_SOPORTE + "/tickets/ticket/", { data: send_data_for_delete })
                        .then((data) => {
                            if (data.data.ok) {
                                console.log("Ticket eliminado");
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });

        const send_data_for_delete = {
            id: numeroTicket,
            type: "enCurso"
        }



        getDataEnCurso();
        getDataEnCurso();
        getDataEnCurso();
        getDataCerrados();
        getDataCerrados();
        setTicketResueltoExito(true);
        onChangeshowReporteFinalModal(false);
        handleCloseTicket();
    };





    const handleDropdownChangeNombre = (e) => {
        setNombreAsesorResolutor(e.target.innerHTML);
        setTicketData({ ...TicketData, ["nombreAsesorResolutor"]: e.target.innerHTML, ["idAsesorResolutor"]: e.target.id, ["areaAsesorResolutor"]: 1, });


    }



    const onChangeFechaCierre = (e) => {
        setFechaCierre(e.target.value);
        setTicketData({ ...TicketData, ["fechaCierre"]: e.target.value, ["estado"]: "Resuelto" });

    }





    useEffect(() => {
        const getRecursos = async () => {
            axios
                .get('https://squad920222c-production.up.railway.app/recursos/empleados/empleado', {

                })
                .then((response) => {
                    // console.log(response);
                    setRecursos(response.data);
                }
                )
                .catch((error) => {
                    console.log(error);
                });
            //setRecursos([{ "legajo": 1, "Nombre": "Mario", "Apellido": "Mendoza" }, { "legajo": 2, "Nombre": "Maria", "Apellido": "Perez" }, { "legajo": 3, "Nombre": "Patricia", "Apellido": "Gaona" }])

        }



        const getInfoTicket = async () => {
            const send_data = { type: 'enCurso', id: numeroTicket }

            axios
                .get(SERVER_NAME_SOPORTE + "/tickets/ticket", {
                    params: send_data,
                })
                .then((res) => {
                    setTicketData(res.data.ticket);

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



                    <Row className="mt-4">

                        <Col sm={3}>
                            <h6> Nombre resolutor: </h6>
                        </Col>
                        <Col>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {nombreAsesorResolutor ? nombreAsesorResolutor : "Seleccionar"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {recursos?.map((recurso) => (

                                        < Dropdown.Item name="nombre" id={recurso.legajo} onClick={(e) => { handleDropdownChangeNombre(e); }}>{recurso.Nombre} {recurso.Apellido}</Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>

                    </Row>

                    <Row className="mt-5">
                        <Col sm={3}>
                            <h6>Fecha de cierre:</h6>
                        </Col>
                        <Col sm={3}>
                            <Form.Control type="date" name="fechaCierre" placeholder="Ej: 18/12/2022" onChange={(e) => onChangeFechaCierre(e)} />

                        </Col>

                    </Row>


                    <h6 className="mt-5">Escribir Reporte Final</h6>

                    <textarea className="box-reporte-final mt-4" name="descripcion" onChange={(e) => onChangeReporteFinal(e)} />


                </Modal.Body>
                <Modal.Footer>

                    <Col xs={8}>
                        <Button size="xs" variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Col>
                    <Col>
                        {recursos && nombreAsesorResolutor && fechaCierre && areaAsesorResolutor && reporte ?
                            <Button size="xs" variant="primary" onClick={handleEnviar} style={{ width: "250px" }}>
                                Enviar Reporte Final y Resolver
                            </Button>
                            : <h4></h4>
                        }

                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalReportefinal;

