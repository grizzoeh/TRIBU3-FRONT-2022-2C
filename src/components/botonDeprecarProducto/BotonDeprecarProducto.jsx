import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";


function BotonDeprecarProducto(producto) {

    const SERVER_NAME = "http://localhost:3000";

    const handleEstado = async () => {
        const productoData = {
            id: producto["producto"].id,
            nombre: producto["producto"].nombre,
            estado: "Deprecado"
        }
        axios.patch(SERVER_NAME + "/productos/producto", productoData)
        .then((data) => {
            if (data.data.ok) {
                console.log("Producto editado");
                window.location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <Button variant="danger" size="sm" onClick={handleEstado}>Deprecar</Button>
        </>
    )

}

export default BotonDeprecarProducto;