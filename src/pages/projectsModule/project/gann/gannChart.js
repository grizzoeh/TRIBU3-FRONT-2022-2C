import * as SERVER_NAMES from "../../APIRoutes";

import React, {useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import axios from "axios";
import {useParams} from 'react-router-dom';
export default function GannChart() {

  const google = window.google;

   const columns = [
        { type: "string", label: "Task ID" },
       { type: "string", label: "Task Name" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Duration" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
    ]
/*
 
*/
  //  const data = [columns, ...rows];/*
  /*  const columns = [
         "Task Name",
        "Task Id",
        "Descripción",
        "Dia De inicio Estimado",
        "Dia De finalización Estimado",
        "Horas Estimadas",
        "Estado",
       "Dependencies",
    ];*/


    const params = useParams();
    const [tareas, setTareas] = useState([]);
    const [clients, setClients] = useState([]);
   // const dataToGann= [];

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

            /*
            const fillSquareMatrix = (size) => {
    return Array(size)
    . fill()
    . map((u,y) => Array(size)
    . fill()
    . map((u,x) => y * size + x + 1));
    };*/
    
            /*
            columns.forEach((colunm) => {
                setdataToGann().addColumn(colunm.type,colunm.label);
                //('string', 'Agentes')
            })
            tareas.forEach((tarea) => {
                /*let faffa=
        
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
            })*//*
            let lista=tareas.map((tarea) => {
               return [tarea.id,
                    tarea.name,
                     tarea.description,
                    tarea.estimated_start_date,
                    tarea.estimated_finalization_date,
                    tarea.estimated_hours_effort,
                    tarea.state,
                    tarea.dependencies
                ]
            })
*/
            //console.log(lista);
            //dataToGann=[columns, lista];
            //console.log([columns, ...lista]);*/
        }, 3000);
        return () => clearInterval(interval);
       
    }, []);

    const options = {
        height: 275,
        gantt: {
          defaultStartDateMillis: new Date(2015, 3, 28),
        },
      };
    return (
        <Chart chartType="Gantt" width="100%" height="50%" 
        options={options} data={
            [columns,...tareas.map((tarea) => {
                return [tarea.id,
                     tarea.name,
                     tarea.description,
                     new Date(2022, 11, 28),
                     new Date(2022, 11, 30),
                     6,
                     null,
                     null

                   /*  tarea.estimated_finalization_date,
                     tarea.estimated_hours_effort,
                    /* tarea.state,
                     tarea.dependencies
                                     
                     //new Date(tarea.creation_date),

                     */
                 ]
             })]
        }/>

    );
}
