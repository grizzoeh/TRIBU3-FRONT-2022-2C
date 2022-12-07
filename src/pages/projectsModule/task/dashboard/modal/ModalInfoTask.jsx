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
import DropdownButton from "react-bootstrap/DropdownButton";
import ModalInfoBorrarTarea from "./ModalInfoBorrarTarea";


const ModalInfoTask = ({ data, getDataProjectTask, project, assignees, allTasks, name, setRefreshKey}) => {


    const [alertaEdicionExito, setAlertaEdicionExito] = useState(false);

    const [alertaBorradoExito, setAlertaBorradoExito] = useState(false);

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);
    
    const [tareaEditable, setTareaEditable] = useState(data);

    const [editMode, setEditMode] = useState(false);

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const [recursos, setRecursos] = useState([]);

    const [tareatest, setTareaTest] = useState([]);

    const [parentTaskTitle, setParentTaskTitle] = useState('Sin asignar');


    var inverseStatusMapping = {pending:"PENDIENTE",in_progress:"EN PROGRESO",finished:"FINALIZADO"};
    var statusMapping ={Todos:"Todos",PENDIENTE:"pending","EN PROGRESO":"in_progress",FINALIZADO:"finished"};

    var typeMapping = { "Todos": "Todos", "client": "DESARROLLO", "support": "SOPORTE" };

    const mapIDTaskToTaskName= (task) => {
        //let tareaPadre = allTasks.find((tarea) => tarea.id == task.parent_task_id)
        //return tareaPadre
        return allTasks ? allTasks.find((tarea) => tarea.id === task.parent_task_id).name : "Sin Asignar"
      }

    const handleClose = () => {
        setShow(false);
        setEditMode(false);
        setAlertaEdicionExito(false);
        setAlertaDatosNulos(false);
        setAlertaBorradoExito(false);
        //setRefreshKey(oldKey => oldKey +1);
    };


    const handleConfirmarEdicion = () => {
        console.log("tarea editable:")
        console.log(tareaEditable)


        let parent_task_selected;
        try {
            parent_task_selected = tareaEditable.parent_task_id === null ? null : (tareaEditable.parent_task_id * 1);
          } catch (error) {
            console.error(error);
            parent_task_selected = null;
          }

        const tareaEditada = {
            name: tareaEditable.name,
            status: tareaEditable.status,
            estimated_finalization_date: tareaEditable.estimated_finalization_date ? moment(tareaEditable.estimated_finalization_date, "YYYY-MM-DD").format() : null,
            estimated_start_date: tareaEditable.estimated_start_date ? moment(tareaEditable.estimated_start_date, "YYYY-MM-DD").format(): null,
            real_finalization_date: tareaEditable.real_finalization_date ? moment(tareaEditable.real_finalization_date, "YYYY-MM-DD").format(): null,
            description: tareaEditable.description,
            estimated_hours_effort: tareaEditable.estimated_hours_effort,
            real_hours_effort: tareaEditable.real_hours_effort,
            priority: tareaEditable.priority,
            parent_task: isNaN(parent_task_selected) ? null : parent_task_selected,
            assignees: tareaEditable.assignees.map(r => getIdOrNull(r)),
        }

        if (tareaEditada.name === "" || tareaEditada.name === null) {
            setAlertaDatosNulos(true);
        } else {

            console.log(tareaEditada)
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
            //setRefreshKey(oldKey => oldKey +1)
            //getDataProjectTask();
        }

    }

    const handleCancelarEdicion = () => {
        setEditMode(false);
        setAlertaDatosNulos(false);
    }

    const handleBorrado = async () => {
        // axios.delete(SERVER_NAMES.PROJECTS + `/psa/projects/tasks/${data.id}`)
        //   .then((data) => {
        //     if (data.data.ok) {
        //       console.log("Tarea borrada");
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });

          console.log("Borrado")

          setAlertaBorradoExito(true);
          setRefreshKey(oldKey => oldKey +1)
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

    const handleDependencyDropdownButtonChange = (e) => {
        console.log("Logueo e: ")
        console.log(e)
        setTareaEditable({ ...tareaEditable, parent_task: e });
    };

    const handleDropdownChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.innerHTML)

        setTareaEditable({ ...tareaEditable, [e.target.name]: e.target.innerHTML });
    }

    const isInDependecies = (task) => {
         return tareaEditable.dependencies.map(t => t.id).includes(task.id)
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
          assignees: e.map((item) => mapResourceIdToObject(item)),
        });
      };

      const handlParentTaskButtonChange = (e) => {
        handleDropdownChange(e)
        setParentTaskTitle({});
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
                        Tarea editada con exito.

                    </Alert>
                    <Alert show={alertaBorradoExito} variant='success'>
                        Tarea borrada con exito.
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
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}>PENDIENTE</Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}>EN PROGRESO</Dropdown.Item>
                                                    <Dropdown.Item name="status" onClick={(e) => handleStatusChange(e)}>FINALIZADO</Dropdown.Item>                                            
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
                                        <Col xs={4}>
                                            <h6>Fecha real de finalizacion: </h6>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control 
                                                type="date"
                                                name="real_finalization_date"
                                                value={tareaEditable.real_finalization_date ? tareaEditable.real_finalization_date.slice(0,10) : null}
                                                onChange={(e) => onChangeTareaEditable(e)} 
                                            />

                                        </Col>

                                    </Row>


                                    <Row className="mt-4">
                                        <Col xs={4}>
                                            <h6>Prioridad: </h6>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                name="priority"
                                                placeholder={tareaEditable.priority}
                                                onChange={(e) => onChangeTareaEditable(e)}
                                            />
                                        </Col>

                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={4}>
                                            <h6>Horas de esfuerzo estimadas: </h6>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                name="estimated_hours_effort"
                                                placeholder={tareaEditable.estimated_hours_effort}
                                                onChange={(e) => onChangeTareaEditable(e)}
                                            />
                                        </Col>

                                    </Row>

                                    <Row className="mt-4">
                                        <Col xs={4}>
                                            <h6>Horas de esfuerzo reales: </h6>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control
                                                type="number"
                                                min="1"
                                                name="real_hours_effort"
                                                placeholder={tareaEditable.real_hours_effort}
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

                                        <Col xs={4}>
                                            <h6>Responsables:</h6>
                                        </Col>
                                        <Col xs={6}>
                                            {assignees.length>0 && <Select
                                                isMulti
                                                options={assignees}
                                                defaultValue={tareaEditable.assignees && tareaEditable.assignees.map((resource) => {
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
                                        <Col xs={4}>
                                            <h6>Tarea padre:</h6>
                                        </Col>
                                        <Col xs={6}>
                                        <Dropdown >
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                                    {tareaEditable.parent_task_id ? mapIDTaskToTaskName(tareaEditable) : "Sin asignar"}
                                                </Dropdown.Toggle>


                                                <Dropdown.Menu>
                                                    {allTasks ?
                                                        allTasks.filter((task) => (task.id !== tareaEditable.id) && !isInDependecies(task) )
                                                        .map((task) => (
                                                            <Dropdown.Item key={`dropwdown-item-parent-edit-${tareaEditable.id}-${task.id}`} name="parent_task" onClick={(e) => {
                                                                setTareaEditable({ ...tareaEditable, ['parent_task_id']: task.id});
                                                            }}>{`${task.name}`}</Dropdown.Item>
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

                                    <Row className="mt-2">
                                        <Col sm={4}>
                                            <h6> Tipo: </h6>
                                        </Col>
                                        <Col >
                                            {tareaEditable.parent_task_id === null ? "Tarea": "Subtarea"}
                                        </Col>
                                    </Row>

                                    <Row className="mt-3">
                                        <Col sm={4}>
                                            <h6>Fecha de creacion:</h6>
                                        </Col>
                                        <Col>
                                            {tareaEditable.creation_date?moment(tareaEditable.creation_date, "YYYY-MM-DD").format("DD/MM/YYYY"):"Sin asignar"}
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
                                        <Col sm={4}>
                                            <h6>Fecha real de finalizacion:</h6>
                                        </Col>
                                        <Col>
                                            {tareaEditable.real_finalization_date?moment(tareaEditable.real_finalization_date, "YYYY-MM-DD").format("DD/MM/YYYY"):"Sin asignar"}
                                        </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col sm={4}>
                                            <h6>Prioridad:</h6>
                                        </Col>

                                        <Col> {tareaEditable.priority} </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col sm={4}>
                                            <h6>Horas de esfuerzo estimadas:</h6>
                                        </Col>

                                        <Col> {tareaEditable.estimated_hours_effort ? tareaEditable.estimated_hours_effort : "Sin asignar"} </Col>
                                    </Row>

                                    <Row className="mt-4">
                                        <Col sm={4}>
                                            <h6>Horas de esfuerzo reales:</h6>
                                        </Col>

                                        <Col> {tareaEditable.real_hours_effort ? tareaEditable.real_hours_effort : "Sin asignar"} </Col>
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

                                    <Row className="mt-5">
                                        <Col>
                                        <h6>Tarea padre:</h6>
                                        </Col>
                                        <Col xs={9}>
                                            { tareaEditable.parent_task_id ? "Tarea #" + tareaEditable.parent_task_id : "Sin asignar" }
                                            {/*<ModalInfoTask data={mapIDTaskToTaskObj(tareaEditable)} getDataProjectTask={getDataProjectTask} project={project} assignees={assignees} allTasks={allTasks} name={1}/>*/}
                                        </Col>
                                    </Row>

                                    <Row className="mt-5">
                                        <Col>
                                        <h6>Dependencias:</h6>
                                        </Col>
                                            { tareaEditable.dependencies.length > 0 
                                                ? <ul> {tareaEditable.dependencies.map(
                                                        (dependency) => <li className="columna" key={`dependency-button-view-${dependency.id}`} xs={6}><ModalInfoTask data={dependency} getDataProjectTask={getDataProjectTask} project={project} assignees={assignees} name={1}/> </li>
                                                        )}
                                                    </ul>
                                                : <Col xs={9}>{"Sin asignar"}</Col>
                                            }
                                    </Row>

                                    {project.type === "support" && <Row className="mt-4">

                                    <Col>
                                        <h6>Ticket relacionado:</h6>
                                    </Col>

                                    <Col xs={9}> {`${getIdOrNull(tareaEditable.related_ticket) ? "Ticket #" + getIdOrNull(tareaEditable.related_ticket): "Sin asignar"}`} </Col>
                                    </Row>
                                    }
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
                            {/* <Col><Button variant="danger" onClick={handleBorrado}> Borrar </Button> </Col> */}
                            <Col><ModalInfoBorrarTarea data={data} getDataTareas={getDataProjectTask} setRefreshKey={setRefreshKey} setAlertaBorradoExito={setAlertaBorradoExito} handleClosePadre={handleClose}>   </ModalInfoBorrarTarea></Col>
                            <ModalCreacionSubtarea parent_task={tareaEditable} project={project} assignees={assignees}/>
                        
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

