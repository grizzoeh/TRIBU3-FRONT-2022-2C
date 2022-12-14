import React, { lazy, Suspense } from "react";
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
//import ProtectedRoute from "./ProtectedRoute";

const CargaDeHoras = lazy(() => import("../pages/cargaDeHoras/CargaDeHoras"));

const CargaDeHorasProyecto = lazy(() => import("../pages/cargaDeHorasProyecto/CargaDeHorasProyecto"));

const CargaDeHorasLicencia = lazy(() => import("../pages/cargaDeHorasLicencia/CargaDeHorasLicencia"));

const ModificacionCargaHoras = lazy(() => import("../pages/modificacionCargaHoras/ModificacionCargaHoras"));

const InformacionCargaDeHorasPorLegajo = lazy(() => import("../pages/ConsultarCargaHorasPorLegajo/ConsultarCargaHorasPorLegajo"));

const ConsultarReportes = lazy(() => import("../pages/ConsultarReportes/ConsultarReportes"));

const ConsultarReportesPersona = lazy(() => import("../pages/ConsultarReportesPersona/ConsultarReportesPersona"));

const EliminarCargaHoras = lazy(() => import("../pages/EliminarCargaHoras/EliminarCargaHoras"));

const CrearCategoria = lazy(() => import("../pages/crearCategoria/CrearCategoria"));

const ModificarCategoria = lazy(() => import("../pages/modificarCategoria/modificarCategoria"));

const EliminarCategoria = lazy(() => import("../pages/eliminarCategoria/eliminarCategoria"));

const RecursosRouter = () => {
    return (
        <Router>
            <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
                <Routes>
                    <Route path="/cargar-horas" element={<CargaDeHoras />} />
                    <Route path="/cargar-horas/proyectos" element={<CargaDeHorasProyecto />} />
                    <Route path="/cargar-horas/licencias" element={<CargaDeHorasLicencia />} />
                    <Route path="/modificar-carga-horas" element={<ModificacionCargaHoras />} />
                    <Route path="/consultar-por-legajo" element={<InformacionCargaDeHorasPorLegajo />} />
                    <Route path="/eliminar-carga-horas" element={<EliminarCargaHoras />} />
                    <Route path="/consultar-reportes-por-proyecto" element={<ConsultarReportes />} />
                    <Route path="/consultar-reportes-por-persona" element={<ConsultarReportesPersona />} />
                    <Route path="/crear-categoria" element={<CrearCategoria />} />
                    <Route path="/modificar-categoria" element={<ModificarCategoria />} />
                    <Route path="/eliminar-categoria" element={<EliminarCategoria />} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default RecursosRouter;
