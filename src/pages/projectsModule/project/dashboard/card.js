import './task.css'
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as SERVER_NAMES from "../../APIRoutes";

export default function CardCustom({project}) {
    {/*assignee.legajo!=project.project_manager.id?getAssignee():*/}
    useEffect(() => {
        getAssignee();
}, [project]);
    const [assignee, setAssignee] = useState([]);
    const [clients, setClients] = useState([]);
    const getAssignee = async () => {
        axios
            .get(SERVER_NAMES.ASSIGNEES+ "/"+project.project_manager.id
                , {})
            .then((res) => {
                setAssignee(res.data);
            })
            .catch(() => {
                setAssignee({ Nombre: "", Apellido: "" });
            });
    };
    const getClients = async () => {
        axios
        .get('/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {
            })
            .then((res) => {
                setClients(res.data);
            })
            .catch(() => {
                setClients([]);
            });
    };
    useEffect(() => {
            getAssignee();
            getClients();
    }, []);
    var statusMapping ={"Todos":"Todos","pending":"PENDIENTE","analysis":"EN ANALISIS",
    "development":"DESARROLLO","production":"PRODUCCION","post_production":"POST-PRODUCCION"}
var typeMapping ={"Todos":"Todos","client":"DESARROLLO","support":"SOPORTE"}
return (
        <Row>
                <Card>
                    <Card.Header as="h4">Proyecto #{project.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>Nombre: {project.name}</Card.Title>
                        <Card.Text>

                            <ul key="atributos">
                                <li key="description"> Cliente: {
                                    project.client_id!=null?clients.find( element => element.id == project.client_id)!=null?clients.find( element => element.id == project.client_id)["razon social"]:"":""
                                } </li>
                                <li key="estado"> Estado: {statusMapping[project.status]}</li>
                                <li key="tipo">  Tipo: {typeMapping[project.type]}</li>
                            </ul>



                        </Card.Text>
                         <Card.Footer> Project manager: {assignee.Nombre} {assignee.Apellido} </Card.Footer> 

                         <Button variant="primary" href={`/proyectos/${project.id}/ver-tareas/`}> Ver Tareas</Button>{' '}
                         {' '}
                         {' '}

                         <Button variant="primary" href={`/proyectos/${project.id}/ver-proyecto/`}> Ver Detalles</Button>{' '}
                    </Card.Body>
                </Card>



        </Row>


    )
}