import TaskCard from "./taskCard";
import './task.css'
import { Col, Row } from "react-bootstrap";
import { Droppable } from "react-beautiful-dnd";

export default function KanbanColumn({ stateName, tasks }) {
  return (
    //<section style={sectionStyle}>
    <Droppable droppableId={stateName}>
      {(droppableProvided) => (
        <Col
          {...droppableProvided.droppableProps}
          ref={droppableProvided.innerRef}
          className="column"
        >
        <h3 className="task-box-header">{stateName}</h3>
        {tasks.map((task, index) => 
          (<Row>
              <TaskCard task={task} index={index}/>
          </Row>)
        )}
        {droppableProvided.placeholder}
        </Col>
      )}
    </Droppable>
  );
}