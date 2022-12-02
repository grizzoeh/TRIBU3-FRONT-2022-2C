import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalInfoTicketEnCurso.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import ModalReporteFinal from "../modalReporteFinal/ModalReporteFinal";
import ModalCreacionTarea from "../modalCreacionTarea/ModalCreacionTarea";
import Alert from 'react-bootstrap/Alert';
import { Snackbar } from "@mui/material";

import { SERVER_NAME_SOPORTE } from "../../environment";




const ModalInfoTicketEnCurso = ({ numeroTicket, data, getDataEnCurso, getDataCerrados, setTicketResueltoExito }) => {

    const vertical = "top"
    const horizontal = "center"

    const [clientes, setClientes] = useState();

    const [productos, setProductos] = useState();

    const [versiones, setVersiones] = useState();

    const [compras, setCompras] = useState();

    const [alertaEdicionExito, setAlertaEdicionExito] = useState(false);
    const handleCloseEdicionExito = () => setAlertaEdicionExito(false);

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);
    const handleCloseAlertaDatosNulos = () => setAlertaDatosNulos(false);

    const [alertaTareaExito, setAlertaTareaExito] = useState(false);
    const handleCloseAlertaTareaExito = () => setAlertaTareaExito(false);

    const [ticketEditable, setTicketEditable] = useState(data);

    const [editMode, setEditMode] = useState(false);


    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const [idClienteFilter, setIdClienteFilter] = useState(data.idCliente);


    const [idProductoFilter, setIdProductoFilter] = useState(data.idProducto);

    const [dicci, setDicci] = useState();

    const [recursos, setRecursos] = useState();



    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setAlertaEdicionExito(false);
        setAlertaDatosNulos(false);
        setAlertaTareaExito(false);


    };


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

        if (ticketEditado.id === null || ticketEditado.id === "" || ticketEditado.titulo === null || ticketEditado.titulo === "" || ticketEditado.categoria === null || ticketEditado.categoria === "" || ticketEditado.criticidad === null || ticketEditado.criticidad === "" || ticketEditado.estado === null || ticketEditado.estado === "" || ticketEditado.fechaCreacion === null || ticketEditado.fechaCreacion === "" || ticketEditado.idCliente === null || ticketEditado.idCliente === "" || ticketEditado.descripcion === null || ticketEditado.descripcion === "" || ticketEditado.medioContactoCliente === null || ticketEditado.medioContactoCliente === "" || ticketEditado.idProducto === null || ticketEditado.idProducto === "" || ticketEditado.idAsesor === null || ticketEditado.idAsesor === "" || ticketEditado.nombreAsesor === null || ticketEditado.nombreAsesor === "" || ticketEditado.areaAsesor === null || ticketEditado.areaAsesor === "" || ticketEditado.idVersion === null || ticketEditado.idVersion === "") {
            setAlertaDatosNulos(true);
        } else {

            axios.patch(SERVER_NAME_SOPORTE + "/tickets/ticket", ticketEditado)
                .then((data) => {
                    if (data.data.ok) {
                        console.log("Ticket editado");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });

            data.id = ticketEditable.id;
            data.titulo = ticketEditable.titulo;
            data.categoria = ticketEditable.categoria;
            data.criticidad = ticketEditable.criticidad;
            data.estado = ticketEditable.estado;
            data.fechaCreacion = ticketEditable.fechaCreacion;
            data.idCliente = ticketEditable.idCliente;
            data.descripcion = ticketEditable.descripcion;
            data.medioContactoCliente = ticketEditable.medioContactoCliente;
            data.idProducto = ticketEditable.idProducto;
            data.idAsesor = ticketEditable.idAsesor;
            data.nombreAsesor = ticketEditable.nombreAsesor;
            data.areaAsesor = ticketEditable.areaAsesor;
            data.notas = ticketEditable.notas;
            data.idVersion = ticketEditable.idVersion;


            setEditMode(false);
            setAlertaEdicionExito(true);
            getDataEnCurso();
            getDataEnCurso();
        }



    }
    const handleCancelarEdicion = () => {


        // getDataEnCurso();
        // getDataEnCurso();
        setEditMode(false);
        setAlertaDatosNulos(false);
    }

    const onChangeTicketEditable = (e) => {

        setTicketEditable({ ...ticketEditable, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {

        setTicketEditable({ ...ticketEditable, [e.target.name]: e.target.innerHTML });
    }

    const handleDropdownChangeRecurso = (e) => {

        setTicketEditable({ ...ticketEditable, [e.target.name]: e.target.innerHTML, ['idAsesor']: e.target.id });

    }

    const [showReporteFinalModal, setShowReporteFinalModal] = useState(false);

    const onChangeshowReporteFinalModal = (newSomeState) => {
        setShowReporteFinalModal(newSomeState);
    };

    const [showCreacionTareaModal, setShowCreacionTareaModal] = useState(false);

    const onChangeshowCreacionTareaModal = (newSomeState) => {
        setShowCreacionTareaModal(newSomeState);
    };


    const getClientes = async () => {
        axios
            .get('/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {

            })
            .then((response) => {
                const arr = [];

                Object.keys(response.data).forEach(key => arr.push(response.data[key]));
                setClientes(arr);
                // console.log((response.data));
                // console.log(typeof (response.data));
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

    const makeDictionarProductsByClient = async (comprasresponse) => {
        const dict = {};
        comprasresponse.length > 0 ?
            comprasresponse.map((compra) => {
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

        getProductos();
        getRecursos();
        getVersiones();
        getClientes();
        getCompras();


    }, []);

    useEffect(() => {

        //makeDictionarProductsByClient();
    }, []);



    return (
        <>
            <Button size="sm" variant="primary" onClick={() => { handleShow() }}>Información</Button>

            <Modal dialogClassName="modalContent" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Ticket #{numeroTicket} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Snackbar open={alertaEdicionExito} autoHideDuration={2000} onClose={handleCloseEdicionExito} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert show={alertaEdicionExito} variant='success'>
                            Ticket editado con exito!
                        </Alert>
                    </Snackbar>

                    <Snackbar open={alertaTareaExito} autoHideDuration={2000} onClose={handleCloseAlertaTareaExito} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert show={alertaTareaExito} variant='success'>
                            Tarea creada con exito!
                        </Alert>
                    </Snackbar>


                    {editMode ? (
                        //DENTRO DE EDIT MODE BODY
                        <div className="div-body-infoticket">
                            <Snackbar open={alertaDatosNulos} autoHideDuration={2000} onClose={handleCloseAlertaDatosNulos} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                                <Alert show={alertaDatosNulos} key='danger' variant='danger'>
                                    No puedes dejar campos vacios!
                                </Alert>
                            </Snackbar>
                            <Row className="mt-4">

                                <Col>
                                    <Row>
                                        <Col sm={2}>
                                            <h6 > Título: </h6>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control size="sm" type="text" name="titulo" value={ticketEditable.titulo} onChange={(e) => onChangeTicketEditable(e)} />
                                        </Col>

                                    </Row>

                                    <Row className="mt-4">

                                        <Col xs={3}>
                                            <h6>Categoría:</h6>
                                        </Col>
                                        <Col >
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {ticketEditable.categoria}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item name="categoria" onClick={(e) => { handleDropdownChange(e); }}>Consulta</Dropdown.Item>
                                                    <Dropdown.Item name="categoria" onClick={(e) => handleDropdownChange(e)}>Reclamo</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={3}>
                                            <h6>Criticidad:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
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
                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={3}>
                                            <h6>Estado:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
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
                                        <Col xs={4}>
                                            <h6>Fecha de creación: </h6>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control type="date" name="fechaCreacion" value={ticketEditable.fechaCreacion.slice(0, 10)} onChange={(e) => onChangeTicketEditable(e)} />

                                        </Col>

                                    </Row>


                                    <Row className="mt-4">
                                        <h6> Descripción </h6>
                                    </Row>
                                    <Row className="mt-1">

                                        <textarea className="box-descripcion" name="descripcion" value={ticketEditable.descripcion} onChange={(e) => onChangeTicketEditable(e)} />


                                    </Row>

                                    <Row className="mt-4">
                                        <h6> Notas </h6>
                                    </Row>
                                    <Row className="mt-1">
                                        <textarea className="box-notas" name="notas" value={ticketEditable.notas} onChange={(e) => onChangeTicketEditable(e)} />

                                    </Row>

                                </Col>

                                <Col>


                                    <Row >
                                        <h5 className="titulo-subrayado"> Información Cliente: </h5>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col>
                                            <h6> Nombre:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {clientes?.filter(cliente => cliente.id === ticketEditable.idCliente)[0]['razon social']

                                                    }

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {clientes ?
                                                        clientes.map((cliente) => (
                                                            <Dropdown.Item key={cliente['id']} name="nombreCliente" onClick={(e) => {
                                                                setTicketEditable({ ...ticketEditable, ['idCliente']: cliente["id"], ['idProducto']: null, ['idVersion']: null });
                                                                setIdClienteFilter(cliente["id"]);
                                                            }}>{cliente["razon social"]}</Dropdown.Item>
                                                        )) : null}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col>
                                            <h6> Medio de Contacto:</h6>
                                        </Col>
                                        <Col>
                                            <Form.Control type="text" name="medioContactoCliente" value={ticketEditable.medioContactoCliente} onChange={(e) => onChangeTicketEditable(e)} />


                                        </Col>

                                    </Row>

                                    <Row className="mt-2">

                                        <Col>
                                            <h6 > CUIT: </h6>
                                        </Col>
                                        <Col>
                                            {clientes ?
                                                clientes.filter(cliente => cliente.id === ticketEditable.idCliente)[0]['CUIT']

                                                : null}

                                        </Col>

                                    </Row>



                                    <Row className="mt-4">
                                        <h5 className="titulo-subrayado"> Información Producto: </h5>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col>
                                            <h6> Nombre: </h6>
                                        </Col>
                                        <Col>
                                            {Object.keys(dicci).length > 0 ?
                                                <Dropdown >
                                                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                        {ticketEditable.idProducto ?
                                                            productos?.filter(producto => producto.id === ticketEditable.idProducto)[0]['nombre']
                                                            : "Seleccionar"}
                                                    </Dropdown.Toggle>

                                                    <Dropdown.Menu>
                                                        {/* {
                                                        productos ?
                                                            compras?.filter(compra => compra.idCliente === idClienteFilter).map((compra) => (
                                                                <Dropdown.Item name="nombreProducto" onClick={(e) => {
                                                                    setTicketEditable({ ...ticketEditable, ['idProducto']: compra["idProducto"] });
                                                                    setIdProductoFilter(compra["idProducto"]);
                                                                }}>{productos?.filter(producto => producto.id === compra["idProducto"])[0]['nombre']}</Dropdown.Item>
                                                            )) : null} */}
                                                        {dicci && productos ?
                                                            dicci[idClienteFilter]?.map((idProducto) => (
                                                                productos.filter(producto => producto.id === idProducto && producto.estado === "Activo").map((producto) =>
                                                                    <Dropdown.Item key={idProducto} name="nombreProducto" onClick={
                                                                        (e) => {
                                                                            setTicketEditable({ ...ticketEditable, ['idProducto']: idProducto, ['idVersion']: null });
                                                                            setIdProductoFilter(idProducto);
                                                                        }
                                                                    } >
                                                                        {producto["nombre"]}
                                                                    </Dropdown.Item>
                                                                ))) : <></>}

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                : <></>}
                                        </Col >

                                    </Row >
                                    {/* <Button onClick={console.log(Array
                                        .from(new Set(compras?.filter(compra => compra.idCliente === idClienteFilter).map((compra) => (
                                            productos?.filter(producto => producto.id === compra["idProducto"])[0]['nombre']
                                        )))))}>asd</Button> */}

                                    {/* <Button onClick={dicci[1] ? console.log("dic", dicci[1]) :
                                        console.log("no")
                                    }>loll</Button> */}









                                    <Row className="mt-4">
                                        <Col>
                                            <h6> Versión:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {ticketEditable.idVersion ?
                                                        versiones?.filter(version => version.id === ticketEditable.idVersion)[0]['nombre']
                                                        : "Seleccionar"
                                                    }
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {compras && productos && versiones ?
                                                        compras.filter((compra) => compra['idCliente'] === idClienteFilter && compra['idProducto'] === idProductoFilter && versiones.find(version => version.id === compra.idVersion)['estado'] === "Activa")
                                                            .map((compra) => (
                                                                versiones.filter(version => version.id === compra.idVersion).map((version) => (

                                                                    //console.log("cacarockaa", versiones[compra['idVersion'] - 1]['nombre']),
                                                                    <Dropdown.Item key={compra['id']} name="versionProducto" onClick={(e) => { setTicketEditable({ ...ticketEditable, ['idVersion']: compra['idVersion'] }); }}>
                                                                        {version.nombre}
                                                                    </Dropdown.Item>
                                                                )))) : <></>

                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>

                                    </Row>

                                    <Row className="mt-5">
                                        <h5 className="titulo-subrayado"> Información asesor: </h5>
                                    </Row>



                                    <Row className="mt-4">

                                        <Col>
                                            <h5> Nombre: </h5>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {ticketEditable.nombreAsesor}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>

                                                    {recursos ?
                                                        recursos.map((recurso) => (
                                                            <Dropdown.Item name="nombreAsesor" key={recurso['legajo']} id={recurso['legajo']} onClick={(e) => { handleDropdownChangeRecurso(e); }}>{recurso['Nombre']} {recurso['Apellido']}</Dropdown.Item>
                                                        )) : null}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>

                                    </Row>

                                </Col >

                            </Row >




                        </div >
                    ) : (
                        // FUERA DE EDIT MODE BODY
                        <div className="div-body-infoticket">
                            <Row >

                                <Col>

                                    <Row >
                                        <Col sm={4}>
                                            <h5> Título: </h5>
                                        </Col>
                                        <Col >
                                            {data.titulo}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4}>
                                            <h6> Categoría: </h6>
                                        </Col>
                                        <Col >
                                            {data.categoria}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4} >
                                            <h6>Criticidad:   </h6>
                                        </Col>
                                        <Col>
                                            {data.criticidad}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">

                                        <Col sm={4}>
                                            <h6>Estado: </h6>
                                        </Col>
                                        <Col >
                                            {data.estado}
                                        </Col>

                                    </Row>


                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Fecha de creación:</h6>
                                        </Col>
                                        <Col >
                                            {data.fechaCreacion.slice(0, 10)}
                                        </Col>

                                    </Row>


                                    <Row className="mt-3">
                                        <h6> Descripción </h6>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col xs={10}>
                                            <p className="linea-box">
                                                {data.descripcion}
                                            </p>
                                        </Col>
                                    </Row>


                                    <Row className="mt-2">
                                        <h6> Notas </h6>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col xs={10}>
                                            <p className="linea-box">
                                                {data.notas}
                                            </p>
                                        </Col>
                                    </Row>

                                </Col>

                                <Col>


                                    <Row >
                                        <h5 className="titulo-subrayado"> Información Cliente: </h5>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col>
                                            <h6> Nombre:  </h6>
                                        </Col>
                                        <Col>

                                            {clientes ?
                                                clientes.filter(cliente => cliente.id === data.idCliente)[0]['razon social']

                                                : null}

                                        </Col>
                                    </Row>

                                    <Row className="mt-2">

                                        <Col>
                                            <h6> Medio de Contacto: </h6>
                                        </Col>
                                        <Col>
                                            {data.medioContactoCliente}
                                        </Col>

                                    </Row>

                                    <Row className="mt-2">

                                        <Col>
                                            <h6> CUIT: </h6>
                                        </Col>
                                        <Col>
                                            {clientes ?
                                                clientes.filter(cliente => cliente.id === data.idCliente)[0]['CUIT']

                                                : null}

                                        </Col>

                                    </Row>



                                    <Row className="mt-4">
                                        <h5 className="titulo-subrayado"> Información Producto: </h5>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col>
                                            <h6> Nombre: </h6>
                                        </Col>
                                        <Col>
                                            {productos && data.idProducto ?
                                                productos.filter(producto => producto.id === data.idProducto)[0]['nombre']
                                                : null}
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">

                                        <Col>
                                            <h6> Versión:   </h6>
                                        </Col>
                                        <Col>
                                            {versiones && data.idVersion ?
                                                versiones.filter(version => version.id === data.idVersion)[0]['nombre']
                                                : null}
                                        </Col>

                                    </Row>

                                    <Row className="mt-4">
                                        <h5 className="titulo-subrayado"> Información asesor: </h5>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <h6> Nombre:</h6>
                                        </Col>
                                        <Col>
                                            {data.nombreAsesor}
                                        </Col>
                                    </Row>



                                </Col>

                            </Row>



                        </div>
                    )
                    }




                </Modal.Body >
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
                                <Button onClick={() => { setTicketEditable(data); setEditMode(true) }}>Editar</Button>
                            </Col>
                            <Col xs={1}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Cerrar
                                </Button>
                            </Col>
                        </Fragment>


                    )}

                    {showReporteFinalModal ? (
                        <ModalReporteFinal numeroTicket={numeroTicket} onChangeshowReporteFinalModal={onChangeshowReporteFinalModal} handleCloseTicket={handleClose} getDataEnCurso={getDataEnCurso} getDataCerrados={getDataCerrados} setTicketResueltoExito={setTicketResueltoExito} />) :
                        (
                            null)}

                    {showCreacionTareaModal ? (
                        <ModalCreacionTarea numeroTicket={numeroTicket} onChangeshowCreacionTareaModal={onChangeshowCreacionTareaModal} setAlertaTareaExito={setAlertaTareaExito} />) :
                        (
                            null)}
                </Modal.Footer>
            </Modal >
        </>
    )
}


export default ModalInfoTicketEnCurso;

