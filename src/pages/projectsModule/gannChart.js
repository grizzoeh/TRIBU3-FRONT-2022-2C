import React, { Fragment } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import NavbarProyectos from "../../components/navbarProyectos/NavbarProyectos";

export default function GannChart() {
  return (
    <Fragment>
      <NavbarProyectos />
      <Container className="container-title">
        <br />
        <Row>
          <Col>
            <h1>Gann chart</h1>;
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
