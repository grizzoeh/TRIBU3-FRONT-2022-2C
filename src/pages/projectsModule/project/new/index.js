import { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

export default function NewProject() {
  const SERVER_NAME = "https://squad-8-projects.herokuapp.com";

  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    type: "",
    estimated_start_date: "",
    estimated_finalization_date: "",
    project_manager: "",
    resources: [123],
    stakeholders: [213124]
  });

  const createProject = async () => {
    axios
      .post(SERVER_NAME + "/psa/projects/", projectData)
      .then((data) => {
        debugger
        if (data.status === 200) {
          alert("Nuevo proyecto creado");
          // TODO: redirect to project dashboard
        }
      })
      .catch((err) => {
        alert("Se produjo un error al consultar los proyectos", err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createProject();

    setProjectData({
      name: "",
      description: "",
      type: "",
      estimated_start_date: "",
      estimated_finalization_date: "",
      project_manager: "",
      resources: [], // TODO: fill
      stakeholders: [] // TODO: fill
    });
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

        <label>Description:</label>
        <input
          type="text"
          value={projectData.description}
          onChange={(e) =>
            setProjectData({ ...projectData, description: e.target.value })
          }
        />
        <br />
        <br />

        <label>Tipo:</label>
        <input
          type="text"
          value={projectData.type}
          onChange={(e) =>
            setProjectData({ ...projectData, type: e.target.value })
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
            setProjectData({ ...projectData, estimated_start_date: e.target.value })
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
            setProjectData({ ...projectData, estimated_finalization_date: e.target.value })
          }
        />
        <br />
        <br />

        <label>Project manager:</label>
        <input
          type="text"
          value={projectData.project_manager}
          onChange={(e) =>
            setProjectData({ ...projectData, project_manager: e.target.value })
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
