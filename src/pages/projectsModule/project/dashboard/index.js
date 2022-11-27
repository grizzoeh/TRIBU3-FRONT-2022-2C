import React, { useEffect, useState } from "react";
import Header from "./header";
import Body from "./body";
import axios from "axios";

import MockProjects from "../../../../Mock/projects";

export default function Dashboard() {
  const SERVER_NAME = "https://squad-8-projects.herokuapp.com";
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    // const getProyectos = async () => {
    //     setProyectos(MockProjects);
    // };

    const getProyectos = async () => {
      axios
        .get(SERVER_NAME + "/psa/projects/", {})
        .then((res) => {
          setProyectos(res.data);
        })
        .catch((err) => {
          alert('Se produjo un error al consultar los proyectos', err);
        });
    };

    getProyectos();
  }, []);

  return (
    <>
      <Header />
      <Body projects={proyectos}/>
    </>
  );
}
