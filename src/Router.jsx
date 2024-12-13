import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import Indonesia from "./Pages/Indonesia";
import Programing from "./Pages/Programing";
// import Search from "./Pages/Search";
import Search from "./Pages/Search";
import Saved from "./Pages/Saved";
import MainLayout from "./layouts/mainLayout";
import Home from "./Pages/Home";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/", // Root path
        element: <MainLayout />, // Layout utama untuk aplikasi
        children: [
            {
                path: "/", // Default route akan mengarahkan ke home
                element: <Navigate to="/home" replace />,
            },
            {
                path: "home", // Path untuk halaman Home
                element: <Home />,
            },
            {
                path: "ind", // Path untuk halaman Indonesia (perbaikan dari 'ind')
                element: <Indonesia />,
            },
            {
                path: "programming", // Path untuk halaman Programming
                element: <Programing />,
            },
            {
                path: "saved", // Path untuk halaman Saved
                element: <Saved />,
            },
            {
                path: "Search", // Path untuk halaman Search (perbaikan dari 'Search')
                element: <Search />,
            },
        ],
    },
]);

export default router;
