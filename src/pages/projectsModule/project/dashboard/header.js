import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function ProjectHeader() {
    return (
        <>
            <br/>
            <Container className="container-title">
                <Row>
                    <Col xs={10}>
                        <h1>Proyectos</h1>
                    </Col>
                    < Col xs={2}>
                        <Button variant="primary" href="/crear-proyecto">Crear Proyecto</Button>
                    </Col>
                </Row>

            </Container>
        </>
    );
}
