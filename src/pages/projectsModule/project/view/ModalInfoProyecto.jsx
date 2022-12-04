import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalInfoTicketEnCurso.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import moment from "moment";
import * as SERVER_NAMES from "../../APIRoutes";



const ModalInfoProyecto = ({ data, getDataProyectos, recursos2 }) => {


    const [clientes, setClientes] = useState();

    const [alertaEdicionExito, setAlertaEdicionExito] = useState(false);

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);

    //const [alertaTareaExito, setAlertaTareaExito] = useState(false);


    const [proyectoEditable, setProyectoEditable] = useState(data);

    const [editMode, setEditMode] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const [idClienteFilter, setIdClienteFilter] = useState(data.idCliente);

    const [recursos, setRecursos] = useState([]);

    const [projectManagerButtonTitle, setProjectManagerButtonTitle] = useState("Seleccionar");

    var inverseStatusMapping = {pending:"PENDIENTE",analysis:"EN ANALISIS",development:"DESARROLLO", production: "PRODUCCION", post_production: "POST PRODUCTION"};
    var statusMapping ={Todos:"Todos",PENDIENTE:"pending","ANALISIS":"analysis",
    DESARROLLO:"development",PRODUCCION:"production","POST PRODUCCION":"post_production"};

    var typeMapping = { "Todos": "Todos", "client": "DESARROLLO", "support": "SOPORTE" };


    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setAlertaEdicionExito(false);
        setAlertaDatosNulos(false);
        //setAlertaTareaExito(false);


    };


    const handleConfirmarEdicion = () => {

        const ticketEditado = {
            id: proyectoEditable.id,
            name: proyectoEditable.name,
            categoria: proyectoEditable.categoria,
            criticidad: proyectoEditable.criticidad,
            estado: proyectoEditable.estado,
            fechaCreacion: proyectoEditable.fechaCreacion,
            idCliente: proyectoEditable.idCliente,
            descripcion: proyectoEditable.descripcion,
            medioContactoCliente: proyectoEditable.medioContactoCliente,
            idProducto: proyectoEditable.idProducto,
            idAsesor: proyectoEditable.idAsesor,
            nombreAsesor: proyectoEditable.nombreAsesor,
            areaAsesor: proyectoEditable.areaAsesor,
            notas: proyectoEditable.notas,
            idVersion: proyectoEditable.idVersion,
        }

        if (ticketEditado.id === null || ticketEditado.id === "" || ticketEditado.titulo === null || ticketEditado.titulo === "" || ticketEditado.categoria === null || ticketEditado.categoria === "" || ticketEditado.criticidad === null || ticketEditado.criticidad === "" || ticketEditado.estado === null || ticketEditado.estado === "" || ticketEditado.fechaCreacion === null || ticketEditado.fechaCreacion === "" || ticketEditado.idCliente === null || ticketEditado.idCliente === "" || ticketEditado.descripcion === null || ticketEditado.descripcion === "" || ticketEditado.medioContactoCliente === null || ticketEditado.medioContactoCliente === "" || ticketEditado.idProducto === null || ticketEditado.idProducto === "" || ticketEditado.idAsesor === null || ticketEditado.idAsesor === "" || ticketEditado.nombreAsesor === null || ticketEditado.nombreAsesor === "" || ticketEditado.areaAsesor === null || ticketEditado.areaAsesor === "" || ticketEditado.notas === null || ticketEditado.notas === "" || ticketEditado.idVersion === null || ticketEditado.idVersion === "") {
            setAlertaDatosNulos(true);
        } else {

            // axios.patch(SERVER_NAME_SOPORTE + "/tickets/ticket", ticketEditado)
            //     .then((data) => {
            //         if (data.data.ok) {
            //             console.log("Ticket editado");
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });


            setEditMode(false);
            setAlertaEdicionExito(true);
            getDataProyectos();
            //getDataProyectos();
        }



    }
    const handleCancelarEdicion = () => {
        setEditMode(false);
        setAlertaDatosNulos(false);
    }

    const onChangeProyectoEditable = (e) => {

        setProyectoEditable({ ...proyectoEditable, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {

        setProyectoEditable({ ...proyectoEditable, [e.target.name]: e.target.innerHTML });
    }

    const handleStatusChange = (e) => {
        setProyectoEditable({
          ...proyectoEditable,
          [e.target.name]: statusMapping[e.target.innerHTML],
        });
      };

    const handleResourcesDropdownButtonChange = (e) => {
        setProyectoEditable({
          ...proyectoEditable,
          resources: e.map((item) => item.legajo),
        });
      };

    const [showReporteFinalModal, setShowReporteFinalModal] = useState(false);

    const onChangeshowReporteFinalModal = (newSomeState) => {
        setShowReporteFinalModal(newSomeState);
    };

    const [showCreacionTareaModal, setShowCreacionTareaModal] = useState(false);

    const onChangeshowCreacionTareaModal = (newSomeState) => {
        setShowCreacionTareaModal(newSomeState);
    };

    const handleDropdownProjectManagerButtonChange = (e) => {
        setProyectoEditable({ ...proyectoEditable, project_manager: e });
        let selectedProjectManager = recursos.find(
          (projectManager) => projectManager.legajo === e
        );
        setProjectManagerButtonTitle(
          `${selectedProjectManager.Nombre} ${selectedProjectManager.Apellido}`
        );
      };
    

    const getProjectManagerButtonTitle = (resources) => {
        if (resources.length !== 0) {
            if (data.project_manager) {
                let selectedProjectManager = resources.find(
                  (projectManager) =>
                    projectManager.legajo === data.project_manager.id
                );
                setProjectManagerButtonTitle(
                  typeof selectedProjectManager!== 'undefined'?`${selectedProjectManager.Nombre} ${selectedProjectManager.Apellido}`:"Selecionar"
                );
            }
            else setProjectManagerButtonTitle("Seleccionar");
          }
    }

    const mapProjectResourceObjectToName = (recursos, projectResource) => {
        return projectResource ? 
            recursos.filter((recurso) => recurso.legajo === projectResource.id)
                    .map((recurso) => `${recurso.Nombre} ${recurso.Apellido}`)
            : "Sin asignar" ;
    }

    const mapProjectResourceIdToName = (recursos, projectResourceId) => {
        let asd = recursos.filter((recurso) => recurso.legajo === projectResourceId)
                        .map((recurso) => `${recurso.Nombre} ${recurso.Apellido}`);
        console.log("mapeado:")
        console.log(projectResourceId   );
        return asd;
    }

    const getResourceNameFor = (resources, nameMapper, projectField, defaultValue) => {
        return resources 
            ? nameMapper(resources, projectField)
            : defaultValue;
    }

    const getResourceNameListFor = (resources, nameMapper, projectField, tag) => {
        if (projectField != null) {
            return projectField.map(
                    (field) => <li key={`${tag}-${field}`}> {nameMapper(resources, field)} </li>
                )
        }
    }


    const getClientes = async () => {
        axios
            .get('/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {

            })
            .then((response) => {
                setClientes(response.data);
            }
            )
            .catch((error) => {
                console.log(error);
            });
        //setClientes([{ "id": 1, "razon social": "FIUBA", "CUIT": "20-12345678-2" }, { "id": 2, "razon social": "FSOC", "CUIT": "20-12345678-5" }, { "id": 3, "razon social": "Macro", "CUIT": "20-12345678-3" }])
    }

    const getRecursos = async () => {
        axios
            .get(SERVER_NAMES.ASSIGNEES, {})
            .then((response) => {
                setRecursos(response.data);
                getProjectManagerButtonTitle(response.data)
            }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {

        getRecursos();
        getClientes();

    }, []);

    return (
        <>
            <Button size="sm" variant="primary" onClick={() => { handleShow() }}>Ver detalles</Button>

            <Modal dialogClassName="modalContent" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Proyecto #{data.id} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert show={alertaEdicionExito} variant='success'>
                        Proyecto editado con exito.

                    </Alert>

                    {/* <Alert show={alertaTareaExito} variant='success'>
                        Tarea creada con exito!

                    </Alert> */}


                    {editMode ? (
                        //DENTRO DE EDIT MODE BODY
                        <div className="div-body-infoticket">
                            <Alert show={alertaDatosNulos} key='danger' variant='danger'>
                                No puedes dejar todos los campos vacios.
                            </Alert>
                            <Row className="mt-4">

                                <Col>
                                    <Row>
                                        <Col sm={2}>
                                            <h6 > Nombre: </h6>
                                        </Col>
                                        <Col sm={6}>
                                            <Form.Control size="sm" type="text" name="name" value={proyectoEditable.name} onChange={(e) => onChangeProyectoEditable(e)} />
                                        </Col>

                                    </Row>

                                    <Row className="mt-4">

                                        <Col xs={3}>
                                            <h6>Estado:</h6>
                                        </Col>
                                        <Col >
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {proyectoEditable.categoria}
                                                    {proyectoEditable.categoria
                                                    ? inverseStatusMapping[proyectoEditable.status]
                                                    : "Seleccionar"}

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}> PENDIENTE </Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}> ANALISIS </Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}> DESARROLLO </Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}> PRODUCCION </Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}> POST PRODUCCION </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">

                                        <Col xs={3}>
                                            <h6>Recursos:</h6>
                                        </Col>
                                        <Col xs={6}>
                                        {recursos.length>0 && <Select
                                            isMulti
                                            options={recursos}
                                            defaultValue={proyectoEditable.resources.map((resource) => {
                                                let name = recursos.find((empleado) => empleado.legajo === resource).Nombre
                                                let surname = recursos.find((empleado) => empleado.legajo === resource).Apellido
                                                let id = recursos.find((empleado) => empleado.legajo === resource).legajo
                                                let label = {Nombre: name, Apellido: surname, legajo: id}
                                                return label
                                            })}
                                            getOptionLabel={(resource) =>
                                            `${resource.Nombre} ${resource.Apellido}`
                                            }
                                            getOptionValue={(resource) => resource.legajo}
                                            onChange={handleResourcesDropdownButtonChange}
                                        />}
                                        </Col>

                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={3}>
                                            <h6>Project Manager:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm"
                                                    title={projectManagerButtonTitle} 
                                                    onSelect={handleDropdownProjectManagerButtonChange}>
                                                </Dropdown.Toggle>
                                                

                                                <Dropdown.Menu>
                                                {recursos.map((projectManager) => {
                                                    return (
                                                        <Dropdown.Item
                                                        eventKey={projectManager.legajo}
                                                        name="projectManager"
                                                        >
                                                        {`${projectManager.Nombre} ${projectManager.Apellido}`}
                                                        </Dropdown.Item>
                                                    );
                                                    })}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                    {/* <Row className="mt-4">
                                        <Col xs={3}>
                                            <h6>Estado:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {proyectoEditable.estado}
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
                                            <Form.Control type="date" name="fechaCreacion" value={proyectoEditable.fechaCreacion.slice(0, 10)} onChange={(e) => onChangeProyectoEditable(e)} />

                                        </Col>

                                    </Row>


                                    <Row className="mt-4">
                                        <h6> Descripción </h6>
                                    </Row>
                                    <Row className="mt-1">

                                        <textarea className="box-descripcion" name="descripcion" value={proyectoEditable.descripcion} onChange={(e) => onChangeProyectoEditable(e)} />


                                    </Row>

                                    <Row className="mt-4">
                                        <h6> Notas </h6>
                                    </Row>
                                    <Row className="mt-1">
                                        <textarea className="box-notas" name="notas" value={proyectoEditable.notas} onChange={(e) => onChangeProyectoEditable(e)} />

                                    </Row> */}

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
                                                    {clientes.filter(cliente => cliente.id === proyectoEditable.client_id)[0]['razon social']
                                                    }

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {clientes ?
                                                        clientes.map((cliente) => (
                                                            <Dropdown.Item key={cliente['id']} name="nombreCliente" onClick={(e) => {
                                                                setProyectoEditable({ ...proyectoEditable, ['client_id']: cliente["id"]});
                                                                setIdClienteFilter(cliente["id"]);
                                                            }}>{cliente["razon social"]}</Dropdown.Item>
                                                        )) : null}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                    {/* <Row className="mt-4">
                                        <Col>
                                            <h6> Medio de Contacto:</h6>
                                        </Col>
                                        <Col>
                                            <Form.Control type="text" name="medioContactoCliente" value={proyectoEditable.medioContactoCliente} onChange={(e) => onChangeProyectoEditable(e)} />


                                        </Col>

                                    </Row> */}

                                    <Row className="mt-2">

                                        <Col>
                                            <h6 > CUIT: </h6>
                                        </Col>
                                        <Col>
                                            {clientes ?
                                                clientes.filter(cliente => cliente.id === proyectoEditable.idCliente)[0]['CUIT']

                                                : null}

                                        </Col>

                                    </Row>





                                {/* 
                                    <Row className="mt-4">
                                        <Col>
                                            <h6> Versión:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {proyectoEditable.idVersion ?
                                                        versiones?.filter(version => version.id === proyectoEditable.idVersion)[0]['nombre']
                                                        : "Seleccionar"
                                                    }
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {compras && productos && versiones ?
                                                        compras.filter((compra) => compra['idCliente'] === idClienteFilter && compra['idProducto'] === idProductoFilter)
                                                            .map((compra) => (
                                                                //console.log("cacarockaa", versiones[compra['idVersion'] - 1]['nombre']),
                                                                <Dropdown.Item key={compra['id']} name="versionProducto" onClick={(e) => { setProyectoEditable({ ...proyectoEditable, ['idVersion']: compra['idVersion'] }); }}> {versiones.filter(version => version.id === compra['idVersion'])[0]['nombre']}</Dropdown.Item>)) : null

                                                    }
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>

                                    </Row> */}

                                    <Row className="mt-5">
                                        <h5 className="titulo-subrayado"> Información asesor: </h5>
                                    </Row>



                                    <Row className="mt-4">

                                        <Col>
                                            <h5> Nombre: </h5>
                                        </Col>
                                        {/* <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {proyectoEditable.nombreAsesor}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>

                                                    {recursos ?
                                                        recursos.map((recurso) => (
                                                            <Dropdown.Item name="nombreAsesor" key={recurso['legajo']} id={recurso['legajo']} onClick={(e) => { handleDropdownChangeRecurso(e); }}>{recurso['Nombre']} {recurso['Apellido']}</Dropdown.Item>
                                                        )) : null}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col> */}

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
                                            <h5> Nombre: </h5>
                                        </Col>
                                        <Col >
                                            {proyectoEditable.name}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4}>
                                            <h6> Estado: </h6>
                                        </Col>
                                        <Col >
                                            {inverseStatusMapping[proyectoEditable.status]}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4} >
                                            <h6>Tipo:   </h6>
                                        </Col>
                                        <Col>
                                           {typeMapping[proyectoEditable.type]}
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Fecha estimada de inicio:</h6>
                                        </Col>
                                        <Col>
                                            {proyectoEditable.estimated_start_date?moment(proyectoEditable.estimated_start_date, "YYYY-MM-DD").format("DD.MM.YYYY"):"Sin asignar"}
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Fecha estimada de fin:</h6>
                                        </Col>
                                        <Col>
                                            {proyectoEditable.estimated_finalization_date?moment(proyectoEditable.estimated_finalization_date, "YYYY-MM-DD").format("DD.MM.YYYY"):"Sin asignar"}
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Cliente:</h6>
                                        </Col>
                                        <Col>
                                            {clientes ?
                                                clientes.filter(cliente => cliente.id === proyectoEditable.client_id)[0]['razon social']
                                                : null
                                            }
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <h6> Descripción </h6>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col xs={10}>
                                            <p className="linea-box">
                                                {proyectoEditable.description}
                                            </p>
                                        </Col>
                                    </Row>

                                </Col>

                                <Col>
                                    <Row className="mt-6">
                                        <h5 className="titulo-subrayado"> Información Staff: </h5>
                                    </Row>

                                    <Row >
                                        <Col sm={4}>
                                            <h5> Project Manager: </h5>
                                        </Col>
                                        <Col >
                                            {getResourceNameFor(recursos, mapProjectResourceObjectToName, proyectoEditable.project_manager, "Sin asignar")}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4}>
                                            <h6> Sponsor: </h6>
                                        </Col>
                                        <Col >
                                        {getResourceNameFor(recursos, mapProjectResourceObjectToName, proyectoEditable.sponsor, "Sin asignar")}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4} >
                                            <h6>Recursos: </h6>
                                        </Col>
                                        { proyectoEditable.resources.length > 0
                                            ?  <Row>
                                              <Col>
                                                { proyectoEditable.resources.length > 0 
                                                        ? <ul key="resources-list-view">
                                                            {getResourceNameListFor(recursos, mapProjectResourceObjectToName, proyectoEditable.resources, "resources-view-item")} 
                                                        </ul>
                                                        : "Sin asignar"
                                                }
                                            </Col>  

                                                </Row>
                                            : <Col> Sin asignar</Col>
                                        }

                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4} >
                                            <h6>Stakeholders: </h6>
                                        </Col>
                                        { proyectoEditable.stake_holders.length > 0
                                            ?  <Row>
                                              <Col>
                                                { proyectoEditable.stake_holders.length > 0 
                                                        ? <ul key="stake-holder-list-view">
                                                            {getResourceNameListFor(recursos, mapProjectResourceObjectToName, proyectoEditable.stake_holders, "stake-holder-view-item")} 
                                                        </ul>
                                                        : "Sin asignar"
                                                }
                                            </Col>  

                                                </Row>
                                            : <Col> Sin asignar</Col>
                                        }
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
                            {/* <Col xs={1}><Button onClick={() => setShowReporteFinalModal(true)}> Resolver </Button> </Col> */}
                            {/* <Col> <Button onClick={() => setShowCreacionTareaModal(true)}>Crear Tarea Asociada</Button> </Col> */}
                            <Col xs={-1}>
                                <Button onClick={() => setEditMode(true)}>Editar</Button>
                            </Col>
                            <Col xs={1}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Volver
                                </Button>
                            </Col>
                        </Fragment>


                    )}

                    {/* {showReporteFinalModal ? (
                        <ModalReporteFinal numeroProyecto={numeroProyecto} onChangeshowReporteFinalModal={onChangeshowReporteFinalModal} handleCloseTicket={handleClose} getDataEnCurso={getDataEnCurso} getDataCerrados={getDataCerrados} setTicketResueltoExito={setTicketResueltoExito} />) :
                        (
                            null)} */}

                    {/* {showCreacionTareaModal ? (
                        <ModalCreacionTarea numeroProyecto={numeroProyecto} onChangeshowCreacionTareaModal={onChangeshowCreacionTareaModal} setAlertaTareaExito={setAlertaTareaExito} />) :
                        (
                            null)} */}
                </Modal.Footer>
            </Modal >
        </>
    )
}


export default ModalInfoProyecto;

