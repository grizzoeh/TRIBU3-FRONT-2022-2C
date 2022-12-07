import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalInfoTask.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import moment from "moment";
import * as SERVER_NAMES from "../../../APIRoutes";
import ModalCreacionSubtarea from "./modalCrearSubtask";

const ModalInfoTask = ({ data, getDataProjectTask, project, assignees, allTasks, name}) => {


    const [alertaEdicionExito, setAlertaEdicionExito] = useState(false);

    const [alertaBorradoExito, setAlertaBorradoExito] = useState(false);

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);
    
    const [tareaEditable, setTareaEditable] = useState(data);

    const [editMode, setEditMode] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const [recursos, setRecursos] = useState([]);

    const [tareatest, setTareaTest] = useState([]);

    var inverseStatusMapping = {pending:"PENDIENTE",in_progress:"EN PROGRESO",finished:"FINALIZADO"};
    var statusMapping ={Todos:"Todos",PENDIENTE:"pending","EN PROGRESO":"in_progress",FINALIZADO:"finished"};

    var typeMapping = { "Todos": "Todos", "client": "DESARROLLO", "support": "SOPORTE" };

    const mapIDTaskToTaskObj= (task) => {
        //let tareaPadre = allTasks.find((tarea) => tarea.id == task.parent_task_id)
        //return tareaPadre
        return allTasks.find((tarea) => tarea.id == task.parent_task_id)
      }

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setAlertaEdicionExito(false);
        setAlertaDatosNulos(false);
        setAlertaBorradoExito(false);
    };


    const handleConfirmarEdicion = () => {

        const tareaEditada = {
            name: tareaEditable.name,
            status: tareaEditable.status,
            estimated_finalization_date: moment(tareaEditable.estimated_finalization_date, "YYYY-MM-DD").format(),
            estimated_start_date: moment(tareaEditable.estimated_start_date, "YYYY-MM-DD").format(),
            real_finalization_date: moment(tareaEditable.estimated_finalization_date, "YYYY-MM-DD").format(),
            description: tareaEditable.description,
            estimated_hours_effort: tareaEditable.estimated_hours_effort,
            real_hours_effort: tareaEditable.real_hours_effort,
            priority: tareaEditable.priority,
            parent_task: tareaEditable.parent_task,
            related_ticket: tareaEditable.related_ticket,
            assignees: tareaEditable.assignees.map(r => getIdOrNull(r)),
        }

        if (tareaEditada.name === "" || tareaEditada.name === null) {
            setAlertaDatosNulos(true);
        } else {

            axios
            .patch(
              `${SERVER_NAMES.PROJECTS}/psa/projects/tasks/${data.id}`, tareaEditada)
            .then((data) => {
              if (data.status === 200) {
              }
            })
            .catch((err) => {
              alert("Se produjo un error al editar el proyecto", err);
            });

            setEditMode(false);
            setAlertaEdicionExito(true);
            getDataProjectTask();
        }

    }

    const handleCancelarEdicion = () => {
        setEditMode(false);
        setAlertaDatosNulos(false);
    }

    const handleBorrado = async () => {
        axios.delete(SERVER_NAMES.PROJECTS + `/psa/projects/tasks/${data.id}`)
          .then((data) => {
            if (data.data.ok) {
              console.log("Tarea borrada");
            }
          })
          .catch((error) => {
            console.log(error);
          });

          setAlertaBorradoExito(true);
          getDataProjectTask();
          setTimeout(() => {
            // After 1 second
            handleClose()
          }, 1000)
      }

    const getIdOrNull = (propertie) => {
        return propertie? propertie.id : null;
    }

    const onChangeTareaEditable = (e) => {

        setTareaEditable({ ...tareaEditable, [e.target.name]: e.target.value });
    }

    const handleDropdownChange = (e) => {

        setTareaEditable({ ...tareaEditable, [e.target.name]: e.target.innerHTML });
    }

    const handleStatusChange = (e) => {
        setTareaEditable({
          ...tareaEditable,
          [e.target.name]: statusMapping[e.target.innerHTML],
        });
      };

    const handleResourcesDropdownButtonChange = (e) => {
        setTareaEditable({
          ...tareaEditable,
          resources: e.map((item) => mapResourceIdToObject(item)),
        });
      };

    const handleStakeHolderssDropdownButtonChange = (e) => {
        setTareaEditable({
          ...tareaEditable,
          stake_holders: e.map((item) => mapResourceIdToObject(item)),
        });
        console.log(tareaEditable);

      };

    const mapResourceIdToObject= (resource) => {
        return {"id": resource.legajo}
    }

    const handleDropdownProjectManagerButtonChange = (e) => {
        let newPm = {"id": e.legajo};
        setTareaEditable({...tareaEditable, project_manager: newPm});
    }

    const handleDropdownSponsorButtonChange = (e) => {
        let newSponsor = {"id": e.legajo};
        setTareaEditable({...tareaEditable, sponsor: newSponsor});
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

    const getRecursos = async () => {
        axios
            .get(SERVER_NAMES.ASSIGNEES, {})
            .then((response) => {
                setRecursos(response.data);
            }
            )
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        //getRecursos();
    }, []);

    return (
        <>
            {name?<Button size="sm" variant="primary" onClick={() => { handleShow() }}>{data.name}</Button>
            :<Button size="sm" variant="primary" onClick={() => { handleShow() }}>Ver detalles</Button>}

            <Modal dialogClassName="modalContent" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Tarea #{data.id} </Modal.Title>
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
                                            <Form.Control size="sm" type="text" name="name" value={tareaEditable.name} onChange={(e) => onChangeTareaEditable(e)} />
                                        </Col>

                                    </Row>

                                    <Row className="mt-4">

                                        <Col xs={3}>
                                            <h6>Estado:</h6>
                                        </Col>
                                        <Col >
                                            <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {tareaEditable.status
                                                    ? inverseStatusMapping[tareaEditable.status]
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
                                        <Col xs={4}>
                                            <h6>Fecha estimada de inicio: </h6>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control 
                                                type="date"
                                                name="estimated_start_date"
                                                value={tareaEditable.estimated_start_date ? tareaEditable.estimated_start_date.slice(0,10) : null}
                                                onChange={(e) => onChangeTareaEditable(e)} 
                                            />

                                        </Col>

                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={4}>
                                            <h6>Fecha estimada de fin: </h6>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control 
                                                type="date"
                                                name="estimated_finalization_date"
                                                value={tareaEditable.estimated_finalization_date ? tareaEditable.estimated_finalization_date.slice(0,10) : null}
                                                onChange={(e) => onChangeTareaEditable(e)} 
                                            />

                                        </Col>

                                    </Row>

                                    <Row className="mt-4">
                                        <h6> Descripción </h6>
                                    </Row>
                                    <Row className="mt-1">
                                        <textarea className="box-descripcion" name="description" value={tareaEditable.description} onChange={(e) => onChangeTareaEditable(e)} />
                                    </Row>
                                </Col>

                                <Col>
                                    <Row >
                                        <h5 className="titulo-subrayado"> Relaciones: </h5>
                                    </Row>

                                    <Row className="mt-4">

                                        <Col xs={3}>
                                            <h6>Resonsables:</h6>
                                        </Col>
                                        <Col xs={6}>
                                            {assignees.length>0 && <Select
                                                isMulti
                                                options={assignees}
                                                defaultValue={tareaEditable.assignees && tareaEditable.assignees.map((resource) => {
                                                    //let name = recursos.find((empleado) => empleado.legajo === resource.id).Nombre
                                                    //let surname = recursos.find((empleado) => empleado.legajo === resource.id).Apellido
                                                    //let id = recursos.find((empleado) => empleado.legajo === resource.id).legajo
                                                    //let label = {Nombre: name, Apellido: surname, legajo: id}
                                                    let assignee = assignees.find((empleado) => empleado.legajo === resource.id)
                                                    let label = {Nombre: assignee.Nombre, Apellido: assignee.Apellido, legajo: assignee.legajo}
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
                                            <h6>Prioridad:</h6>
                                        </Col>

                                        <Col xs={6}>
                                            <Form.Control
                                                type="number"
                                                //value={tareaActual.estimated_hours_effort}
                                                min="1"
                                                name="priority"
                                                placeholder={tareaEditable.priority}
                                                onChange={(e) => onChangeTareaEditable(e)} 
                                            />
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
                                            {tareaEditable.name}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4}>
                                            <h6> Estado: </h6>
                                        </Col>
                                        <Col >
                                            {inverseStatusMapping[tareaEditable.status]}
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Fecha estimada de inicio:</h6>
                                        </Col>
                                        <Col>
                                            {tareaEditable.estimated_start_date?moment(tareaEditable.estimated_start_date, "YYYY-MM-DD").format("DD/MM/YYYY"):"Sin asignar"}
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Fecha estimada de fin:</h6>
                                        </Col>
                                        <Col>
                                            {tareaEditable.estimated_finalization_date?moment(tareaEditable.estimated_finalization_date, "YYYY-MM-DD").format("DD/MM/YYYY"):"Sin asignar"}
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <h6> Descripción </h6>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col xs={10}>
                                            <p className="linea-box">
                                                {tareaEditable.description}
                                            </p>
                                        </Col>
                                    </Row>

                                </Col>

                                <Col>
                                    <Row className="mt-6">
                                        <h5 className="titulo-subrayado"> Relaciones: </h5>
                                    </Row>
{/* 
                                    <Row >
                                        <Col sm={4}>
                                            <h5> Project Manager: </h5>
                                        </Col>
                                        <Col >
                                            {getResourceNameFor(recursos, mapProjectResourceObjectToName, tareaEditable.project_manager, "Sin asignar")}
                                        </Col>
                                    </Row>
                                    <Row className="mt-2">
                                        <Col sm={4}>
                                            <h6> Sponsor: </h6>
                                        </Col>
                                        <Col >
                                        {getResourceNameFor(recursos, mapProjectResourceObjectToName, tareaEditable.sponsor, "Sin asignar")}
                                        </Col>
                                    </Row> */}
                                    <Row className="mt-2">
                                        <Col xs={3} >
                                            <h6>Responsables: </h6>
                                        </Col>
                                        { tareaEditable.assignees && tareaEditable.assignees.length > 0
                                            ?  <Row>
                                              <Col>
                                                { tareaEditable.assignees.length > 0 
                                                        ? <ul key="resources-list-view">
                                                            {getResourceNameListFor(assignees, mapProjectResourceObjectToName, tareaEditable.assignees, "resources-task-view-item")} 
                                                        </ul>
                                                        : "Sin asignar"
                                                }
                                            </Col>  

                                                </Row>
                                            : <Col> Sin asignar</Col>
                                        }

                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={3}>
                                            <h6>Prioridad:</h6>
                                        </Col>

                                        <Col xs={6}> {tareaEditable.priority} </Col>
                                    </Row>

                                    {/* {project.type === "support" && <Row className="mt-4"> */}
                                    {<Row className="mt-4">

                                        <Col xs={3}>
                                            <h6>Ticket relacionado:</h6>
                                        </Col>

                                        <Col xs={6}> {`Ticket #${getIdOrNull(tareaEditable.related_ticket) ? getIdOrNull(tareaEditable.related_ticket): "Sin asignar"}`} </Col>
                                    </Row>
                                    }
                                    {tareaEditable.parent_task_id && <Row className="mt-5">
                                        <Col>
                                        <h6>Tarea padre:</h6>
                                        </Col>
                                        <Col xs={9}>
                                            {"Tarea #" + tareaEditable.parent_task_id }
                                            {/*<ModalInfoTask data={mapIDTaskToTaskObj(tareaEditable)} getDataProjectTask={getDataProjectTask} project={project} assignees={assignees} allTasks={allTasks} name={1}/>*/}
                                        </Col>
                                    </Row>}

                                    {tareaEditable.dependencies.length > 0 && <Row className="mt-5">
                                        <Col>
                                        <h6>Dependencias:</h6>
                                        </Col>
                                        {tareaEditable.dependencies.map((dependency) => <Col className="columna" xs={-1}><ModalInfoTask data={dependency} getDataProjectTask={getDataProjectTask} project={project} assignees={assignees} name={1}/></Col>)}
                                    </Row>}
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
                            <Col><Button variant="danger" onClick={handleBorrado}> Borrar </Button> </Col>
                            {/* <Col> <Button onClick={() => setShowCreacionTareaModal(true)}>Crear Tarea Asociada</Button> </Col> */}
                            <ModalCreacionSubtarea parent_task={tareaEditable} project={project} assignees={assignees}/>

                            {/*data.dependencies.length > 0 && 
                                <ModalInfoTask data={data.dependencies[0]} getDataProjectTask={getDataProjectTask} project={project} assignees={assignees}/>
                            */}
                            

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


export default ModalInfoTask;
