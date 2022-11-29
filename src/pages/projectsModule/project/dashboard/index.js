import React, { useEffect, useState } from "react";
import Header from "./header";
import Body from "./body";
import { Chart } from "react-google-charts";
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";


export default function Dashboard() {

  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const getProyectos = async () => {
      axios
        .get(SERVER_NAME_SOPORTE + "/psa/projects/", {})
        .then((res) => {
          setProyectos(res.data);
        })
        .catch((err) => {
          alert('Se produjo un error al consultar los proyectos', err);
        });
    };

    getProyectos();
  }, []);

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

  const rows = [
    [
      "toTrain",
      "Walk to train stop",
      "walk",
      null,
      null,
      5 * 60 * 1000,
      100,
      null,
    ],
    [
      "music",
      "Listen to music",
      "music",
      null,
      null,
      70 * 60 * 1000,
      100,
      null,
    ],
    [
      "wait",
      "Wait for train",
      "wait",
      null,
      null,
      10 * 60 * 1000,
      100,
      "toTrain",
    ],
    ["train", "Train ride", "train", null, null, 45 * 60 * 1000, 75, "wait"],
    ["toWork", "Walk to work", "walk", null, null, 10 * 60 * 1000, 0, "train"],
    ["work", "Sit down at desk", null, null, null, 2 * 60 * 1000, 0, "toWork"],
  ];

  const data = [columns, ...rows];

  const options = {
    height: 275,
    gantt: {
      defaultStartDateMillis: new Date(2015, 3, 28),
    },
  };

  return (
    <>
      <Header />
      <Body projects={proyectos} />

      <Chart
        chartType="Gantt"
        width="100%"
        height="50%"
        data={data}
        options={options}
      />
    </>
  );
}
