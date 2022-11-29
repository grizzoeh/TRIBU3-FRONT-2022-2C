export default function Card({ project }) {
  return (
    <section style={sectionStyle}>
      <h3>{project.id}</h3>
      <h3>{project.name}</h3>
      <h3>{project.description}</h3>
      <h3>{project.type}</h3>
      <h3>{project.status}</h3>
      <h3>{project.estimatedStartDate}</h3>
      <h3>{project.estimatedFinalizationDate}</h3>
    </section>
  );
}

const sectionStyle = {
  background: "papayawhip",
  padding: "20px",
  width: "500px",
};
