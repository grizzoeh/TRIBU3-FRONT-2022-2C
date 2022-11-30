import React, { Fragment, useEffect, useState } from "react";
import "./index.css";
import NavbarIndex from "../../components/navbarIndex/NavbarIndex";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';




const Index = () => {



    return (


        <Fragment>

            <NavbarIndex />

            <div className="container-title">
                <Row>
                    <Col>
                        <h1 className="titulofuente">Sistema de Gestión PSA</h1>
                    </Col>
                </Row>
            </div>

            <div className="container-index">
                <Row className="row-index">
                    <Col >
                        <Button variant="primary" className="boton-proyectos" size="lg" block href="/proyectos">
                            Modulo Proyectos
                        </Button>
                    </Col>
                    <Col >
                        <Button variant="primary" size="lg" className="boton-soporte" block href="/tickets-en-curso">
                            Modulo Soporte
                        </Button>
                    </Col>
                    <Col >
                        <Button variant="primary" className="boton-recursos" size="lg" block href="cargar-horas">
                            Modulo Recursos
                        </Button>
                    </Col>
                </Row>



            </div>



        </Fragment >
    );

}
export default Index