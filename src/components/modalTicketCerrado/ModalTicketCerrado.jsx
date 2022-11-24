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
const SERVER_NAME = "http://localhost:3000";







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

    const [clientes, setClientes] = useState();


    const [productos, setProductos] = useState();

    const [versiones, setVersiones] = useState();

    const [compras, setCompras] = useState();

    const [show, setShow] = useState(true);

    const handleClose = () => {
        onChangeshowTicketModalCerrado(false)

    };


    useEffect(() => {

        const getClientes = async () => {
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
            setClientes([{ "id": 1, "razon social": "FIUBA", "CUIT": "20-12345678-2" }, { "id": 2, "razon social": "FSOC", "CUIT": "20-12345678-5" }, { "id": 3, "razon social": "Macro", "CUIT": "20-12345678-3" }])
        }

        const getProductos = async () => {
            axios
                .get(SERVER_NAME + "/productos/", {
                })
                .then((res) => {
                    setProductos(res.data.productos);



                })
                .catch((err) => {
                    console.log(err);
                });
        }

        const getVersiones = async () => {
            axios
                .get(SERVER_NAME + "/versiones/", {
                })
                .then((res) => {
                    setVersiones(res.data.versiones);

                })
                .catch((err) => {
                    console.log(err);
                });
        }

        const getCompras = async () => {
            axios
                .get(SERVER_NAME + "/compras/", {
                })
                .then((res) => {
                    setCompras(res.data.compras);
                })
                .catch((err) => {
                    console.log(err);
                });
        }




        getProductos();
        getVersiones();
        getClientes();
        getCompras();


    }, []);





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
                                {clientes ?
                                    clientes.filter(cliente => cliente.id === TicketData.idCliente)[0]['razon social']

                                    : null}                            </Col>

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
                                {productos ?
                                    productos.filter(producto => producto.id === TicketData.idProducto)[0]['nombre']
                                    : null}
                            </Col>

                            <Col>
                                <h4> Versión:   </h4>
                            </Col>
                            <Col>
                                {versiones ?
                                    versiones.filter(version => version.id === TicketData.idVersion)[0]['nombre']
                                    : null}
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

