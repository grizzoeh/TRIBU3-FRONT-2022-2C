import React, { useState, version } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";


function BotonActivarVersion({version, refreshVersiones, refreshFiltradas}) {


    const [versionModificada, setVersionModificada] = useState(version)

    const activarVersion = async () => {
        versionModificada.estado = "Activa";
        axios.patch(SERVER_NAME_SOPORTE + "/versiones/version", versionModificada)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Version editada");
                    refreshVersiones();
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
            <Button variant="success" size="sm" onClick={activarVersion}>Activar</Button>
        </>
    )

}

export default BotonActivarVersion;