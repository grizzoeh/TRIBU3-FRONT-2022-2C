import React, { useState, version } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";


function BotonActivarVersion({version, refreshVersiones, refreshFiltradas, refreshAlert}) {




    const activarVersion = async () => {
        const versionData = {
            id: version.id,
            nombre: version.nombre,
            idProducto: version.idProducto,
            estado: "Activa",
            fechaRelease: version.fechaRelease,
            fechaDeprecacion: null
        }
        axios.patch(SERVER_NAME_SOPORTE + "/versiones/version", versionData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Version activada");
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
            <Button variant="success" size="sm" onClick={activarVersion}>Activar</Button>
        </>
    )

}

export default BotonActivarVersion;