import React, { Suspense } from "react";
import { Routes, Route } from "react-router";

const HomePage = React.lazy(() => import("../pages/home/HomePage"));
const routeConfig = [
    { path: "/", component: HomePage },
];

const AppRoutes = () => {
    return (
        <Suspense fallback={<>loading...</>}>
            <Routes>
                {routeConfig?.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;


