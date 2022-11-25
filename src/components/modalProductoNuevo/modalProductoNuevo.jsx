import React, { useState } from 'react';
import "./modalProductoNuevo.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from "axios";

function ModalProductoNuevo() {
    
    const ProductoNulo = {
        "nombre":null,
        "estado":null
    }

    const [ProductData, setProductData] = useState(ProductoNulo);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const SERVER_NAME = "http://localhost:3000";

    const onChangeProductoEditable = (e) => {
        setProductData({ ...ProductData, [e.target.name]: e.target.value });
    }
    
    const handleDropdownChange = (e) => {
        setProductData({ ...ProductData, [e.target.name]: e.target.innerHTML });
    }

    const crearProducto = async () => {
        axios.post(SERVER_NAME + "/productos", ProductData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Producto creado");
                    handleClose();
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Col className="h-end"><Button variant="primary" size="1" onClick={handleShow}>+ Nuevo Producto</Button></Col>
            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                <Modal.Header closeButton onClick={handleClose}>
                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Crear un nuevo producto: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="campo">
                        <Col><h6>Nombre del producto:</h6></Col>
                        <Col><Form.Control name="nombre" type="filtro" placeholder="Nombre del producto" onChange={(e) => onChangeProductoEditable(e)}/></Col>
                    </Row>
                    <Row className="campo">
                        <Col><h6>Estado del producto:</h6></Col>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="secondary" id="dropdown-basic" size="sm">
                                    {ProductData.estado ? ProductData.estado : "Seleccionar"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Activo</Dropdown.Item>
                                    <Dropdown.Item name="estado" onClick={(e) => handleDropdownChange(e)}>Deprecado</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cerrar</Button>
                    <Button className="h-end" variant="primary" onClick={crearProducto}>Crear Producto</Button>

                </Modal.Footer>
            </Modal>
        </>
    )

}

export default ModalProductoNuevo;
