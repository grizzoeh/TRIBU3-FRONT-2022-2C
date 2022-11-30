import CardCustom from "./card";
import './task.css'

export default function StateContainer({ projects }) {
  return (
    //<section style={sectionStyle}>
    <section >
      {projects?.map((oneProject) => {
        return <CardCustom project={oneProject} />;
      })}
    </section>
  );
}
