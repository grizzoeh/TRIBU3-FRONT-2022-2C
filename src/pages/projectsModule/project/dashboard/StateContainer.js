import CardCustom from "./card";
import './task.css'
export default function StateContainer({ projects, getProjects, resources }) {
  return (
    //<section style={sectionStyle}>
    <section >
      {projects?.map((oneProject) => {
        return <CardCustom project={oneProject} getProjects={getProjects} resources={resources}/>;
      })}
    </section>
  );
}
