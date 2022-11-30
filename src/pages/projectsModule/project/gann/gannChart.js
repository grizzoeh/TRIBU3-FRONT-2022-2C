
import * as SERVER_NAMES from "../../APIRoutes";
import React from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function GannChart() {

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const params = useParams();
  const [tareas, setTareas] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getTareas = async () => {
      axios
          .get(SERVER_NAMES.PROJECTS + `/psa/projects/${params.id}/tasks/`, {})
          .then((res) => {
            setTareas(res.data);
          })
          .catch((err) => {
            alert('Se produjo un error al consultar las tareas para el proyecto', err);
          });
    };

    const getAssignees = async () => {
      axios
          .get(SERVER_NAMES.ASSIGNEES , {})
          .then((res) => {
            setClients(res.data);
          })
          .catch((err) => {
            alert('Se produjo un error al consultar los clientes', err);
          });
    };

    let data = new google.visualization.DataTable();

    getAssignees();
    getTareas();
  }, [params.id]);

/*
  const onChangeProjectData = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleDependencyDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, dependencies: [e] });
    setDependencyButtonTitle(tareas.find((tarea) => tarea.id == e).name);
  };

  const handleDependencyDropdownButtonChange2 = (e) => {
    setProjectData({ ...projectData, dependencies: [e] });
    //setDependencyButtonTitle(tareas.find((tarea) => tarea.id == e).name);
  };

  const handleAssigneeDropdownButtonChange = (e) => {
    setProjectData({ ...projectData, assignees: [e] });
    setAssigneeButtonTitle(clients.find((client) => client.legajo == e).Nombre + " " + clients.find((client) => client.legajo == e).Apellido);
  };
*/


  var data = new google.visualization.DataTable();
  data.addRow

  return (
    <Chart chartType="Gantt" width="100%" height="50%" data={data} />

  );
}
