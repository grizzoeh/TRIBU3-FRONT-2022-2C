import CardCustom from "./card";
import './task.css'

export default function StateContainer({ stateName, projects }) {
  return (
    //<section style={sectionStyle}>
    <section >
      <h2>{stateName}</h2>
      {projects?.map((oneProject) => {
        return <CardCustom project={oneProject} />;
      })}
    </section>
  );
}
