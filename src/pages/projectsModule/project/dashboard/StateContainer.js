import Card from "./card";
import './task.css'

export default function StateContainer({ stateName, projects }) {
  return (
    //<section style={sectionStyle}>
    <section className="column">
      <h3 className="task-box-header">{stateName}</h3>

      {projects.map((project) => {
        return <Card project={project} />;
      })}
    </section>
  );
}
