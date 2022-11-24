export default function Card({ title, description, AssignedTo }) {
  return (
    <section style={sectionStyle}>
      <h5>{title}</h5>
      <h3>{description}</h3>
      <h5>{AssignedTo}</h5>
    </section>
  );
}

const sectionStyle = {
  background: "papayawhip",
  padding: "20px",
  width: "500px",
};
