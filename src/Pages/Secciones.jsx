import { useState } from "react";
import Pagination from "../Components/Structure/Pagination.jsx";
import {Header} from "../Components/Structure/Header.jsx";
import SectionCard from "../Components/Admin/SectionCard.jsx";

export default function Secciones() {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="secciones"/>

            <SectionCard/>

            <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}