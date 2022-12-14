import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalCreacionTicket.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Snackbar } from "@mui/material";



import { SERVER_NAME_SOPORTE } from "../../environment";





const ModalCreacionTicket = ({ showCreacionModal, setShowCreacionModal, getDataEnCurso, setTicketCreadoExito, getDataCerrados }) => {

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
        "nombreAsesor": null,
        "areaAsesor": 1,
        "notas": null,
        "idVersion": null,
    }

    const vertical = "top"
    const horizontal = "center"

    const [TicketData, setTicketData] = useState(TicketNulo);

    const [clientes, setClientes] = useState();

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);
    const handleCloseAlertaDatosNulos = () => setAlertaDatosNulos(false);

    const [productos, setProductos] = useState();

    const [versiones, setVersiones] = useState();

    const [compras, setCompras] = useState();

    const [idClienteFilter, setIdClienteFilter] = useState();

    const [idProductoFilter, setIdProductoFilter] = useState();


    const [dicci, setDicci] = useState();

    const [recursos, setRecursos] = useState();



    const crearTicket = async () => {
        axios.post(SERVER_NAME_SOPORTE + "/tickets", TicketData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Ticket creado");
                    setTicketCreadoExito(true);
                    setShowCreacionModal(false);
                    getDataEnCurso();
                    getDataCerrados();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }





    const handleConfirmarCreacion = () => {

        if (TicketData.titulo === null || TicketData.categoria === null || TicketData.criticidad === null || TicketData.descripcion === null || TicketData.idCliente === null || TicketData.medioContactoCliente === null || TicketData.idProducto === null || TicketData.fechaCreacion === null) {
            setAlertaDatosNulos(true);



        }
        else {

            setAlertaDatosNulos(false);
            crearTicket();
        }


    }

    const onChangeTicketEditable = (e) => {

        setTicketData({ ...TicketData, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {

        setTicketData({ ...TicketData, [e.target.name]: e.target.innerHTML });
    }

    const handleDropdownChangeRecurso = (e) => {

        setTicketData({ ...TicketData, [e.target.name]: e.target.innerHTML, ['idAsesor']: e.target.id });
    }

    const setearIdProductoTicket = (idProductoASetear) => {
        setTicketData({ ...TicketData, ['idProducto']: idProductoASetear, ['idVersion']: null });

    }

    const setearIdClienteTicket = (idClienteASetear) => {
        setTicketData({ ...TicketData, ['idCliente']: idClienteASetear, ['idProducto']: null, ['idVersion']: null });

    }

    const setearIdVersionTicket = (idVersionASetear) => {
        setTicketData({ ...TicketData, ['idVersion']: idVersionASetear });

    }



    const handleClose = () => {
        setShowCreacionModal(false);

    }


    const getClientes = async () => {
        axios
            .get('https://psa-soporte-squad7.herokuapp.com/tickets/clientes', {

            })
            .then((response) => {
                // console.log(response);
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
                makeDictionarProductsByClient(res.data.compras);

            })
            .catch((err) => {
                console.log(err);
            });
    }


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
    }

    const makeDictionarProductsByClient = async (responsecompras) => {
        const dict = {};
        responsecompras.length > 0 ?
            responsecompras.map((compra) => {
                if (!dict[compra.idCliente]) {
                    dict[compra.idCliente] = [];

                }
                if (
                    !dict[compra.idCliente].includes(compra.idProducto)
                ) {
                    dict[compra.idCliente].push(compra.idProducto);
                }




            }) : console.log("No hay compras");
        setDicci(dict);
    }


    useEffect(() => {


        getClientes();

        getProductos();
        getVersiones();
        getCompras();
        getRecursos();




    }, []);




    return (
        <>


            <Modal dialogClassName="modalContent" show={showCreacionModal} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear Ticket </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Snackbar open={alertaDatosNulos} autoHideDuration={2000} onClose={handleCloseAlertaDatosNulos} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert show={alertaDatosNulos} key='danger' variant='danger'>
                            No puedes dejar campos vacios!
                        </Alert>
                    </Snackbar>

                    <div className="div-body-infoticket">

                        <Row className="mt-1">


                            <Col>

                                <Row className="mt-4">
                                    <Col xs={2}>
                                        <h4> T??tulo: </h4>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Control required type="text" name="titulo" onChange={(e) => onChangeTicketEditable(e)} />
                                    </Col>
                                </Row>

                                <Row className="mt-4">

                                    <Col xs={3}>
                                        <h4>Categor??a:</h4>
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
                                    <Col xs={3}>
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
                                                <Dropdown.Item name="criticidad" onClick={(e) => handleDropdownChange(e)}>Cr??tica</Dropdown.Item>

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <Col xs={3}>
                                        <h4>Estado:</h4>
                                    </Col>
                                    <Col>
                                        <Dropdown >
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                                {TicketData.estado ? TicketData.estado : "Seleccionar"}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Abierto</Dropdown.Item>
                                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>En an??lisis</Dropdown.Item>
                                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Derivado</Dropdown.Item>
                                                <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Cancelado</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>

                                </Row>


                                <Row className="mt-5">
                                    <Col xs={3}>
                                        <h4>Fecha de creaci??n:</h4>
                                    </Col>
                                    <Col xs={7}>
                                        <Form.Control type="date" name="fechaCreacion" onChange={(e) => onChangeTicketEditable(e)} />

                                    </Col>

                                </Row>


                                <Row className="mt-5">
                                    <h4> Descripci??n </h4>
                                </Row>
                                <Row className="mt-3">
                                    <textarea className="box-descripcion" name="descripcion" placeholder="Escribe una descripci??n..." onChange={(e) => onChangeTicketEditable(e)} />


                                </Row>

                                <Row className="mt-5">
                                    <h4> Notas </h4>
                                </Row>
                                <Row className="mt-3">
                                    <textarea className="box-notas" name="notas" placeholder="Escribe una nota..." onChange={(e) => onChangeTicketEditable(e)} />

                                </Row>

                            </Col>

                            <Col>



                                <Row className="mt-3">
                                    <h3 className="titulo-subrayado"> Informaci??n Cliente: </h3>
                                </Row>

                                <Row className="mt-4">
                                    <Col xs={3}>
                                        <h4> Nombre:</h4>
                                    </Col>
                                    <Col>
                                        <Dropdown >

                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                                {clientes ?
                                                    TicketData.idCliente ? clientes[TicketData.idCliente - 1]['razon social'] : "Seleccionar"
                                                    : null}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {clientes ?
                                                    clientes.map((cliente) => (
                                                        <Dropdown.Item key={cliente['id']} name="nombreCliente" onClick={(e) => { setearIdClienteTicket(cliente['id']); setIdClienteFilter(cliente["id"]) }}>{cliente["razon social"]}</Dropdown.Item>
                                                    )) : null}

                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <Col xs={3}>
                                        <h4> Medio de Contacto:</h4>
                                    </Col>
                                    <Col xs={7}>
                                        <Form.Control type="text" name="medioContactoCliente" placeholder="Mail o Tel" onChange={(e) => onChangeTicketEditable(e)} />


                                    </Col>




                                </Row>


                                <Row className="mt-5">
                                    <h3 className="titulo-subrayado"> Informaci??n Producto: </h3>
                                </Row>

                                <Row className="mt-3">
                                    <Col xs={3}>
                                        <h4> Nombre: </h4>
                                    </Col>
                                    <Col>

                                        < Dropdown >
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                                {productos ?
                                                    TicketData.idProducto ? productos?.filter(producto => producto.id === TicketData.idProducto && producto.estado === "Activo")[0]['nombre'] : "Seleccionar"
                                                    : <></>}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>


                                                {dicci && productos ?
                                                    dicci[idClienteFilter]?.map((idProducto) => (
                                                        productos.filter(producto => producto.id === idProducto && producto.estado === "Activo").map((producto) =>
                                                            <Dropdown.Item key={idProducto} name="nombreProducto" onClick={
                                                                (e) => {
                                                                    setearIdProductoTicket(idProducto);
                                                                    setIdProductoFilter(idProducto);
                                                                }
                                                            }>
                                                                {producto.nombre}

                                                            </Dropdown.Item>
                                                        ))) : <></>}




                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>

                                <Row className="mt-4">
                                    <Col xs={3}>
                                        <h4> Versi??n:</h4>
                                    </Col>
                                    <Col>
                                        <Dropdown >
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                                {versiones ?
                                                    TicketData.idVersion ? versiones?.filter(version => version.id === TicketData.idVersion)[0]['nombre'] : "Seleccionar"
                                                    : <></>}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>
                                                {/* show versions filtering compras by idclientefilter and idproductofilter */}

                                                {compras && productos && versiones ?
                                                    compras.filter((compra) => compra['idCliente'] === idClienteFilter && compra['idProducto'] === idProductoFilter && versiones.find(version => version.id === compra.idVersion)['estado'] === "Activa")
                                                        .map((compra) => (
                                                            versiones.filter(version => version.id === compra.idVersion).map((version) => (
                                                                //console.log("cacarockaa", versiones[compra['idVersion'] - 1]['nombre']),
                                                                <Dropdown.Item key={compra['id']} name="versionProducto" onClick={(e) => { setearIdVersionTicket(compra['idVersion']); }}>
                                                                    {version.nombre}
                                                                </Dropdown.Item>

                                                            )))) : <></>

                                                }



                                                {/* <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Action</Dropdown.Item>
                                        <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Another action</Dropdown.Item>
                                        <Dropdown.Item name="versionProducto" onClick={(e) => handleDropdownChange(e)}>Something else</Dropdown.Item> */}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>

                                </Row>

                                <Row className="mt-5">
                                    <h3 className="titulo-subrayado"> Informaci??n asesor: </h3>
                                </Row>

                                <Row className="mt-3">

                                    <Col xs={3}>
                                        <h4> Nombre: </h4>
                                    </Col>
                                    <Col>
                                        <Dropdown >
                                            <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="xl">
                                                {TicketData.nombreAsesor ? TicketData.nombreAsesor : "Seleccionar"}
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu>

                                                {recursos ?
                                                    recursos.map((recurso) => (
                                                        <Dropdown.Item key={recurso['legajo']} name="nombreAsesor" id={recurso['legajo']} onClick={(e) => { handleDropdownChangeRecurso(e); }}>{recurso['Nombre']} {recurso['Apellido']}</Dropdown.Item>
                                                    )) : null}
                                            </Dropdown.Menu>


                                        </Dropdown>

                                    </Col>


                                </Row>

                            </Col>
                        </Row>



                    </div>





                </Modal.Body>
                <Modal.Footer>
                    <Row>
                        <Snackbar open={alertaDatosNulos} autoHideDuration={2000} onClose={handleCloseAlertaDatosNulos} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                            <Alert show={alertaDatosNulos} key='danger' variant='danger'>
                                No puedes dejar campos vacios!
                            </Alert>
                        </Snackbar>
                    </Row>
                    <Row>

                        <Col  > <Button onClick={handleConfirmarCreacion}>Crear</Button> </Col>



                        <Col>
                            <Button variant="secondary" onClick={handleClose}>
                                Cerrar
                            </Button>
                        </Col>
                    </Row>

                </Modal.Footer>
            </Modal >

        </>
    )
}


export default ModalCreacionTicket;

