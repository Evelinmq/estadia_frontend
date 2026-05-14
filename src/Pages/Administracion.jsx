import { useState } from "react";
import DataTable from "../Components/Admin/Datatable.jsx";
import {Header} from "../Components/Structure/Header.jsx";

const columns = [
    { key: "nombre", label: "Nombre completo" },
    { key: "correo", label: "Correo electrónico" },
];

const datosIniciales = [
    { nombre: "Nombres ApellidoPaterno ApellidoMaterno", correo: "correo@dominio.com" },
];

export default function Administracion() {
    const [admins, setAdmins] = useState(datosIniciales);

    const handleEdit = (row, index) => {
        console.log("Editar", row, index);
        // ABRIR AQUI MODAL DE EDICIÓN
    };

    const handleDelete = (row, index) => {
        setAdmins(admins.filter((_, i) => i !== index));
    };

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="administracion"/>
            <DataTable
                columns={columns}
                rows={admins}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
}