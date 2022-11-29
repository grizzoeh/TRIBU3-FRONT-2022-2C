import './task.css'
import Card from 'react-bootstrap/Card';
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button"

export default function CardCustom({project}) {
    return (
        <Row>
                <Card>
                    <Card.Header as="h4">Proyecto #{project.id}</Card.Header>
                    <Card.Body>
                        <Card.Title>Nombre: {project.name}</Card.Title>
                        <Card.Text>

                            <ul>
                                <li> Descripcion: {project.description} </li>
                                <li> Estatus: {project.status}</li>
                                <li>   Tipo: {project.type}</li>
                            </ul>


                        </Card.Text>
                        <Card.Footer>Project manager: {project.project_manager}</Card.Footer>

                        <Button variant="primary" href={`/proyectos/${project.id}/ver-tareas/`}> Ver Proyecto</Button>{' '}
                    </Card.Body>
                </Card>



        </Row>


    )
}