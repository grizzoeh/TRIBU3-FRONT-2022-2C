import TaskCard from "./taskCard";
import './task.css'
import { Col, Row } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";

export default function KanbanColumn({ stateName, tasks, project, assignees, getTasks, allTasks}) {
  return (
    //<section style={sectionStyle}>
    <Droppable droppableId={stateName} key={`dropable-${stateName}`}>
      {(droppableProvided) => (
        <Col
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          className="column"
        >
        <h3 className="task-box-header">{stateName}</h3>
        {tasks.map((task, index) => 
        /*
          (<Row key={`row-${task.id}`}>
              <TaskCard task={task} index={index} project={project} assignees={assignees}/>
          </Row>)
          */
          <TaskCard task={task} index={index} project={project} assignees={assignees} getTasks={getTasks} allTasks={allTasks}/>
        )}
        {droppableProvided.placeholder}
        </Col>
      )}
    </Droppable>
  );
}