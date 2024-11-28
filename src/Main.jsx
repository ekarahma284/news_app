import React from "react";
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import router from "./Router";// Mengimpor router dari router.jsx

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
