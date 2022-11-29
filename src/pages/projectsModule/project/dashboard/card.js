import './task.css'
import { Link } from 'react-router-dom'

export default function Card({ project }) {
  return (

    <div className="task">
      <h2 className='task-name over-hide'>{project.name}</h2>
      <p className='task-details'>{project.type}</p>
      <p className='task-details'>{project.description}</p>
      <Link className='remove-bar' to={`/proyectos/${project.id}/ver-tareas/`}> 

      - 
      </Link>

      
    </div>
  //</section>
  );
}