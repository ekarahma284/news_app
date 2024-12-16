import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Indonesia from "./Pages/Indonesia";
import Programing from "./Pages/Programing";
import Search from "./Pages/Search";
import Saved from "./Pages/Saved";
import MainLayout from "./layouts/mainLayout";
import Home from "./Pages/Home";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/home" replace />,
            },
            {
                path: "home",
                element: <Home />,
            },
            {
                path: "ind",
                element: <Indonesia />,
            },
            {
                path: "programming",
                element: <Programing />,
            },
            {
                path: "saved",
                element: <Saved />,
            },
            {
                path: "search",
                element: <Search />,
            },
        ],
    },
]);

export default router;
