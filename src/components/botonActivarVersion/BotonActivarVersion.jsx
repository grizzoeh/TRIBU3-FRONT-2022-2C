import React, { useState, version } from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";


function BotonActivarVersion(version, refreshFunction) {

    const SERVER_NAME = "http://localhost:3000";

    const [versionModificada, setVersionModificada] = useState(version["version"])

    const activarVersion = async () => {
        versionModificada.estado = "Activa";
        axios.patch(SERVER_NAME + "/versiones/version", versionModificada)
        .then((data) => {
            if (data.data.ok) {
                console.log("Version editada");
                window.location.reload();
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