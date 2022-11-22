import React, { lazy, Suspense } from "react";
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
//import ProtectedRoute from "./ProtectedRoute";

const TicketsEnCurso = lazy(() => import("../pages/ticketsEncurso/TicketsEnCurso"));

const TicketsCerrados = lazy(() => import("../pages/ticketsCerrados/TicketsCerrados"));


const CrearProductoYVersion = lazy(() => import("../pages/crearProductoYVersion/CrearProductoYVersion"));


const SoporteRouter = () => {
    return (
        <Router>
            <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
                <Routes>
                    <Route path="/tickets-en-curso" element={<TicketsEnCurso />} />
                    <Route path="/tickets-resueltos" element={<TicketsCerrados />} />
                    <Route path="/crear-producto-y-version" element={<CrearProductoYVersion />} />


                    {/* <Route path="*" element={<Navigate to="/ticketsEnCurso" />} /> */}

                </Routes>
            </Suspense>
        </Router>
    );
};

export default SoporteRouter;
