import * as SERVER_NAMES from "../../APIRoutes";

import React, {useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import axios from "axios";
import {useParams} from 'react-router-dom';
export default function GannChart() {

  const google = window.google;

/*    const columns = [
        { type: "string", label: "Task ID" },
        { type: "string", label: "Task Name" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
    ];

    const rows = [
        [
            "Research",
            "Find sources",
            null,
            new Date(2015, 0, 1),
            new Date(2015, 0, 5),
            null,
            100,
            null,
        ],
        [
            "Write",
            "Write paper",
            "write",
            null,
            new Date(2015, 0, 9),
            3 * 24 * 60 * 60 * 1000,
            25,
            "Research,Outline",
        ],
        [
            "Cite",
            "Create bibliography",
            "write",
            null,
            new Date(2015, 0, 7),
            1 * 24 * 60 * 60 * 1000,
            20,
            "Research",
        ],
        [
            "Complete",
            "Hand in paper",
            "complete",
            null,
            new Date(2015, 0, 10),
            1 * 24 * 60 * 60 * 1000,
            0,
            "Cite,Write",
        ],
        [
            "Outline",
            "Outline paper",
            "write",
            null,
            new Date(2015, 0, 6),
            1 * 24 * 60 * 60 * 1000,
            100,
            "Research",
        ],
    ];
*/
  //  const data = [columns, ...rows];
    const columns = [
        {type: "string", label: "Task Name"},
        {type: "number", label: "Task Id"},
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
    const [dataToGann, setdataToGann] = useState( []);

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
    useEffect(() => {
        const interval = setInterval(() => {
            getAssignees();
            getTareas();
            tareas.forEach((tarea) => {
            setdataToGann({ columns, ...[
                tarea.name,
                ,tarea.id
                ,null
                ,            new Date(2015, 0, 1),
                new Date(2015, 0, 5),
                null,
                null,
                null
            ]})
            }
            )
            /*
            columns.forEach((colunm) => {
                setdataToGann().addColumn(colunm.type,colunm.label);
                //('string', 'Agentes')
            })
            tareas.forEach((tarea) => {
                /*let faffa=[tarea.id,
                    tarea.name,
                     tarea.description,
                    tarea.estimated_start_date,
                    tarea.estimated_finalization_date,
                    tarea.estimated_hours_effort,
                    tarea.state,
                    tarea.dependencies
                ]
        
                setdataToGann().addRow([
                    tarea.id,
                    ,null
                    ,null
                    ,            new Date(2015, 0, 1),
                    new Date(2015, 0, 5),
                    null,
                    null,
                    null
                ]);
            })*/
        }, 1000);
        return () => clearInterval(interval);
       
    }, []);


    return (
        <Chart chartType="Gantt" width="100%" height="50%" data={dataToGann}/>

    );
}
