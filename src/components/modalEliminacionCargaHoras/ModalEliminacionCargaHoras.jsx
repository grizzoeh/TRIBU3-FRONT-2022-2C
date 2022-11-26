import React, { Fragment, useState, useEffect } from "react";
import "./ModalEliminacionCargaHoras.css";
import 'react-calendar/dist/Calendar.css';

import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";

function navegarACargaDeHorasPorId(id){
    
}

const ModalModificacionCargaHoras = () => {
    //const [cargasHoras, setCargasHoras] = useState([]);

    const navigate = useNavigate();
    
    function createData(id, fecha, legajo) {
        return { id, fecha, legajo };
      }
      
      const cargasHoras = [
        createData(1,'26/11/2022',1),
        createData(2,'26/11/2022',1),
        createData(3,'27/11/2022',6),
        createData(4,'28/11/2022',9)
      ];

    /*fetch("http://localhost:8080/recursos/carga/getAllCargas")
    .then(res=>res.json()).then(()=>{console.log("SeCargaronCargas")})
    .then((result)=>{
        setCargasHoras(result);
    })*/
    /* Falta terminar de ver como extraer la informacion del back, el fetch falla. Puede ser por la caida de la base de datos*/
    return (
        <container>
            <div>
                <TextField id="outlined-basic" label="Buscar Carga de Horas por Id" variant="outlined" sx={{ minWidth: 650 }}/>
            </div>
            <div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Id</TableCell>
                                <TableCell align="right">Fecha</TableCell>
                                <TableCell align="right">Legajo</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cargasHoras.map((carga) => (
                                <TableRow
                                    key={carga.codigo_carga}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    onClick={() => console.log("")}
                                    >
                                    <TableCell align="left" component="th" scope="row">{carga.id}</TableCell>
                                    <TableCell align="right">{carga.fecha}</TableCell>
                                    <TableCell align="right">{carga.legajo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </container>
    );
}; 

export default ModalModificacionCargaHoras