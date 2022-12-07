import './task.css'
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as SERVER_NAMES from "../../APIRoutes";
import ModalInfoProyecto from "../view/ModalInfoProyecto";


export default function CardCustom({project, getProjects, resources, clients}) {
    {/*assignee.legajo!=project.project_manager.id?getAssignee():*/}
    useEffect(() => {
        //getAssignee();
        project.project_manager?setAssignee(resources.find((resource) => resource.legajo == project.project_manager.id)):setAssignee(null);
}, [project]);
    const [assignee, setAssignee] = useState([]);
    //const [clients, setClients] = useState([]);
    const getAssignee = async () => {
        
        if (project.project_manager != null) 
        { axios.get(SERVER_NAMES.ASSIGNEES + "/" + project.project_manager.id
                , {})
            .then((res) => {
                setAssignee(res.data);
            })
            .catch(() => {
                setAssignee({ Nombre: "", Apellido: "" });
            })
        } else{
            //setAssignee({ Nombre: "", Apellido: "" })
            setAssignee(null);
        } 
    };
    const getClients = async () => {
        axios
            .get('https://psa-soporte-squad7.herokuapp.com/tickets/clientes', {
            })
            .then((res) => {
                //setClients(res.data.data);
            })
            .catch(() => {
                //setClients([]);
            });
    };
    /*useEffect(() => {
        getAssignee();
        //getClients();
    }, []);*/
    var statusMapping = {
        "Todos": "Todos", "pending": "PENDIENTE", "analysis": "EN ANALISIS",
        "development": "DESARROLLO", "production": "PRODUCCION", "post_production": "POST-PRODUCCION"
    }
    var typeMapping = { "Todos": "Todos", "client": "DESARROLLO", "support": "SOPORTE" }
    return (
        <Row>
            <Card>
                <Card.Header as="h4">Proyecto #{project.id}</Card.Header>
                <Card.Body>
                    <Card.Title>Nombre: {project.name}</Card.Title>
                    <Card.Text>

                        <ul key="atributos">
                            <li key="description"> Cliente: {
                                project.client_id != null ? clients.find(element => element.id === project.client_id) != null ? clients.find(element => element.id === project.client_id)["razon social"] : "" : "Sin asignar"
                            } </li>
                            <li key="estado"> Estado: {statusMapping[project.status]}</li>
                            <li key="tipo">  Tipo: {typeMapping[project.type]}</li>
                        </ul>

                    </Card.Text>
                    <Card.Footer> Project manager: {assignee?assignee.Nombre:"Sin asignar"} {assignee?assignee.Apellido:""} </Card.Footer>

                    <Button variant="primary" href={`/proyectos/${project.id}/ver-tareas/`}> Ver Tareas</Button>{' '}
                    {' '}
                    {' '}

                    {/* <Button variant="primary" href={`/proyectos/${project.id}/ver-proyecto/`}> Ver Detalles</Button>{' '} */}
                    <ModalInfoProyecto data={project} getDataProyectos={getProjects} recursos2={resources} clientes2={clients}/>
                </Card.Body>
            </Card>



        </Row>


    )
}