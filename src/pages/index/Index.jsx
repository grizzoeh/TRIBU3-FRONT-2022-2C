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
                        <h1>Sistema de Gestión PSA</h1>
                    </Col>
                </Row>
            </div>

            <div className="container-index">
                <Row className="row-index">
                    <Col >
                        <Button variant="primary" className="boton-proyectos" size="lg" block>
                            Modulo Proyectos
                        </Button>
                    </Col>
                    <Col >
                        <Button variant="primary" size="lg" className="boton-soporte" block>
                            Modulo Soporte
                        </Button>
                    </Col>
                    <Col >
                        <Button variant="primary" className="boton-recursos" size="lg" block>
                            Modulo Recursos
                        </Button>
                    </Col>
                </Row>



            </div>



        </Fragment >
    );

}
export default Index