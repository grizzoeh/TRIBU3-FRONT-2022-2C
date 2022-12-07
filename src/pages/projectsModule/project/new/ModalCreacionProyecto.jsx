import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalCreacionProyecto.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Snackbar } from "@mui/material";
import * as SERVER_NAMES from "../../APIRoutes";
import Select from "react-select";
import moment from "moment";


const ModalCreacionProyecto = ({ clientes, recursos, onChangeshowCreacionTareaModal }) => {

    const vertical = "top"
    const horizontal = "center"

    const [alertaDatosNulos, setAlertaDatosNulos] = useState(false);

    const [show, setShow] = useState(true);

    const [tipoSeleccionado, setTipoSeleccionado] = useState("");

    var typeMapping = {"Desarrollo": "client", "Soporte": "support" };

    const [alertaProyectoExito, setAlertaProyectoExito] = useState(false);
    const [alertaProyectoFalla, setAlertaProyectoFalla] = useState(false);


    const initialProject = {
        name: null,
        type: null,
        description: null,
        project_manager: null,
        sponsor: null,
        client: null,
        resources: [],
        stakeholders: [],
        estimated_start_date: null,
        estimated_finalization_date: null,
      };
    
      const [sponsorButtonTitle, setSponsorButtonTitle] = useState('Seleccionar');
      const [projectManagerButtonTitle, setProjectManagerButtonTitle] = useState('Seleccionar');
      const [clientButtonTitle, setClientButtonTitle] = useState('Seleccionar');
    //   const [fechaInicioButtonTittle, setFechaInicioButonTittle] = useState(null);
    //   const [fechaInicioButtonTittle, setFechaInicioButonTittle] = useState(null);


      const [projectData, setProjectData] = useState(initialProject);
    
      const handleDropdownSponsorsButtonChange = (e) => {
        let selectedSponsor = recursos.find((sponsor) => sponsor.legajo === e.legajo);
        setProjectData({ ...projectData, sponsor: e.legajo });
        setSponsorButtonTitle(`${selectedSponsor.Nombre} ${selectedSponsor.Apellido}`);
      };
    
      const handleDropdownProjectManagerButtonChange = (e) => {
        let selectedProjectManager = recursos.find((projectManager) => projectManager.legajo === e.legajo);
        setProjectData({ ...projectData, project_manager: selectedProjectManager.legajo });
        setProjectManagerButtonTitle(`${selectedProjectManager.Nombre} ${selectedProjectManager.Apellido}`);
      };
    
      const handleDropdownClientButtonChange = (e) => {
        let selectedClient = clientes.find((client) => client.id === e.id);
        setProjectData({ ...projectData, client: e.id });
        setClientButtonTitle(selectedClient["razon social"]);
      };
    

    const handleClose = () => {
        onChangeshowCreacionTareaModal(false)

    };

    const [cuerpoProyecto, setCuerpoProyecto] = useState({});

    const onChangeTipo = (e) => {
        setProjectData({ ...projectData, [e.target.name]: typeMapping[e.target.innerHTML] });
        setTipoSeleccionado(e.target.innerHTML)
    };

    const onChangeProyectoAttributes = (e) => {

        setProjectData({ ...projectData, [e.target.name]: e.target.value });
    }

    const onChangeProyectoFechaAttribute = (e) => {
        setProjectData(
            { ...projectData,
                [e.target.name]: moment(e.target.value, "YYYY-MM-DD").format()
            });
    }

    const handleDropdownChange = (e) => {
        setProjectData({ ...projectData, [e.target.name]: e.target.innerHTML });
    };
    
    const handleResourcesDropdownButtonChange = (e) => {
        setProjectData({ ...projectData, resources: e.map((item) => item.legajo) });
    };

    const handleStakeHoldersDropdownButtonChange = (e) => {
        setProjectData({ ...projectData, stakeholders: e.map((item) => item.legajo) });
    };

    const handleCloseAlertaDatosNulos = () => {
        setAlertaDatosNulos(false);
    };

    const handleCloseAlertaProyectoExito = () => {
        setAlertaProyectoExito(false);
    };

    const handleCloseAlertaProyectoFalla = () => {
        setAlertaProyectoFalla(false);
    };


    const crearProyecto = async () => {

        if (projectData.name === "" || projectData.type === "" || projectData.name === null || projectData.type === null) {
            setAlertaDatosNulos(true);
            setTimeout(() => { setAlertaDatosNulos(false)}, 3000)
        }
        else {

            console.log(projectData)

            axios.post(SERVER_NAMES.PROJECTS + `/psa/projects/`, projectData)
                .then((data) => {
                    if (data.status === 200) {
                        console.log("Proyecto creado");
                        setAlertaProyectoExito(true);
                            setTimeout(() => { handleClose() }, 2000)
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setAlertaProyectoFalla(true);
                });

        }
    }

    useEffect(() => {
    }, []);


    return (
        <>
            <Modal dialogClassName="modalContentTarea" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Nuevo proyecto:  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Snackbar open={alertaDatosNulos} autoHideDuration={1500} onClose={handleCloseAlertaDatosNulos} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert size={"xs"} show={alertaDatosNulos} key='danger' variant='danger'>
                            El campo nombre y/o tipo no pueden quedar vacios.
                        </Alert>
                    </Snackbar>
                    <Snackbar open={alertaProyectoExito} autoHideDuration={2000} onClose={handleCloseAlertaProyectoExito} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert show={alertaProyectoExito} variant='success'>
                            El proyecto fue creado correctamente.
                        </Alert>
                    </Snackbar>
                    <Snackbar open={alertaProyectoFalla} autoHideDuration={1500} onClose={handleCloseAlertaProyectoFalla} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                        <Alert size={"xs"} show={alertaProyectoFalla} key='danger' variant='danger'>
                           Hubo un error al querer crear el proyecto.
                        </Alert>
                    </Snackbar>
                    <Row className="mt-1">
                        <Col xs={1} md={2}>
                            <h5>Nombre:</h5>
                        </Col>
                        <Col xs={3} >
                            <Form.Control size="sm" type="text" name="name" onChange={(e) => onChangeProyectoAttributes(e)} />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6> Tipo:</h6>
                        </Col>
                        <Col >
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {tipoSeleccionado !== "" ? tipoSeleccionado : "Selecciona un tipo"}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item name="type" id="tipo-client" onClick={(e) => onChangeTipo(e)}>Desarrollo</Dropdown.Item>
                                    
                                    <Dropdown.Item name="type" id="tipo-support" onClick={(e) => onChangeTipo(e)}>Soporte</Dropdown.Item>


                                </Dropdown.Menu>
                            </Dropdown>

                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6>Cliente:</h6>
                        </Col>
                        <Col>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {clientButtonTitle}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {clientes ?
                                        clientes.map((client) => {
                                            return <Dropdown.Item key={`dropwdown-create-project-item-client-${client.id}`} name="client" onClick={(e) => {
                                                handleDropdownClientButtonChange(client)
                                            }}>{`${client["razon social"]}`}</Dropdown.Item>
}                                       ) : null}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>


                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6>Fecha estimada de inicio: </h6>
                        </Col>
                        <Col xs={6}>
                            <Form.Control 
                                type="date"
                                name="estimated_start_date"
                                // value={fechaInicioButtonTittle ? fechaInicioButtonTittle.slice(0,10) : null}
                                value = {null}
                                onChange={(e) => onChangeProyectoFechaAttribute(e)} 
                            />

                        </Col>
                    </Row>


                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6>Fecha estimada de fin: </h6>
                        </Col>
                        <Col xs={6}>
                            <Form.Control 
                                type="date"
                                name="estimated_finalization_date"
                                // value={fechaInicioButtonTittle ? fechaInicioButtonTittle.slice(0,10) : null}
                                value = {null}
                                onChange={(e) => onChangeProyectoFechaAttribute(e)} 
                            />

                        </Col>
                    </Row>


                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6>Project Manager:</h6>
                        </Col>
                        <Col>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {projectManagerButtonTitle}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {recursos ?
                                        recursos.map((recurso) => {
                                            return <Dropdown.Item key={`dropwdown-create-project-item-pm-${recurso.legajo}`} name="project_manager" onClick={(e) => {
                                                handleDropdownProjectManagerButtonChange(recurso)
                                            }}>{`${recurso.Nombre} ${recurso.Apellido}`}</Dropdown.Item>
}                                       ) : null}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6>Sponsor:</h6>
                        </Col>
                        <Col>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {sponsorButtonTitle}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {recursos ?
                                        recursos.map((recurso) => {
                                            return <Dropdown.Item key={`dropwdown-create-project-item-sponsor-${recurso.legajo}`} name="sponsor" onClick={(e) => {
                                                handleDropdownSponsorsButtonChange(recurso)
                                            }}>{`${recurso.Nombre} ${recurso.Apellido}`}</Dropdown.Item>
}                                       ) : null}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6>Recursos:</h6>
                        </Col>
                        <Col xs={6}>
                            {recursos.length>0 && <Select
                                isMulti
                                options={recursos}
                                defaultValue={"Seleccionar"}
                                getOptionLabel={(resource) =>
                                `${resource.Nombre} ${resource.Apellido}`
                                }
                                getOptionValue={(resource) => resource.legajo}
                                onChange={handleResourcesDropdownButtonChange}
                            />}
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col sm={2}>
                            <h6>Stakeholders:</h6>
                        </Col>
                        <Col xs={6}>
                            {recursos.length>0 && <Select
                                isMulti
                                options={recursos}
                                defaultValue={"Seleccionar"}
                                getOptionLabel={(resource) =>
                                `${resource.Nombre} ${resource.Apellido}`
                                }
                                getOptionValue={(resource) => resource.legajo}
                                onChange={handleStakeHoldersDropdownButtonChange}
                            />}
                        </Col>
                    </Row>


                    <h6 className="mt-4">Descripción</h6>
                    <textarea className="box-reporte-final mt-4" name="description" placeholder="Una descripción del proyecto..." onChange={(e) => onChangeProyectoAttributes(e)} />


                </Modal.Body>
                <Modal.Footer>

                    <Col xs={10}>
                        <Button variant="secondary" onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Col>

                    <Col>
                        <Button variant="primary" onClick={crearProyecto}>
                            Confirmar creación
                        </Button>
                    </Col>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalCreacionProyecto;

