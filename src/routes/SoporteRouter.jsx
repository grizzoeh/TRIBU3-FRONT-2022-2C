import React, { lazy, Suspense } from "react";
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
//import ProtectedRoute from "./ProtectedRoute";

const TicketsEnCurso = lazy(() => import("../pages/ticketsEncurso/TicketsEnCurso"));



const CrearProductoYVersion = lazy(() => import("../pages/crearProductoYVersion/CrearProductoYVersion"));

const Clientes = lazy(() => import("../pages/clientes/Clientes"));

const SoporteRouter = () => {
    return (
        <Router>
            <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
                <Routes>
                    <Route path="/tickets-en-curso" element={<TicketsEnCurso />} />
                    <Route path="/crear-producto-y-version" element={<CrearProductoYVersion />} />
                    <Route path="/clientes" element={<Clientes />} />
                    {/* <Route path="*" element={<Navigate to="/ticketsEnCurso" />} /> */}

                </Routes>
            </Suspense>
        </Router>
    );
};

export default SoporteRouter;
