import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalTicketCerrado.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { SERVER_NAME_SOPORTE } from "../../environment";






const ModalTicketCerrado = ({ numeroTicket, data }) => {



    const [TicketData, setTicketData] = useState(data);

    const [clientes, setClientes] = useState();


    const [productos, setProductos] = useState();

    const [versiones, setVersiones] = useState();

    const [compras, setCompras] = useState();

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);

    };


    useEffect(() => {

        const getClientes = async () => {
            axios
                .get('https://psa-soporte-squad7.herokuapp.com/tickets/clientes', {

                })
                .then((response) => {
                    setClientes(response.data.data);
                }
                )
                .catch((error) => {
                    console.log(error);
                });
            //setClientes([{ "id": 1, "razon social": "FIUBA", "CUIT": "20-12345678-2" }, { "id": 2, "razon social": "FSOC", "CUIT": "20-12345678-5" }, { "id": 3, "razon social": "Macro", "CUIT": "20-12345678-3" }])
        }

        const getProductos = async () => {
            axios
                .get(SERVER_NAME_SOPORTE + "/productos/", {
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
                .get(SERVER_NAME_SOPORTE + "/versiones/", {
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
                .get(SERVER_NAME_SOPORTE + "/compras/", {
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
            <Button size="sm" variant="primary" onClick={() => { handleShow() }}>Informaci??n</Button>

            <Modal dialogClassName="modalContent" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Ticket #{numeroTicket} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="div-body-infoticket">
                        <Row className="mt-4">

                            <Col>
                                <Row className="mt-1">
                                    <Col>
                                        <h4> T??tulo: </h4>
                                    </Col>
                                    <Col >
                                        {TicketData.titulo}
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <h4> Categor??a: </h4>
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
                                </Row>
                                <Row className="mt-4">
                                    <Col >
                                        <h4>Estado: </h4>
                                    </Col>
                                    <Col >
                                        {TicketData.estado}
                                    </Col>

                                </Row>


                                <Row className="mt-3">
                                    <Col >
                                        <h4>Fecha de creaci??n:</h4>
                                    </Col>
                                    <Col >
                                        {TicketData.fechaCreacion.slice(0, 10)}
                                    </Col>
                                </Row>
                                <Row className="mt-3">

                                    <Col >
                                        <h4>Fecha de cierre: </h4>
                                    </Col>
                                    <Col >
                                        {TicketData.fechaCierre.slice(0, 10)}
                                    </Col>

                                </Row>


                                <Row className="mt-3">
                                    <h4> Descripci??n </h4>
                                </Row>
                                <Row className="mt-2">
                                    <Col xs={11}>
                                        <p className="linea-box">
                                            {TicketData.descripcion}
                                        </p>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <h4> Notas </h4>
                                </Row>
                                <Row className="mt-3">
                                    <Col xs={11}>
                                        <p className="linea-box">
                                            {TicketData.notas}
                                        </p>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <h4> Reporte Final </h4>
                                </Row>
                                <Row className="mt-3">
                                    <Col xs={11}>
                                        <p className="linea-box">
                                            {TicketData.reporteFinal}
                                        </p>
                                    </Col>
                                </Row>


                            </Col>

                            <Col>

                                <Row className="mt-1">
                                    <h3 className="titulo-subrayado"> Informaci??n Cliente: </h3>
                                </Row>

                                <Row className="mt-2">
                                    <Col>
                                        <h4> Nombre:  </h4>
                                    </Col>
                                    <Col>
                                        {clientes ?
                                            clientes.filter(cliente => cliente.id === TicketData.idCliente)[0]['razon social']

                                            : null}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>

                                        <h4> Medio de Contacto: </h4>
                                    </Col>
                                    <Col>
                                        {TicketData.medioContactoCliente}
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <h4> CUIT: </h4>
                                    </Col>
                                    <Col>
                                        {clientes ?
                                            clientes.filter(cliente => cliente.id === TicketData.idCliente)[0]['CUIT']

                                            : null}
                                    </Col>
                                </Row>




                                <Row className="mt-4">
                                    <h3 className="titulo-subrayado"> Informaci??n Producto: </h3>

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
                                </Row>

                                <Row className="mt-2">

                                    <Col>
                                        <h4> Versi??n:   </h4>
                                    </Col>
                                    <Col>
                                        {versiones ?
                                            versiones.filter(version => version.id === TicketData.idVersion)[0]['nombre']
                                            : null}
                                    </Col>

                                </Row>

                                <Row className="mt-4">
                                    <h3 className="titulo-subrayado"> Informaci??n asesor creador: </h3>

                                </Row>

                                <Row>
                                    <Col>
                                        <h4> Nombre:</h4>
                                    </Col>

                                    <Col>
                                        {TicketData.nombreAsesor}
                                    </Col>
                                </Row>


                                <Row className="mt-4">
                                    <h3 className="titulo-subrayado"> Informaci??n resolutor: </h3>

                                </Row>

                                <Row>
                                    <Col>
                                        <h4> Nombre:</h4>
                                    </Col>
                                    <Col>
                                        {TicketData.nombreAsesorResolutor}
                                    </Col>
                                </Row>



                            </Col>
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

