import KanbanColumn from "./kanbanColumn";
import "./tareasProyecto.css"

// To do: Fetch projects from API.
import MockProjects from "../../../../Mock/projects";
import { Col , Row} from "react-bootstrap";
import { Fragment } from "react";

export default function KanbanDashboard({tasks}) {
  let pendingTasks = tasks.filter(
    (task) => task.state === "pending"
  );
  let inProgressTasks = tasks.filter(
    (task) => task.state === "in_progress"
  );
  let finishedTasks = tasks.filter(
    (task) => task.state === "finished"
  );

  return (
    <Fragment>
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

    </Fragment>
  );
}
