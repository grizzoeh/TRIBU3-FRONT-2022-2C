import './task.css'
import { Link } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";

export default function TaskCard({ task, index }) {
  const params = useParams();
  return (

    <Draggable key={`${task.id}`} draggableId={`${task.id}`} index={index}>
      {(draggableProvider) => (
        <div className="task"
          {...draggableProvider.draggableProps} 
          ref={draggableProvider.innerRef}
          {...draggableProvider.dragHandleProps}
        >
        <h2 className='task-name over-hide'>{task.name}</h2>
        <p className='task-details'>{task.description}</p>
        <p className='task-details'>{task.estimatedHoursEffort}</p>
        <form action={`/proyectos/${params.id}/tareas/${task.id}/ver-tarea/`} >
          <input type="submit" value="Ver tarea"/>
        </form>      
      </div>
      )
    
      }
      
    </Draggable>

  );
}