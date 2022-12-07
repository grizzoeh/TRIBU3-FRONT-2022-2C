import React, { Fragment, useState, useEffect } from "react";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./modalInfoTask.css";
import axios from "axios";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import moment from "moment";
import * as SERVER_NAMES from "../../../APIRoutes";


const ModalInfoBorrarTarea = ({ data, getDataTareas, setRefreshKey, setAlertaBorradoExito, handleClosePadre}) => {

    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);

    const handleClose = () => {
        setShow(false);
    };

    const handleBorrado = async () => {
        axios.delete(SERVER_NAMES.PROJECTS + `/psa/projects/tasks/${data.id}`)
          .then((data) => {
            if (data.data.ok) {
              console.log("Tarea borrada");
            }
          })
          .catch((error) => {
            console.log(error);
          });


          setTimeout(() => {
            // After 1 second
            handleClose();
            setAlertaBorradoExito(true);
          }, 100)
          setTimeout(() => {
            // After 1 second
            handleClosePadre()
            getDataTareas();
            setRefreshKey(oldKey => oldKey +1)
          }, 1000)
      }

 

    useEffect(() => {

    }, []);

    return (
        <>
            <Button variant="danger" onClick={() => { handleShow() }}>Borrar</Button>

            <Modal dialogClassName="modalContent2" show={show} onHide={handleClose} >
                            <Modal.Header closeButton onClick={handleClose}>
                                    <Modal.Title style={{ backgroundColor: "white", color: "black" }}>Borrar tarea #{data.id}: </Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                   
                                    <Col>
                                        <Row><h6>¿Esta seguro que quiere borrar la tarea?</h6></Row>
                                        <Row><h6>Esto borrará todas las subtareas asociadas:</h6> </Row>
                                    </Col>
                    
                            </Modal.Body>

                            <Modal.Footer>
                                    <Button className="h-end" variant="danger" onClick={handleBorrado}>Borrar</Button>
                                    <Button className="h-end" variant="secondary" onClick={handleClose}>Cancelar</Button>
                            </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalInfoBorrarTarea;







