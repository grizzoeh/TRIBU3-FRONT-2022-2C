import CardCustom from "./card";
import './task.css'
export default function StateContainer({ projects, getProjects, resources, clients}) {
  return (
    //<section style={sectionStyle}>
    <section >
      {projects?.map((oneProject) => {
        return <CardCustom project={oneProject} getProjects={getProjects} resources={resources} clients={clients}/>;
      })}
    </section>
  );
}
