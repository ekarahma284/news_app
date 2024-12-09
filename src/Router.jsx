import { createBrowserRouter } from "react-router-dom";
import Indonesia from "./Pages/Indonesia";
import Programing from "./Pages/Programing";
import Search from "./Pages/Search";

// import Covid from "./Pages/Covid";
import Saved from "./Pages/Saved";
import MainLayout from "./layouts/mainLayout";
import Home from "./Pages/Home";
import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
    {
            path: "/", // Root path
            element: <MainLayout />,
            children: [
                {
                    path: "/", // Default route
                    element: <Navigate to="/home" replace />,
                },
                {
                    path: "home", // Path untuk halaman Home
                    element: <Home />,
                },
                {
                    path: "ind", // Path untuk halaman Indonesia
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
                    path: "Search", // Path untuk halaman Saved
                    element: <Search />,
                },

              //  <Route path="/search" element={<Search />} />
        ]
    }
]);

export default router;
