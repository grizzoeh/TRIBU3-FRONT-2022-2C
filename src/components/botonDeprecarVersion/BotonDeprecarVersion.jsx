import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";


function BotonDeprecarVersion({version, refreshVersiones, refreshFiltradas, refreshAlert}) {


    const handleEstado = async () => {
        var currentdate = new Date();
        const versionData = {
            id: version.id,
            nombre: version.nombre,
            idProducto: version.idProducto,
            estado: "Deprecada",
            fechaRelease: version.fechaRelease,
            fechaDeprecacion: currentdate
        }
        axios.patch(SERVER_NAME_SOPORTE + "/versiones/version", versionData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Version deprecada");
                    refreshVersiones();
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

export default BotonDeprecarVersion;