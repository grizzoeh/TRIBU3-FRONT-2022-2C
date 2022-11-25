import { useState } from "react";
import Form from "react-bootstrap/Form";

export default function NewProject() {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    assignedTo: "",
    fechaInicio: "",
    fechaDeFin: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // TODO: Delete.
    alert(
      `{name: ${projectData.name}, description: ${projectData.description}, assignedTo: ${projectData.assignedTo}, fechaInicio: ${projectData.fechaInicio}, fechaDeFin: ${projectData.fechaInicio}}`
    );

    // TODO: Call API [POST].
    setProjectData({ name: "", description: "", assignedTo: "", fechaInicio: "", fechaInicio: "" });
  };

  return (
    <>
      <h1>Nuevo proyecto</h1>

      <br />
      <br />

      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={projectData.name}
          onChange={(e) =>
            setProjectData({ ...projectData, name: e.target.value })
          }
        />
        <br />
        <br />

        <label>Tipo:</label>
        <input
          type="text"
          value={projectData.description}
          onChange={(e) =>
            setProjectData({ ...projectData, description: e.target.value })
          }
        />
        <br />
        <br />

        <label>Descripcion:</label>
        <input
          type="text"
          value={projectData.assignedTo}
          onChange={(e) =>
            setProjectData({ ...projectData, assignedTo: e.target.value })
          }
        />
        <br />
        <br />

        <label>Fecha de inicio:</label>
        <Form.Control
          type="text"
          name="fechaDeInicio"
          placeholder="Ej: 18/12/2022"
          onChange={(e) =>
            setProjectData({ ...projectData, fechaInicio: e.target.value })
          }
        />
        <br />
        <br />

        <label>Fecha de fin:</label>
        <Form.Control
          type="text"
          name="fechaDeFin"
          placeholder="Ej: 18/12/2023"
          onChange={(e) =>
            setProjectData({ ...projectData, fechaDeFin: e.target.value })
          }
        />
        <br />
        <br />

        <button>Crear</button>
      </form>

      <br />
      <br />
    </>
  );
}
