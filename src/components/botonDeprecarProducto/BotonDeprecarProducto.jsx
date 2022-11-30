import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";


function BotonDeprecarProducto({producto, refreshProductos, refreshFiltradas, refreshAlert}) {



    const handleEstado = async () => {
        const productoData = {
            id: producto.id,
            nombre: producto.nombre,
            estado: "Deprecado"
        }
        axios.patch(SERVER_NAME_SOPORTE + "/productos/producto", productoData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Producto editado");
                    refreshProductos();
                    if (refreshFiltradas) {
                        refreshFiltradas();
                    }
                    refreshAlert();
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