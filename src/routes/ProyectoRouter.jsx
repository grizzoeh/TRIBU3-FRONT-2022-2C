import React, { lazy, Suspense } from "react";
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
import GannChart from "../pages/projectsModule/project/gann/gannChart";

const DashboardProyectos = lazy(() => import("../pages/projectsModule/project/dashboard/index"));
const ProyectoNuevo = lazy(() => import("../pages/projectsModule/project/new/index"));
const EditarProyecto = lazy(() => import("../pages/projectsModule/project/edit/index"));
const TareasDeProyecto = lazy(() => import("../pages/projectsModule/task/dashboard/index"));
const TareaNueva = lazy(() => import("../pages/projectsModule/task/new/index"));
const SubtareaNueva = lazy(() => import("../pages/projectsModule/task/subtask/new/index"));
const VerTarea = lazy(() => import("../pages/projectsModule/task/subtask/view/index"));

const ProyectoRouter = () => {
    return (
        <Router>
            <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
                <Routes>
                    <Route path="/proyectos" element={<DashboardProyectos/>} />
                    <Route path="/crear-proyecto" element={<ProyectoNuevo/>} />
                    <Route path="/proyectos/:id/editar-proyecto" element={<EditarProyecto/>} />
                    <Route path="/proyectos/:id/ver-tareas" element={<TareasDeProyecto/>} />
                    <Route path="/proyectos/:id/crear-tarea" element={<TareaNueva/>} />
                    <Route path="/proyectos/:id/gannt" element={<GannChart/>} />
                    {/* <Route path="/filtrar-proyecto" element={<FiltrarProyecto/>} /> */}
                    <Route path="/proyectos/:id/tareas/:idTarea/crear-subtarea" element={<SubtareaNueva/>} />
                    <Route path="/proyectos/:id/tareas/:idTarea/ver-tarea" element={<VerTarea/>} />
                </Routes>
            </Suspense>
        </Router>
    );
};

export default ProyectoRouter;
