import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaSecciones from '../Pages/Secciones/PaginaSecciones.jsx';
import DetalleSeccion from '../Pages/Secciones/DetalleSeccion.jsx';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Otras rutas */}
                {/* <Route path="/" element={<Inicio />} /> */}

                {/* Lista de secciones */}
                <Route path="/secciones" element={<PaginaSecciones />} />

                {/* Detalle dinámico de cada sección */}
                <Route path="/secciones/:slug" element={<DetalleSeccion />} />
            </Routes>
        </BrowserRouter>
    );
}