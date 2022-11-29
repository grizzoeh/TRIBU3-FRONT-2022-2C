import React, { useState, version } from 'react';
import "./botonQuitarCompra.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


function BotonActivarVersion(compra) {

    const SERVER_NAME = "http://localhost:3000";


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const eliminarCompra= async () => {
        const sendData = {id:compra["compra"].id}
        axios
            .delete(SERVER_NAME + "/compras/compra/", {data:sendData})
            .then((res) => {
                console.log("Compra Eliminada")
                window.location.reload();
                handleClose();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
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