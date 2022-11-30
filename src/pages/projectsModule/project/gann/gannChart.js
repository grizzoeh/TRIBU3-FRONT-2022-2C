import * as SERVER_NAMES from "../../APIRoutes";

import React, {Fragment, useEffect, useState} from "react";
import {Chart} from "react-google-charts";
import axios from "axios";
import {useParams} from 'react-router-dom';
import moment from 'moment';
import { Container } from "react-bootstrap";
import NavbarProyectos from "../../../../components/navbarProyectos/NavbarProyectos";


export default function GannChart() {

    const google = window.google;

   const columns = [
        { type: "string", label: "ID Tarea" },
       { type: "string", label: "Nombre" },
        { type: "string", label: "Resource" },
        { type: "date", label: "Start Date" },
        { type: "date", label: "End Date" },
        { type: "number", label: "Esfuerzo estimado" },
        { type: "number", label: "Percent Complete" },
        { type: "string", label: "Dependencies" },
    ]

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
        // const interval = setInterval(() => {
        //     getAssignees();
        //     getTareas();
        // }, 3000);
        // return () => clearInterval(interval);
        getAssignees();
        getTareas();
    }, []);

    // const options = {
    //     height: 600,
    //     gantt: {
    //       defaultStartDateMillis: new Date(2015, 3, 28),
    //     },
    //   };

    const options = {
        height: 700,
        width: 1000,
        title: "Nearby galaxies",
        gantt: {
          trackHeight: 30
        },
      };
    return (
        <Fragment>
        <NavbarProyectos/>
        <Container key="chart-container">
        <br></br>
        <br></br>
        <br></br>
        <Chart chartType="Gantt" options={options} chartLanguage="es" legendToggle={false} data={
            [columns,...tareas.map((tarea) => {
                return [tarea.id,
                     tarea.name,
                     tarea.description,
                     moment(tarea.estimated_start_date, "YYYY-MM-DD").toDate(),
                     moment(tarea.estimated_finalization_date, "YYYY-MM-DD").toDate(),
                     tarea.estimated_hours_effort,
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
        </Container>
        </Fragment>

    );
}
