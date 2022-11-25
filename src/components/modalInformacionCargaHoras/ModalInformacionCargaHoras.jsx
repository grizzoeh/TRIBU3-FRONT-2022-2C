import React, { Fragment, useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import "./ModalInformacionCargaHoras.css";
import Form from 'react-bootstrap/Form';
import 'react-calendar/dist/Calendar.css';

const ModalInformacionCargaHoras = () => {
    return(
        <div>
            <h2>
                Seleccione un empleado
            </h2>
            <Form className="d-flex">
                <Form.Control
                    type="Search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Seach"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            <button id="button">Consultar por proyecto/tarea</button>
        </div>
    )
};

export default ModalInformacionCargaHoras