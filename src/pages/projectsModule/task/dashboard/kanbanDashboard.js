import KanbanColumn from "./kanbanColumn";
import "./tareasProyecto.css"
import axios from "axios";
import { Col , Row} from "react-bootstrap";
import { Fragment, useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';

export default function KanbanDashboard({initialTasks, setTasks}) {

  const SERVER_NAME = "https://squad-8-projects.herokuapp.com";

  //const [tasks, setTareas] = useState(initialTasks);
  const [update, setUpdate] = useState("hola");

  let pendingTasks = initialTasks.filter(
    (task) => task.state === "pending"
  );
  let inProgressTasks = initialTasks.filter(
    (task) => task.state === "in_progress"
  );
  let finishedTasks = initialTasks.filter(
    (task) => task.state === "finished"
  );

  const getUpdate = () => {
      setUpdate("chau");
  };


  const getNewStatus = (stateName) => {
      if (stateName === "Pendiente") {
        return "pending"
      }
      if (stateName === "En progreso") {
        return "in_progress"
      }
      if (stateName === "Finalizada") {
        return "finished"
      }
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  return (
    <Fragment>
      <DragDropContext onDragEnd={(result) => {
          const {source, destination} = result;
          if (!destination) {
            return;
          }
          if (source.droppableId === destination.droppableId) {
            return;
          }

          //console.log(result)
          const newStatus = getNewStatus(destination.droppableId);

          axios.patch(SERVER_NAME + `/psa/projects/tasks-2/${result.draggableId}`, {
            state: newStatus,
         }) 
         getUpdate();
         console.log(update);
         // TODO Proyectos, actualizar la vista
         window.location.reload(true);
         //setTasks();

      }}>

      <Row className="kanban-row">
        <Col> 
          <KanbanColumn    
                stateName={"Pendiente"}
                tasks={pendingTasks}
          />
        </Col>
        <Col>
          <KanbanColumn
                stateName={"En progreso"}
                tasks={inProgressTasks}
            />
        </Col>
        <Col>
        <KanbanColumn
                stateName={"Finalizada"}
                tasks={finishedTasks}
              />
        </Col>
      </Row>
    </DragDropContext>
    </Fragment>
  );
}
