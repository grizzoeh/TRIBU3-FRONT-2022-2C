import React, { lazy, Suspense } from "react";
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
//import ProtectedRoute from "./ProtectedRoute";

const CargaDeHoras = lazy(() => import("../pages/cargaDeHoras/CargaDeHoras"));

const ModificacionCargaHoras = lazy(() => import("../pages/modificacionCargaHoras/ModificacionCargaHoras"));

const InformacionCargaHoras = lazy(() => import("../pages/informacionCargaHoras/InformacionCargaHoras"));

const RecursosRouter = () => {
    return (
        <Router>
            <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
                <Routes>
                    <Route path="/cargar-horas" element={<CargaDeHoras />} />
                    <Route path="/modificar-carga" element={<ModificacionCargaHoras />} />
                    <Route path="/consultar-carga" element={<InformacionCargaHoras />} />

                    {/* <Route path="*" element={<Navigate to="/ticketsEnCurso" />} /> */}

                </Routes>
            </Suspense>
        </Router>
    );
};

export default RecursosRouter;
