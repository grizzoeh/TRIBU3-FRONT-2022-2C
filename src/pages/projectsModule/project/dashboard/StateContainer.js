import Card from "./card";

export default function StateContainer({ stateName, projects }) {
  return (
    <section style={sectionStyle}>
      <h3>{stateName}</h3>

      {projects.map((project) => {
        return <Card project={project} />;
      })}
    </section>
  );
}

const sectionStyle = {
  background: "#a9a9a9",
};
