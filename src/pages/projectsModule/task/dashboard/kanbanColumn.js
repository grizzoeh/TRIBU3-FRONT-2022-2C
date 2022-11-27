import TaskCard from "./taskCard";
import './task.css'
import { Col, Row } from "react-bootstrap";

export default function KanbanColumn({ stateName, tasks }) {
  return (
    //<section style={sectionStyle}>
    <Col className="column">
      <h3 className="task-box-header">{stateName}</h3>
      {tasks.map((task) => {
        return <Row><TaskCard task={task} /></Row>;
      })}

    </Col>
  );
}
