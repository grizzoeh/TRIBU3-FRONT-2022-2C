import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";


function BotonActivarProducto({producto, refreshProductos, refreshFiltradas}) {



    const handleEstado = async () => {
        const productoData = {
            id: producto.id,
            nombre: producto.nombre,
            estado: "Activo"
        }
        axios.patch(SERVER_NAME_SOPORTE + "/productos/producto", productoData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Producto editado");
                    refreshProductos();
                    if (refreshFiltradas) {
                        refreshFiltradas();
                    }
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