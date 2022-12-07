import './task.css'
import { Link } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import ModalInfoTask from "./modal/ModalInfoTask";


export default function TaskCard({ task, index, project, assignees, getTasks, allTasks}) {
  const params = useParams();
  const mapIDResourceToName= (asignados) => {
    return asignados.map((assignee) => {
      let selectedSponsor = assignees.find((client) => client.legajo === assignee.id)
      return selectedSponsor?`${selectedSponsor.Nombre} ${selectedSponsor.Apellido}`:null
    })
  }
  return (

    <Draggable key={`${task.id}`} draggableId={`${task.id}`} index={index}>
      {(draggableProvider) => (
        <div className="task"
          {...draggableProvider.draggableProps} 
          ref={draggableProvider.innerRef}
          {...draggableProvider.dragHandleProps}
        >

        {/* ACA EMPIEZA TODO LO DE LA CARD: 
          * ID DE LA TASK
          * NOMBRE
          * PRIORIDAD
          * FECHA ESTIMADA DE FINALIZACION:
          * DESCRIPCION NO

        */}

        <Col key={task.id} className="mt-3">
          <Card style={{ width: '18rem' ,border: '1px solid #ccc'}}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col className='task-name over-hide'>
                            Tarea  #{task.id}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            {task.name}
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>
                    {/*<Row>
                        <Col xs={5}>
                            <h6>Cliente: </h6>
                        </Col>
                        <Col>
                            {clientes.length > 0 ?
                                clientes.find(cliente => cliente.id === ticketEnCurso.idCliente)["razon social"]
                                : <></>}
                        </Col>

                    </Row>*/}
                    <Row>
                      <Col xs={5}>
                          <h6>Prioridad:</h6>
                      </Col>
                      <Col>
                          <p><small>{task.priority?task.priority:"Sin asignar"}</small></p>
                      </Col>
                    </Row>
                    {/*<Row>
                      <Col xs={5}>
                          <h6>Fecha estimada de finalización: </h6>
                      </Col>
                      <Col>
                        <p2>{task.estimated_finalization_date?moment(task.estimated_finalization_date, "YYYY-MM-DD").format('DD.MM.YYYY'):"Sin asignar"}</p2>
                      </Col>
                    </Row>*/}
                    <Row>
                      <Col xs={5}>
                          <h6>Empleado asignado:</h6>
                      </Col>
                      <Col>
                          <p2>{task.assignees.length > 0?mapIDResourceToName(task.assignees).map((nombre) => <Col><p2>{nombre}</p2></Col>):<Col xs={9}><p2>Sin asignar</p2></Col>}</p2>
                      </Col>
                    </Row>
                </Card.Text>
                <ModalInfoTask data={task} getDataProjectTask={getTasks} project={project} assignees={assignees} allTasks={allTasks} name={null}/>

                {/*<ModalTicketCerrado data={task} numeroTarea={task.id} />*/}
            </Card.Body>
          </Card>
        </Col>
        {/*
        <h2 className='task-name over-hide'>{task.name}</h2>
        <p className='task-details'>{task.description}</p>
        <p className='task-details'>{task.estimatedHoursEffort}</p>
        */}
        {/* 
        <form action={`/proyectos/${params.id}/tareas/${task.id}/ver-tarea/`} >
          <input type="submit" value="Ver tarea"/>
        </form>  */}
        {/* ACA TERMINA TODO LO DE LA CARD: */}


        {/* ACA VOY A TOCAR YO */}
          

        {/* ACA TERMINA LO QUE A TOCAR YO */}

      </div>
      )
    
      }
      
    </Draggable>

  );
}