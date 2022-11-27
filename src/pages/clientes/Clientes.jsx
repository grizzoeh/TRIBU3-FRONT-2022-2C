import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./clientes.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SpacerLine from "../../components/spacerLine/spacerLine";
import Col from 'react-bootstrap/Col';
import ModalVersionesAdquiridas from "../../components/modalVersionesAdquiridas/ModalVersionesAdquiridas";
import axios from "axios";

const Clientes = () => {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {
        const getClientes = async () => {
            axios
            .get('https://anypoint.mulesoft.com/mocking/api/v1/sources/exchange/assets/754f50e8-20d8-4223-bbdc-56d50131d0ae/clientes-psa/1.0.0/m/api/clientes', {})
            .then((response) => {
                console.log(response);
            }
            )
            .catch((error) => {
                console.log(error);
            });
        }
    
        getClientes();
    }, [])

    return (
        <Fragment>
            <Container className="container-title">
                <Row>
                    <h1>Clientes:</h1>
                </Row>
            </Container>

            <Container className="spacer-line">
                <SpacerLine className="spacer-line" color="black"></SpacerLine>
            </Container>

            <Container className="filtros-tabla">
                <Form>
                    <Row>
                        <Col className="v-center" sm={1}><h6>Filtros:</h6></Col>
                        <Col className="v-center" sm={2}><Form.Control type="filtro" placeholder="Client ID" /></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" placeholder="Nombre del cliente" /></Col>
                        <Col className="v-center"><Button variant="secondary" size="1">Aplicar</Button></Col>
                    </Row>
                </Form>
            </Container>

            <Container className="tabla-clientes">
                <Row>
                    <Table productos>
                        <thead>
                            <tr>
                                <th>Client_ID</th>
                                <th>Nombre del cliente</th>
                                <th>Versiones Adquiridas</th>
                            </tr> 
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Juan Perez</td>
                                <td><ModalVersionesAdquiridas/></td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>

        </Fragment>
    );
}


export default Clientes