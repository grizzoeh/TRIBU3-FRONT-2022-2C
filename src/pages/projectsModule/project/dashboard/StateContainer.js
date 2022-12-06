import CardCustom from "./card";
import "./task.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import ModalInfoProyecto from "../view/ModalInfoProyecto";

export default function StateContainer({ projects, getProjects, resources }) {
  return (
    <>
      <Container>
        <Row>
          <Table proyectos>
            <thead>
              <tr>
                <th>Número</th>
                <th>Nombre</th>
                <th>Cliente</th>
                <th>Estado</th>
                <th>Tipo</th>
                <th>Project manager</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <tr>
                    <td>{project.id}</td>
                    <td>{project.name}</td>
                    <td>{project.client_id}</td>
                    <td>{project.status}</td>
                    <td>{project.type}</td>
                    <td>{project.project_manager.id}</td>
                    <td>
                      <Row>
                        <Col sm={5}>
                          <Button size="sm" variant="primary" href={`/proyectos/${project.id}/ver-tareas/`}>Ver Tareas</Button>
                        </Col>
                        <Col sm={5}>
                          <ModalInfoProyecto data={project} getDataProyectos={getProjects} recursos2={resources} />
                        </Col>
                      </Row>
                    </td>
                  </tr>
                ))
              ) : (
                <Row>No hay proyectos para mostrar</Row>
              )}
            </tbody>
          </Table>
        </Row>
      </Container>

      {/* <section>
        {projects?.map((oneProject) => {
          return (
            <CardCustom
              project={oneProject}
              getProjects={getProjects}
              resources={resources}
            />
          );
        })}
      </section> */}
    </>
  );
}
