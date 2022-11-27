import './task.css'
import { Link } from 'react-router-dom'

export default function TaskCard({ task }) {
  return (

    <div className="task">
      <h2 className='task-name over-hide'>{task.name}</h2>
      <p className='task-details'>{task.description}</p>
      <p className='task-details'>{task.estimatedHoursEffort}</p>
      {/* <Link className='remove-bar' to={`/proyectos/${project.id}/ver-tareas/`}> 

      - 
      </Link> */}

      
    </div>
  //</section>
  );
}