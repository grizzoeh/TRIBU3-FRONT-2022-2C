import KanbanColumn from "./kanbanColumn";
import "./tareasProyecto.css"

// To do: Fetch projects from API.
import MockProjects from "../../../../Mock/projects";
import { Col , Row} from "react-bootstrap";
import { Fragment, useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';

export default function KanbanDashboard({initialTasks}) {

  const [tasks, setTasks] = useState(initialTasks);

  let pendingTasks = initialTasks.filter(
    (task) => task.state === "pending"
  );
  let inProgressTasks = initialTasks.filter(
    (task) => task.state === "in_progress"
  );
  let finishedTasks = initialTasks.filter(
    (task) => task.state === "finished"
  );



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
          // if (source.droppableId === destination.droppableId) {
          //   return;
          // }

          setTasks(
            (prevTasks) => reorder(prevTasks, source.index, destination.index)
            );
          console.log(result)

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
