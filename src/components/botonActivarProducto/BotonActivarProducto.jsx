import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";


function BotonActivarProducto(producto) {



    const handleEstado = async () => {
        const productoData = {
            id: producto["producto"].id,
            nombre: producto["producto"].nombre,
            estado: "Activo"
        }
        axios.patch(SERVER_NAME_SOPORTE + "/productos/producto", productoData)
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
            <Button variant="success" size="sm" onClick={handleEstado}>Activar</Button>
        </>
    )

}

export default BotonActivarProducto;