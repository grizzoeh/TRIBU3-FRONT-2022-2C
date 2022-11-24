import Card from './card';

export default function StateContainer({ stateName, projects }) {
  return (
    <section style={sectionStyle}>
      <h3>{stateName}</h3>

      {projects.map((project) => {
        return (
          <Card
            title={project.title}
            description={project.Description}
            AssignedTo={project.AssignedTo}
          />
        );
      })}
    </section>
  );
}

const sectionStyle = {
  background: "#a9a9a9",
};
