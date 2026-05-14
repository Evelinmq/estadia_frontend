import { useState } from "react";
import Pagination from "../Components/Structure/Pagination.jsx";

export default function Secciones() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div style={{ padding: "24px" }}>
            <div>Página de Secciones</div>

            <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}