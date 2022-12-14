import React, { Fragment, useEffect, useState, State } from "react";
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
import { Snackbar } from "@mui/material";
import Alert from 'react-bootstrap/Alert';
import axios from "axios";
import NavbarSoporte from "../../components/navbarSoporte/NavbarSoporte";
import { SERVER_NAME_SOPORTE } from "../../environment";


const Clientes = () => {

    const FiltroVacios = {
        "razonsocial": "",
        "cuit": ""
    };


    const vertical = "top"
    const horizontal = "center"

    const [clientes, setClientes] = useState([]);
    const [clientesFiltrados, setClientesFiltrados] = useState([]);
    const [filtrado, setFiltrado] = useState(false);
    const [filtroTexto, setFiltroTexto] = useState(FiltroVacios);


    const [showBusquedaError, setShowBusquedaError] = useState(false);
    const [showBusquedaOk, setShowBusquedaOk] = useState(false);
    const handleCloseBusquedaOk = () => setShowBusquedaOk(false);
    const handleShowBusquedaOk = () => setShowBusquedaOk(true);
    const handleCloseBusquedaError = () => setShowBusquedaError(false);
    const handleShowBusquedaError = () => setShowBusquedaError(true);

    const onChangeFiltroTexto = async (e) => {
        setFiltroTexto({ ...filtroTexto, [e.target.name]: e.target.value });
    }

    const getClientes = async () => {
        axios
            .get("https://psa-soporte-squad7.herokuapp.com/tickets/clientes").then(res => {
                const clientes = res.data.data;
                setClientes(clientes);
            }).catch((err) => {
                console.log(err);
            });
    }

    const handleBotonFiltrado = async () => {
        setClientesFiltrados(clientes);
        if (filtroTexto.razonsocial === "" & filtroTexto.cuit === "") {
            handleShowBusquedaError();
            return
        }
        if (filtroTexto.razonsocial === "" & filtroTexto.cuit !== "") {
            /* Busco CUIT */
            setClientesFiltrados(clientes.filter(obj => { return obj.CUIT === filtroTexto.cuit }))
        }
        if (filtroTexto.razonsocial !== "" & filtroTexto.cuit === "") {
            /* Busco Razon Social */
            setClientesFiltrados(clientes.filter(obj => { return obj["razon social"] === filtroTexto.razonsocial }))
        }
        if (filtroTexto.razonsocial !== "" & filtroTexto.cuit !== "") {
            /* Busco Ambas */
            setClientesFiltrados(clientes.filter(obj => { return obj.CUIT === filtroTexto.cuit & obj["razon social"] === filtroTexto.razonsocial }))
        }
        handleShowBusquedaOk();
        setFiltrado(true);
    }

    const handleBotonQuitarFiltrado = async (e) => {
        setFiltrado(false);
    }

    useEffect(() => {
        getClientes();
    }, [])

    return (
        <Fragment>
            <NavbarSoporte />
            <>
                <Snackbar open={showBusquedaOk} autoHideDuration={1500} onClose={handleCloseBusquedaOk} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseBusquedaOk} variant="info" sx={{ width: '100%' }}>Busqueda realizada con exito.</Alert>
                </Snackbar>
            </>
            <>
                <Snackbar open={showBusquedaError} autoHideDuration={2000} onClose={handleCloseBusquedaError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseBusquedaError} variant="danger" sx={{ width: '100%' }}>Error: primero se debe ingresar al menos un parametro de busqueda.</Alert>
                </Snackbar>
            </>

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
                        <Col className="v-center" sm={1}><h6>Buscar:</h6></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" name="razonsocial" placeholder="Razon social" onChange={(e) => onChangeFiltroTexto(e)} /></Col>
                        <Col className="v-center" sm={3}><Form.Control type="filtro" name="cuit" placeholder="CUIT" onChange={(e) => onChangeFiltroTexto(e)} /></Col>
                        {filtrado ? (
                            <Col className="v-center"><Button variant="secondary" size="1" onClick={handleBotonQuitarFiltrado}>Remover busqueda</Button></Col>
                        ) : (
                            <Col className="v-center"><Button variant="secondary" size="1" onClick={handleBotonFiltrado}>Buscar</Button></Col>
                        )}
                    </Row>
                </Form>
            </Container>

            <Container className="tabla-clientes">
                <Row>
                    <Table clientes>
                        <thead>
                            <tr>
                                <th>Client_ID</th>
                                <th>Razon Social</th>
                                <th>CUIT</th>
                                <th>Versiones Adquiridas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtrado ? (
                                clientesFiltrados.length > 0 ? clientesFiltrados.sort((a, b) => a.id > b.id ? 1 : -1).map((cliente) => (
                                    <tr>
                                        <td>{cliente.id}</td>
                                        <td>{cliente["razon social"]}</td>
                                        <td>{cliente.CUIT}</td>
                                        <td><ModalVersionesAdquiridas cliente={cliente} refreshClientes={getClientes} /></td>
                                    </tr>
                                )) : <Row className="centered">No se encontraron clientes para los filtros dados</Row>
                            ) : (
                                clientes.length > 0 ? clientes.sort((a, b) => a.id > b.id ? 1 : -1).map((cliente) => (
                                    <tr>
                                        <td>{cliente.id}</td>
                                        <td>{cliente["razon social"]}</td>
                                        <td>{cliente.CUIT}</td>
                                        <td><ModalVersionesAdquiridas cliente={cliente} /></td>
                                    </tr>
                                )) : <Row className="centered">No se encontraron clientes</Row>
                            )}
                        </tbody>
                    </Table>
                </Row>
            </Container>

        </Fragment>
    );
}


export default Clientes