import './task.css'
import { Link } from 'react-router-dom'
import { Draggable } from 'react-beautiful-dnd';

export default function TaskCard({ task, index }) {
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
      </div>
      )

      }
      
    </Draggable>

  );
}