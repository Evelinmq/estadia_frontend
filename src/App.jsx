import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Beneficiarios from "./Pages/Beneficiarios";
import Afiliados from "./Pages/Afiliados";
import Administracion from "./Pages/Administracion";
import Programas from "./Pages/Programas";
import Secciones from "./Pages/Secciones";
import Alianzas from "./Pages/Alianzas";
import Objetivos from "./Pages/Objetivos.jsx";

function App() {

    return (
        <BrowserRouter>
            <Sidebar />
            <div className="sidebar-page-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/programas" />} />
                    <Route path="/beneficiarios" element={<Beneficiarios />} />
                    <Route path="/afiliados" element={<Afiliados />} />
                    <Route path="/administracion" element={<Administracion />} />
                    <Route path="/programas" element={<Programas />} />
                    <Route path="/secciones" element={<Secciones />} />
                    <Route path="/alianzas" element={<Alianzas />} />
                    <Route path="/objetivos" element={<Objetivos />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
