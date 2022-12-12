import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalInfoProyecto.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import moment from "moment";
import * as SERVER_NAMES from "../../APIRoutes";
import ModalInfoBorrarProyecto from "./ModaleInfoBorrarProyecto";


const ModalInfoProyecto = ({ data, getDataProyectos, recursos, clientes, setRefreshKey}) => {


    const [cliente, setClientes] = useState();

    const [alertaEdicionExito, setAlertaEdicionExito] = useState(false);

    const [alertaBorradoExito, setAlertaBorradoExito] = useState(false);

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);
    
    const [proyectoEditable,    setProyectoEditable] = useState(data);

    const [editMode, setEditMode] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const [recurso, setRecursos] = useState([]);

    var inverseStatusMapping = {pending:"PENDIENTE",analysis:"EN ANALISIS",development:"DESARROLLO", production: "PRODUCCION", post_production: "POST PRODUCTION"};
    var statusMapping ={Todos:"Todos",PENDIENTE:"pending","ANALISIS":"analysis",
    DESARROLLO:"development",PRODUCCION:"production","POST PRODUCCION":"post_production"};

    var typeMapping = { "Todos": "Todos", "client": "DESARROLLO", "support": "SOPORTE" };


    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setAlertaEdicionExito(false);
        setAlertaDatosNulos(false);
        setAlertaBorradoExito(false);
        setRefreshKey(oldKey => oldKey +1);
    };


    const handleConfirmarEdicion = () => {

        const proyectoEditado = {
            name: proyectoEditable.name,
            status: proyectoEditable.status,
            estimated_finalization_date: proyectoEditable.estimated_finalization_date ? moment(proyectoEditable.estimated_finalization_date, "YYYY-MM-DD").format() : null,
            estimated_start_date: proyectoEditable.estimated_start_date ? moment(proyectoEditable.estimated_start_date, "YYYY-MM-DD").format(): null,
            description: proyectoEditable.description,
            client: proyectoEditable.client_id,
            project_manager: getIdOrNull(proyectoEditable.project_manager),
            sponsor: getIdOrNull(proyectoEditable.sponsor),
            resources: proyectoEditable.resources.map(r => getIdOrNull(r)),
            stakeholders: proyectoEditable.stake_holders.map(r => getIdOrNull(r)),
        }

        if (proyectoEditado.name === "" || proyectoEditado.name === null) {
            setAlertaDatosNulos(true);
        } else {


            console.log(proyectoEditado);

            axios
            .patch(
              `${SERVER_NAMES.PROJECTS}/psa/projects/${data.id}`,
              proyectoEditado
            )
            .then((data) => {
              if (data.status === 200) {
                console.log("Proyecto editado");
              }
            })
            .catch((err) => {
              alert("Se produjo un error al editar el proyecto", err);
            });

            setEditMode(false);
            setAlertaEdicionExito(true);
            getDataProyectos();
        }



    }

    const handleCancelarEdicion = () => {
        setEditMode(false);
        setAlertaDatosNulos(false);
    }

    const handleBorrado = async () => {
        axios.delete(SERVER_NAMES.PROJECTS + `/psa/projects/${data.id}`)
          .then((data) => {
            if (data.data.ok) {
              console.log("Proyecto borrado");
            }
          })
          .catch((error) => {
            console.log(error);
          });

          setAlertaBorradoExito(true);
          getDataProyectos();
          setTimeout(() => {
            // After 1 second
            handleClose()
          }, 1000)
      }

    const getIdOrNull = (propertie) => {
        return propertie? propertie.id : null;
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
          status: statusMapping[e.target.innerHTML],
        });
      };

    const handleResourcesDropdownButtonChange = (e) => {
        setProyectoEditable({
          ...proyectoEditable,
          resources: e.map((item) => mapResourceIdToObject(item)),
        });
      };

    const handleStakeHolderssDropdownButtonChange = (e) => {
        setProyectoEditable({
          ...proyectoEditable,
          stake_holders: e.map((item) => mapResourceIdToObject(item)),
        });
        console.log(proyectoEditable);

      };

    const mapResourceIdToObject= (resource) => {
        return {"id": resource.legajo}
    }

    const handleDropdownProjectManagerButtonChange = (e) => {
        let newPm = {"id": e.legajo};
        setProyectoEditable({...proyectoEditable, project_manager: newPm});
    }

    const handleDropdownSponsorButtonChange = (e) => {
        let newSponsor = {"id": e.legajo};
        setProyectoEditable({...proyectoEditable, sponsor: newSponsor});
    }

    const mapProjectResourceObjectToName = (recursos, projectResource) => {
        return projectResource ? 
            recursos.filter((recurso) => recurso.legajo === projectResource.id)
                    .map((recurso) => `${recurso.Nombre} ${recurso.Apellido}`)
            : "Sin asignar" ;
    }

    const mapClientIdToName = (clientes, projectClientId) => {
        let asd = clientes.filter((cliente) => cliente.id === projectClientId)
                        .map((client) => `${client["razon social"]}`);
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
                    (field) => <li key={`${tag}-${field.id}`}> {nameMapper(resources, field)} </li>
                )
        }
    }


    const getClientes = async () => {
        axios
            .get('/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {

            })
            .then((response) => {
                //setClientes(response.data);
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
                //setRecursos(response.data);
            }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {

        //getRecursos();
        //getClientes();
        //setRecursos(recursos2);
        //setClientes(clientes2);
    }, []);

    return (
        <>
            <Button size="sm" variant="outline-primary" onClick={() => { handleShow() }}>Ver detalles</Button>

            <Modal dialogClassName="modalContent" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Proyecto #{data.id} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert show={alertaEdicionExito} variant='success'>
                        Proyecto editado con exito.

                    </Alert>
                    <Alert show={alertaBorradoExito} variant='success'>
                        Proyecto borrado con exito.
                    </Alert>

                    {editMode ? (
                        //DENTRO DE EDIT MODE BODY
                        <div className="div-body-infoticket">
                            <Alert show={alertaDatosNulos} key='danger' variant='danger'>
                                No puedes dejar el nombre vacio.
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

                                    <Row className="mt-2">
                                        <Col sm={2}>
                                            <h6>Estado:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {proyectoEditable.status
                                                    ? inverseStatusMapping[proyectoEditable.status]
                                                    : "Seleccionar"}

                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}>PENDIENTE</Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}>ANALISIS</Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}>DESARROLLO</Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}>PRODUCCION</Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}>POST PRODUCCION</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                    <Row className="mt-2">
                                        <Col sm={4}>
                                            <h6>Fecha estimada de inicio: </h6>
                                        </Col>
                                        <Col>
                                            <Form.Control 
                                                type="date"
                                                name="estimated_start_date"
                                                value={proyectoEditable.estimated_start_date ? proyectoEditable.estimated_start_date.slice(0,10) : null}
                                                onChange={(e) => onChangeProyectoEditable(e)} 
                                            />

                                        </Col>

                                    </Row>

                                    <Row className="mt-2">
                                        <Col xs={4}>
                                            <h6>Fecha estimada de fin: </h6>
                                        </Col>
                                        <Col>
                                            <Form.Control 
                                                type="date"
                                                name="estimated_finalization_date"
                                                value={proyectoEditable.estimated_finalization_date ? proyectoEditable.estimated_finalization_date.slice(0,10) : null}
                                                onChange={(e) => onChangeProyectoEditable(e)} 
                                            />

                                        </Col>

                                    </Row>

                                    <Row className="mt-2">
                                        <Col sm={2}>
                                            <h6> Cliente:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {proyectoEditable.client_id ? getResourceNameFor(clientes, mapClientIdToName, proyectoEditable.client_id, "Sin asignar"): "Sin asignar"}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {clientes ?
                                                        clientes.map((cliente) => (
                                                            <Dropdown.Item key={cliente['id']} name="nombreCliente" onClick={(e) => {
                                                                setProyectoEditable({ ...proyectoEditable, ['client_id']: cliente["id"]});
                                                            }}>{cliente["razon social"]}</Dropdown.Item>
                                                        )) : null}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <h6> Descripción </h6>
                                    </Row>
                                    <Row className="mt-1">
                                        <textarea className="box-descripcion" name="description" value={proyectoEditable.description} onChange={(e) => onChangeProyectoEditable(e)} />
                                    </Row>
                                </Col>

                                <Col>
                                    <Row >
                                        <h5 className="titulo-subrayado"> Información Staff: </h5>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={3}>
                                            <h6>Project Manager:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {getResourceNameFor(recursos, mapProjectResourceObjectToName, proyectoEditable.project_manager, "Sin asignar")}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {recursos ?
                                                        recursos.map((recurso) => {
                                                            return <Dropdown.Item key={`dropwdown-item-pm-${recurso.legajo}`} name="project_manager" onClick={(e) => {
                                                                handleDropdownProjectManagerButtonChange(recurso)
                                                            }}>{`${recurso.Nombre} ${recurso.Apellido}`}</Dropdown.Item>
}                                                       ) : null}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={3}>
                                            <h6>Sponsor:</h6>
                                        </Col>
                                        <Col>
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {getResourceNameFor(recursos, mapProjectResourceObjectToName, proyectoEditable.sponsor, "Sin asignar")}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    {recursos ?
                                                        recursos.map((recurso) => {
                                                            return <Dropdown.Item key={`dropwdown-item-sponsor-${recurso.legajo}`} name="sponsor" onClick={(e) => {
                                                                handleDropdownSponsorButtonChange(recurso)
                                                            }}>{`${recurso.Nombre} ${recurso.Apellido}`}</Dropdown.Item>
}                                                       ) : null}
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
                                                    let name = recursos.find((empleado) => empleado.legajo === resource.id).Nombre
                                                    let surname = recursos.find((empleado) => empleado.legajo === resource.id).Apellido
                                                    let id = recursos.find((empleado) => empleado.legajo === resource.id).legajo
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
                                            <h6>Stakeholders:</h6>
                                        </Col>
                                        <Col xs={6}>
                                            {recursos.length>0 && <Select
                                                isMulti
                                                options={recursos}
                                                defaultValue={proyectoEditable.stake_holders.map((resource) => {
                                                    let name = recursos.find((empleado) => empleado.legajo === resource.id).Nombre
                                                    let surname = recursos.find((empleado) => empleado.legajo === resource.id).Apellido
                                                    let id = recursos.find((empleado) => empleado.legajo === resource.id).legajo
                                                    let label = {Nombre: name, Apellido: surname, legajo: id}
                                                    return label
                                                })}
                                                getOptionLabel={(resource) =>
                                                `${resource.Nombre} ${resource.Apellido}`
                                                }
                                                getOptionValue={(resource) => resource.legajo}
                                                onChange={handleStakeHolderssDropdownButtonChange}
                                            />}
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
                                            {proyectoEditable.estimated_start_date?moment(proyectoEditable.estimated_start_date, "YYYY-MM-DD").format("DD/MM/YYYY"):"Sin asignar"}
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Fecha estimada de fin:</h6>
                                        </Col>
                                        <Col>
                                            {proyectoEditable.estimated_finalization_date?moment(proyectoEditable.estimated_finalization_date, "YYYY-MM-DD").format("DD/MM/YYYY"):"Sin asignar"}
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Cliente:</h6>
                                        </Col>
                                        <Col>
                                            {getResourceNameFor(clientes, mapClientIdToName, proyectoEditable.client_id, "Sin asignar")}
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
                                        { proyectoEditable.resources && proyectoEditable.resources.length > 0
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
                                        { proyectoEditable.stake_holders && proyectoEditable.stake_holders.length > 0
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
                            {/* <Col><Button variant="danger" onClick={handleShow}> Borrar </Button> </Col> */}
                            {/* <Col> <Button onClick={() => setShowCreacionTareaModal(true)}>Crear Tarea Asociada</Button> </Col> */}
                            <Col> <ModalInfoBorrarProyecto data={data} getDataProyectos={getDataProyectos} setAlertaBorradoExito={setAlertaBorradoExito} handleClosePadre={handleClose}/> </Col>

                           
    
                            <Col xs={-1}>
                                <Button onClick={() => setEditMode(true)}>Editar</Button>
                            </Col>
                            <Col xs={1}>
                                <Button variant="secondary" onClick={handleClose}>
                                    Volver
                                </Button>
                            </Col>
                        </Fragment>
                    )



                    }
                </Modal.Footer>
            </Modal >
        </>
    )
}


export default ModalInfoProyecto;

