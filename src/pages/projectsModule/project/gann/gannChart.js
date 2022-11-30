import * as SERVER_NAMES from "../../APIRoutes";
import React from "react";
import {Chart} from "react-google-charts";
import axios from "axios";
import {useParams} from 'react-router-dom';
import {useEffect} from "@types/react";

export default function GannChart() {

    const columns = [
        {type: "string", label: "Task ID"},
        {type: "string", label: "Task Name"},
        {type: "string", label: "Descripción"},
        {type: "date", label: "Dia De inicio Estimado"},
        {type: "date", label: "Dia De finalización Estimado"},
        {type: "number", label: "Horas Estimadas"},
        {type: "number", label: "Estado"},
        {type: "string", label: "Dependencies"},
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
                .get(SERVER_NAMES.ASSIGNEES, {})
                .then((res) => {
                    setClients(res.data);
                })
                .catch((err) => {
                    alert('Se produjo un error al consultar los clientes', err);
                });
        };

        getAssignees();
        getTareas();
        let dataToGann = new google.visualization.DataTable();

        columns.forEach((colunm) => {
            dataToGann.addColumn(colunm);
        })
        tareas.forEach((tarea) => {
            dataToGann.addRow([tarea.id,
              tarea.name, tarea.description,
              tarea.estimated_start_date,
              tarea.estimated_finalization_date,
                tarea.estimated_hours_effort,
                tarea.state,tarea.dependencies
            ]);
        })
    }, []);


    return (
        <Chart chartType="Gantt" width="100%" height="50%" data={data}/>

    );
}
