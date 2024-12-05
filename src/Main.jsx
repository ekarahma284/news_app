import React from "react";
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import router from "./Router";// Mengimpor router dari router.jsx
import Home from "./Pages/Home";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
        <Home></Home>
    </React.StrictMode>
);
