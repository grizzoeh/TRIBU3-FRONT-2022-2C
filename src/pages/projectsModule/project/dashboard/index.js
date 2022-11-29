import React, { useEffect, useState } from "react";
import Header from "./header";
import Body from "./body";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";


export default function Dashboard() {

  const SERVER_NAME = "https://squad-8-projects.herokuapp.com";
  const [proyectos, setProyectos] = useState([]);

    const [buttonState, setButtonState] = useState('Seleccionar');
    let filtrosStado = [{"name":"pendiente"},{"name":"analisis"},{"name":"desarrollo"},{"name":"produccion"},{"name":"post_produccion"}];

    const handleDropdownStateFilter = (e) => {
        setButtonState(e);
    };

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
          <Row className="mt-5">
              <Col>
                  <h4>Filtro</h4>
              </Col>
              <Col xs={9}>
                  <DropdownButton
                      variant="secondary"
                      title={buttonState}
                      onSelect={handleDropdownStateFilter}
                  >
                      {filtrosStado.map((filtro) => {
                          return (
                              <Dropdown.Item eventKey={filtro.name} name="client">
                                  {filtro.name}
                              </Dropdown.Item>
                          );
                      })}

                  </DropdownButton>
              </Col>
          </Row>
          <Body projects={proyectos} filtrosStado={filtrosStado}/>
      </>
  );
}
