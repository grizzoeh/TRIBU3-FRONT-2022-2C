import React, { lazy, Suspense } from "react";
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";

const DashboardProyectos = lazy(() => import("../pages/projectsModule/project/dashboard/index"));
const ProyectoNuevo = lazy(() => import("../pages/projectsModule/project/new/index"));
const TareasDeProyecto = lazy(() => import("../pages/projectsModule/task/dashboard/index"));
// const FiltrarProyecto = lazy(() => import("../pages/projectsModule/project/filter/index"));

const ProyectoRouter = () => {
    return (
        <Router>
            <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
                <Routes>
                    <Route path="/proyectos" element={<DashboardProyectos/>} />
                    <Route path="/crear-proyecto" element={<ProyectoNuevo/>} />
                    <Route path="/proyectos/:id/ver-tareas" element={<TareasDeProyecto/>} />

                    {/* <Route path="/filtrar-proyecto" element={<FiltrarProyecto/>} /> */}
                </Routes>
            </Suspense>
        </Router>
    );
};

export default ProyectoRouter;
