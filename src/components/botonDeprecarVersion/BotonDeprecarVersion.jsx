import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { SERVER_NAME_SOPORTE } from "../../environment";


function BotonDeprecarVersion({version, refreshVersiones, refreshFiltradas}) {



    const handleEstado = async () => {
        const versionData = {
            id: version.id,
        }
        axios.patch(SERVER_NAME_SOPORTE + "/versiones/deprecacion", versionData)
            .then((data) => {
                if (data.data.ok) {
                    console.log("Version deprecada");
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
            <Button variant="danger" size="sm" onClick={handleEstado}>Deprecar</Button>
        </>
    )

}

export default BotonDeprecarVersion;