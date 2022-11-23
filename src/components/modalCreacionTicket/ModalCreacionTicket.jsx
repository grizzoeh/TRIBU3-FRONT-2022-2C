import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalCreacionTicket.css";
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

const SERVER_NAME = "http://localhost:3000";





const ModalCreacionTicket = ({ onChangeshowCreacionModal }) => {

    const TicketNulo = {
        "titulo": null,
        "categoria": null,
        "criticidad": null,
        "estado": null,
        "fechaCreacion": null,
        "descripcion": null,
        "idCliente": null,
        "medioContactoCliente": null,
        "idProducto": null,
        "idAsesor": null,
        "notas": null,
    }

    const [TicketData, setTicketData] = useState(TicketNulo);

    const [clientes, setClientes] = useState();

    const [productos, setProductos] = useState();

    const [versiones, setVersiones] = useState();

    const [compras, setCompras] = useState();

    const [idClienteFilter, setIdClienteFilter] = useState();

    const [idProductoFilter, setIdProductoFilter] = useState();




    const handleConfirmarCreacion = () => {

        onChangeshowCreacionModal(false);

    }

    const onChangeTicketEditable = (e) => {

        setTicketData({ ...TicketData, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {

        setTicketData({ ...TicketData, [e.target.name]: e.target.innerHTML });
    }

    const handleClose = () => {
        onChangeshowCreacionModal(false);
    }

    const getNombreProducto = (idProducto) => {
        //console.log("idProductosoy: " + idProducto);
        let nombreProducto = "";
        productos.forEach((producto) => {
            if (producto['idProducto'] === idProducto) {
                nombreProducto = producto['nombreProducto'];
            }
        });
        //console.log("nombre es", nombreProducto);
        return nombreProducto;
    }




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

            <Modal dialogClassName="modalContent" show={true} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear Ticket </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="div-body-infoticket">

                        <Row className="mt-4">
                            <Col xs={1}>
                                <h4> Título: </h4>
                            </Col>
                            <Col>
                                <Form.Control type="text" name="titulo" onChange={(e) => onChangeTicketEditable(e)} />
                            </Col>

                            <Col>
                                <h4>Categoría:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {TicketData.categoria ? TicketData.categoria : "Seleccionar"}
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
                                        {TicketData.criticidad ? TicketData.criticidad : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownChange(e)}>Baja</Dropdown.Item>
                                        <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownChange(e)}>Media</Dropdown.Item>
                                        <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownChange(e)}>Alta</Dropdown.Item>
                                        <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownChange(e)}>Crítica</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col >
                                <h4>Estado:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {TicketData.estado ? TicketData.estado : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Abierto</Dropdown.Item>
                                        <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>En análisis</Dropdown.Item>
                                        <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Derivado</Dropdown.Item>
                                        <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Resuelto</Dropdown.Item>
                                        <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Cancelado</Dropdown.Item>


                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                        </Row>


                        <Row className="mt-5">
                            <Col>
                                <h4>Fecha de creación:</h4>
                            </Col>
                            <Col xs={9}>
                                <Form.Control type="text" name="fechaCreacion" placeholder="Ej: 18/12/2022" onChange={(e) => onChangeTicketEditable(e)} />

                            </Col>

                        </Row>


                        <Row className="mt-5">
                            <h4> Descripción </h4>
                        </Row>
                        <Row className="mt-3">
                            <textarea className="box-descripcion" name="descripcion" placeholder="Escribe una descripción..." onChange={(e) => onChangeTicketEditable(e)} />


                        </Row>


                        <Row className="mt-5">
                            <h4> Información Cliente: </h4>
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <h4> Nombre:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {TicketData.nombreCliente ? TicketData.nombreCliente : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {clientes ?
                                            clientes.map((cliente) => (
                                                <Dropdown.Item name="nombreCliente" onClick={(e) => { handleDropdownChange(e); setIdClienteFilter(cliente["id"]) }}>{cliente["razon social"]}</Dropdown.Item>
                                            )) : null}

                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <h4> Medio de Contacto:</h4>
                            </Col>
                            <Col>
                                <Form.Control type="text" name="medioContactoCliente" placeholder="Mail o Tel" onChange={(e) => onChangeTicketEditable(e)} />


                            </Col>




                        </Row>

                        <Row className="mt-5">
                            <Col>
                                <h4> Cuit:</h4>
                            </Col>
                            <Col>
                                {TicketData.nombreCliente ?
                                    clientes.filter((cliente) => cliente["razon social"] === TicketData.nombreCliente).map((cliente) => (
                                        <h4 key={cliente.id} >{cliente.CUIT}</h4>
                                    )) : null}

                            </Col>
                        </Row>

                        <Row className="mt-5">
                            <h4> Información Producto: </h4>
                        </Row>

                        <Row className="mt-3">
                            <Col>
                                <h4> Nombre: </h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {TicketData.nombreProducto ? TicketData.nombreProducto : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>

                                        {
                                            compras && productos ?
                                                compras.filter((compra) => compra['idCliente'] === idClienteFilter)
                                                    .map((compra) => (
                                                        //console.log(compra),
                                                        //console.log("cacarock", productos[compra['idProducto'] - 1]['nombre']),



                                                        <Dropdown.Item name="nombreProducto" onClick={(e) => { handleDropdownChange(e); setIdProductoFilter(compra['idProducto'] - 1) }}> {productos[compra['idProducto'] - 1]['nombre']}</Dropdown.Item>)) : null

                                        }



                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col>
                                <h4> Versión:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {TicketData.versionProducto ? TicketData.versionProducto : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        {/* show versions filtering compras by idclientefilter and idproductofilter */}

                                        {compras && productos && versiones ?
                                            compras.filter((compra) => compra['idCliente'] === idClienteFilter && compra['idProducto'] === idProductoFilter + 1)
                                                .map((compra) => (
                                                    //console.log("cacarockaa", versiones[compra['idVersion'] - 1]['nombre']),
                                                    <Dropdown.Item name="versionProducto" onClick={(e) => { handleDropdownChange(e) }}> {versiones[compra['idVersion'] - 1]['nombre']}</Dropdown.Item>)) : null

                                        }



                                        {/* <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                        <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                        <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item> */}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>

                        </Row>

                        <Row className="mt-5">
                            <h4> Información asesor: </h4>
                        </Row>

                        <Row className="mt-3">

                            <Col>
                                <h4> Area:</h4>
                            </Col>
                            <Col>
                                <Dropdown >
                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                        {TicketData.areaAsesor ? TicketData.areaAsesor : "Seleccionar"}
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
                                        {TicketData.nombreAsesor ? TicketData.nombreAsesor : "Seleccionar"}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Miguel</Dropdown.Item>
                                        <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Paulo</Dropdown.Item>
                                        <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Mariana</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>

                            </Col>


                        </Row>

                        <Row className="mt-5">
                            <h4> Notas </h4>
                        </Row>
                        <Row className="mt-3">
                            <textarea className="box-notas" name="notas" placeholder="Escribe una nota..." onChange={(e) => onChangeTicketEditable(e)} />

                        </Row>


                    </div>





                </Modal.Body>
                <Modal.Footer>

                    <Fragment>
                        <Col xs={1} > <Button onClick={handleConfirmarCreacion}>Crear</Button> </Col>
                    </Fragment>


                    <Col xs={1}>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Col>

                </Modal.Footer>
            </Modal>

        </>
    )
}


export default ModalCreacionTicket;

