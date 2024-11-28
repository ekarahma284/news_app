import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../Pages/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Pages/Footer";

function MainLayout() {
    return (
        <div>
            <Header/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </div>
    );
}

export default MainLayout;
