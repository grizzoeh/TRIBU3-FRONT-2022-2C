import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonGroup from '@mui/material/ButtonGroup';
import "./modalInfoTicketEnCurso.css";
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




const ModalInfoTicketEnCurso = ({ numeroTicket, onChangeshowTicketModalEnCurso, data }) => {



    const [clientes, setClientes] = useState();

    const [productos, setProductos] = useState();

    const [versiones, setVersiones] = useState();

    const [compras, setCompras] = useState();

    const [TicketViejo, setTicketViejo] = useState(data);

    const [ticketEditable, setTicketEditable] = useState(data);

    // const [show, setShow] = useState(false);
    const [editMode, setEditMode] = useState(false);


    const [show, setShow] = useState(true);

    const [idClienteFilter, setIdClienteFilter] = useState(data.idCliente);

    const [idProductoFilter, setIdProductoFilter] = useState(data.idProducto);

    const [productosDelCliente, setProductosDelCliente] = useState([]);

    const handleClose = () => {
        onChangeshowTicketModalEnCurso(false)
        setEditMode(false);

    };

    // const handleShow = () => onChangeshowTicketModalEnCurso(true);

    const handleConfirmarEdicion = () => {

        const ticketEditado = {
            id: ticketEditable.id,
            titulo: ticketEditable.titulo,
            categoria: ticketEditable.categoria,
            criticidad: ticketEditable.criticidad,
            estado: ticketEditable.estado,
            fechaCreacion: ticketEditable.fechaCreacion,
            idCliente: ticketEditable.idCliente,
            descripcion: ticketEditable.descripcion,
            medioContactoCliente: ticketEditable.medioContactoCliente,
            idProducto: ticketEditable.idProducto,
            idAsesor: ticketEditable.idAsesor,
            nombreAsesor: ticketEditable.nombreAsesor,
            areaAsesor: ticketEditable.areaAsesor,
            notas: ticketEditable.notas,
            idVersion: ticketEditable.idVersion,
        }



        axios.patch(SERVER_NAME + "/tickets/ticket", ticketEditado)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Ticket editado");
                }
            })
            .catch((error) => {
                console.log(error);
            });

        setEditMode(false);
    }
    const handleCancelarEdicion = () => {
        setEditMode(false);
    }

    const onChangeTicketEditable = (e) => {

        setTicketEditable({ ...ticketEditable, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {
        console.log(e);
        console.log(e.target.value);
        console.log(e.target.name);
        setTicketEditable({ ...ticketEditable, [e.target.name]: e.target.innerHTML });
    }

    const [showReporteFinalModal, setShowReporteFinalModal] = useState(false);

    const onChangeshowReporteFinalModal = (newSomeState) => {
        setShowReporteFinalModal(newSomeState);
    };

    const [showCreacionTareaModal, setShowCreacionTareaModal] = useState(false);

    const onChangeshowCreacionTareaModal = (newSomeState) => {
        setShowCreacionTareaModal(newSomeState);
    };

    const getProductosDelCliente = (idCliente) => {
        compras?.filter((compra) => compra.idCliente === idCliente).map((compra) => {

            if (!productosDelCliente.includes(compra.idProducto)) {
                productosDelCliente.push(compra.idProducto);
            }

        });
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
            <Modal dialogClassName="modalContent" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Ticket #{numeroTicket} </Modal.Title>
                </Modal.Header>
                <Modal.Body>


                    {editMode ? (
                        //DENTRO DE EDIT MODE BODY
                        <div className="div-body-infoticket">
                            <Row>
                                <Col xs={1}>
                                    <h4> Título: </h4>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name="titulo" value={ticketEditable.titulo} onChange={(e) => onChangeTicketEditable(e)} />
                                </Col>

                                <Col>
                                    <h4>Categoría:</h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {ticketEditable.categoria}
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
                                            {ticketEditable.criticidad}
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
                                            {ticketEditable.estado}
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


                            <Row className="mt-4">
                                <Col>
                                    <h4>Fecha de creación: </h4>
                                </Col>
                                <Col xs={9}>
                                    <Form.Control type="date" name="fechaCreacion" value={ticketEditable.fechaCreacion.slice(0, 10)} onChange={(e) => onChangeTicketEditable(e)} />

                                </Col>

                            </Row>


                            <Row className="mt-3">
                                <h4> Descripción </h4>
                            </Row>
                            <Row>
                                <textarea className="box-descripcion" name="descripcion" value={ticketEditable.descripcion} onChange={(e) => onChangeTicketEditable(e)} />


                            </Row>


                            <Row className="mt-3">
                                <h4> Información Cliente: </h4>
                            </Row>

                            <Row className="mt-2">
                                <Col>
                                    <h4> Nombre:</h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {clientes.filter(cliente => cliente.id === ticketEditable.idCliente)[0]['razon social']
                                            }

                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {clientes ?
                                                clientes.map((cliente) => (
                                                    <Dropdown.Item name="nombreCliente" onClick={(e) => {
                                                        setTicketEditable({ ...ticketEditable, ['idCliente']: cliente["id"] });
                                                        setIdClienteFilter(cliente["id"]); getProductosDelCliente(cliente["id"]); console.log(ticketEditable)
                                                    }}>{cliente["razon social"]}</Dropdown.Item>
                                                )) : null}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                                <Col>
                                    <h4> Medio de Contacto:</h4>
                                </Col>
                                <Col>
                                    <Form.Control type="text" name="medioContactoCliente" value={ticketEditable.medioContactoCliente} onChange={(e) => onChangeTicketEditable(e)} />


                                </Col>
                                {/* <Col>
                            <h4> Correo:  {ticketEditable.correo} </h4>
                        </Col> */}
                            </Row>


                            <Row className="mt-4">
                                <h4> Información Producto: </h4>
                            </Row>

                            <Row className="mt-2">
                                <Col>
                                    <h4> Nombre: </h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {productos.filter(producto => producto.id === ticketEditable.idProducto)[0]['nombre']
                                            }
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                productosDelCliente && productos ?
                                                    productosDelCliente.map((producto) => (
                                                        <Dropdown.Item onClick={(e) => { setTicketEditable({ ...ticketEditable, ['idProducto']: productos[producto - 1]['id'] }); setIdProductoFilter(producto - 1) }}>{productos[producto - 1]["nombre"]}</Dropdown.Item>
                                                    )) : null
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
                                            {versiones.filter(version => version.id === ticketEditable.idVersion)[0]['nombre']
                                            }
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {compras && productos && versiones ?
                                                compras.filter((compra) => compra['idCliente'] === idClienteFilter && compra['idProducto'] === idProductoFilter + 1)
                                                    .map((compra) => (
                                                        //console.log("cacarockaa", versiones[compra['idVersion'] - 1]['nombre']),
                                                        <Dropdown.Item name="versionProducto" onClick={(e) => { setTicketEditable({ ...ticketEditable, ['idVersion']: compra['idVersion'] }); }}> {versiones[compra['idVersion'] - 1]['nombre']}</Dropdown.Item>)) : null

                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                            </Row>

                            <Row className="mt-5">
                                <h4> Información asesor: </h4>
                            </Row>

                            <Row className="mt-2">

                                <Col>
                                    <h4> Area:</h4>
                                </Col>
                                <Col>
                                    <Dropdown >
                                        <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                            {ticketEditable.areaAsesor}
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
                                            {ticketEditable.nombreAsesor}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Miguel</Dropdown.Item>
                                            <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Paulo</Dropdown.Item>
                                            <Dropdown.Item name="nombreAsesor" onClick={(e) => handleDropdownChange(e)}>Mariana</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>

                            </Row>

                            <Row className="mt-4">
                                <h4> Notas </h4>
                            </Row>
                            <Row className="mt-2">
                                <textarea className="box-notas" name="notas" value={ticketEditable.notas} onChange={(e) => onChangeTicketEditable(e)} />

                            </Row>


                        </div>
                    ) : (
                        // FUERA DE EDIT MODE BODY
                        <div className="div-body-infoticket">
                            <Row className="mt-1">
                                <Col>
                                    <h4> Título: </h4>
                                </Col>
                                <Col xs={6}>
                                    {ticketEditable.titulo}
                                </Col>
                                <Col>
                                    <h4> Categoría: </h4>
                                </Col>
                                <Col >
                                    {ticketEditable.categoria}
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col >
                                    <h4>Criticidad:   </h4>
                                </Col>
                                <Col>
                                    {ticketEditable.criticidad}
                                </Col>

                                <Col >
                                    <h4>Estado: </h4>
                                </Col>
                                <Col >
                                    {ticketEditable.estado}
                                </Col>

                            </Row>


                            <Row className="mt-3">
                                <Col >
                                    <h4>Fecha de creación:</h4>
                                </Col>
                                <Col >
                                    {ticketEditable.fechaCreacion}
                                </Col>

                            </Row>


                            <Row className="mt-3">
                                <h4> Descripción </h4>
                            </Row>
                            <Row className="mt-2">
                                <p>
                                    {ticketEditable.descripcion}
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
                                        clientes.filter(cliente => cliente.id === ticketEditable.idCliente)[0]['razon social']

                                        : null}

                                    {/* {ticketEditable.nombreCliente} */}
                                </Col>

                                <Col>
                                    <h4> Medio de Contacto: </h4>
                                </Col>
                                <Col>
                                    {ticketEditable.medioContactoCliente}
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
                                        productos.filter(producto => producto.id === ticketEditable.idProducto)[0]['nombre']
                                        : null}
                                </Col>

                                <Col>
                                    <h4> Versión:   </h4>
                                </Col>
                                <Col>
                                    {versiones ?
                                        versiones.filter(version => version.id === ticketEditable.idVersion)[0]['nombre']
                                        : null}
                                </Col>

                            </Row>

                            <Row className="mt-4">
                                <h4> Información asesor: </h4>
                            </Row>

                            <Row>
                                <Col>
                                    <h4> Nombre:</h4>
                                </Col>
                                <Col>
                                    {ticketEditable.nombreAsesor}
                                </Col>
                                <Col>
                                    <h4> Area:  </h4>
                                </Col>
                                <Col>
                                    {ticketEditable.areaAsesor}
                                </Col>

                            </Row>

                            <Row className="mt-4">
                                <h4> Notas </h4>
                            </Row>
                            <Row className="mt-3">
                                <p>
                                    {ticketEditable.notas}
                                </p>
                            </Row>


                        </div>
                    )
                    }




                </Modal.Body>
                <Modal.Footer>
                    {editMode ? (
                        // DENTRO DE EDIT MODE FOOTER HEADER
                        <Fragment>
                            <Col ><Button onClick={handleCancelarEdicion}> Cancelar </Button> </Col>
                            <Col xs={18}> <Button onClick={handleConfirmarEdicion}>Confirmar</Button> </Col>
                        </Fragment>

                    ) : (
                        // FUERA DE EDIT MODE FOOTER HEADER
                        <Fragment>
                            <Col xs={1}><Button onClick={() => setShowReporteFinalModal(true)}> Resolver </Button> </Col>
                            <Col> <Button onClick={() => setShowCreacionTareaModal(true)}>Crear Tarea Asociada</Button> </Col>
                            <Col xs={-1}>
                                <Button onClick={() => setEditMode(true)}>Editar</Button>
                            </Col>
                            <Col xs={1}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Col>
                        </Fragment>


                    )}

                    {showReporteFinalModal ? (
                        <ModalReporteFinal numeroTicket="1" onChangeshowReporteFinalModal={onChangeshowReporteFinalModal} />) :
                        (
                            null)}

                    {showCreacionTareaModal ? (
                        <ModalCreacionTarea numeroTicket="1" onChangeshowCreacionTareaModal={onChangeshowCreacionTareaModal} />) :
                        (
                            null)}
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalInfoTicketEnCurso;

