import React, { lazy, Suspense } from "react";
import {
    Routes,
    Route,
    BrowserRouter as Router,
} from "react-router-dom";
//import ProtectedRoute from "./ProtectedRoute";

const Index = lazy(() => import("../pages/index/Index"));



const IndexRouter = () => {
    return (
        <Router>
            <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
                <Routes>
                    <Route path="/" element={<Index />} />


                    {/* <Route path="*" element={<Navigate to="/ticketsEnCurso" />} /> */}

                </Routes>
            </Suspense>
        </Router>
    );
};

export default IndexRouter;
