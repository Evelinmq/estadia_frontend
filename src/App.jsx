import './App.css';

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Components/Structure/Sidebar.jsx";
import Beneficiarios from "./Pages/Beneficiarios";
import Afiliados from "./Pages/Afiliados";
import Administracion from "./Pages/Administracion";
import Programas from "./Pages/Programas";
import Secciones from "./Pages/Secciones";
import Alianzas from "./Pages/Alianzas";
import Objetivos from "./Pages/Objetivos.jsx";
import PantallaPrincipal from "./Pages/PantallaPrincipal.jsx";

function PublicLayout() {
    return (
        <div className="public-page-content">
            <Outlet />
        </div>
    );
}


function AdminLayout() {
    return (
        <>
            <Sidebar />
            <div className="sidebar-page-content">
                <Outlet /> 
            </div>
        </>
    );
}


function App() {

    return (
        <BrowserRouter>

        <Routes>

        <Route element={<PublicLayout />}>
        <Route path="/pantalla-principal" element={<PantallaPrincipal />} />
        </Route>
            
                <Route element={<AdminLayout />}>
                    <Route path="/beneficiarios" element={<Beneficiarios />} />
                    <Route path="/afiliados" element={<Afiliados />} />
                    <Route path="/administracion" element={<Administracion />} />
                    <Route path="/programas" element={<Programas />} />
                    <Route path="/secciones" element={<Secciones />} />
                    <Route path="/alianzas" element={<Alianzas />} />
                    <Route path="/objetivos" element={<Objetivos />} />
                </Route>

                <Route path="/" element={<Navigate to="/pantalla-principal" />} />
           </Routes>
        </BrowserRouter>
    );
}

export default App;
