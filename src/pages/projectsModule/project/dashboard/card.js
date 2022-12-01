import './task.css'
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"
import React, {useEffect, useState} from "react";
import axios from "axios";
import * as SERVER_NAMES from "../../APIRoutes";

export default function CardCustom({project}) {

    const [assignee, setAssignee] = useState([]);

    const getAssignee = async () => {
        axios
            .get(SERVER_NAMES.ASSIGNEES+ "/"+project.project_manager.id
                , {})
            .then((res) => {
                setAssignee(res.data);
            })
            .catch((err) => {
                setAssignee({ Nombre: "", Apellido: "" });
            });
            console.log(project.project_manager.id)
    };
    useEffect(() => {
            getAssignee();
    
    }, []);
    return (
        <Row>
                <Card>
                    <Card.Header as="h4">Proyecto #{project.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>Nombre: {project.name}</Card.Title>
                        <Card.Text>

                            <ul key="atributos">
                                <li key="description"> Descripcion: {project.description} </li>
                                <li key="estado"> Estado: {project.status}</li>
                                <li key="tipo">  Tipo: {project.type}</li>
                            </ul>



                        </Card.Text>
                         <Card.Footer> Project manager: {assignee.Nombre} {assignee.Apellido} </Card.Footer> 

                        <Button variant="primary" href={`/proyectos/${project.id}/ver-tareas/`}> Ver Proyecto</Button>{' '}
                    </Card.Body>
                </Card>



        </Row>


    )
}