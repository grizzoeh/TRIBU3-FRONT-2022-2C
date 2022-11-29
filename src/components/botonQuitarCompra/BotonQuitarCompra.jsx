import React, { useState, version } from 'react';
import "./botonQuitarCompra.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";
import { wait } from '@testing-library/user-event/dist/utils';
import { Snackbar } from "@mui/material";
import Alert from 'react-bootstrap/Alert';


function BotonActivarVersion({compra, refreshCompras, refreshAlert}) {


    const [show, setShow] = useState(false);
    const handleClose = () => {
        refreshCompras();
        setShow(false);
    } 
    const handleShow = () => setShow(true);

    const vertical = "top"
    const horizontal = "center"

    const [showBusquedaError, setShowBusquedaError] = useState(false);
    const handleCloseBusquedaError = () => {
        setShowBusquedaError(false);
    }
    const handleShowBusquedaError = () => setShowBusquedaError(true);

    const eliminarCompra = async () => {
        const sendData = { id: compra.id }
        axios
            .delete(SERVER_NAME_SOPORTE + "/compras/compra/", { data: sendData })
            .then((res) => {
                refreshAlert();
                handleClose();
                console.log("Compra Eliminada")
            })
            .catch((err) => {
                console.log(err);
                handleShowBusquedaError();
            });
    }

    return (
        <>
            <>
                <Snackbar open={showBusquedaError} autoHideDuration={2000} onClose={handleCloseBusquedaError} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
                    <Alert onClose={handleCloseBusquedaError} variant="danger" sx={{ width: '100%' }}>Error al eliminar la compra.</Alert>
                </Snackbar>
            </>
            <Button variant="danger" size="sm" onClick={handleShow}>Quitar</Button>
            <Modal dialogClassName="modalContent4" show={show} onHide={handleClose} >
                <Modal.Header>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Confirmar eliminacion de compra: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>¿Esta seguro que desea eliminar esta compra?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button className="h-end" variant="danger" onClick={eliminarCompra}>Eliminar</Button>
                </Modal.Footer>
            </Modal>
        </>

    )

}

export default BotonActivarVersion;