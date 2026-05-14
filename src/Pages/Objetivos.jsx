import { useState } from "react";
import DataTable from "../Components/Admin/Datatable.jsx";
import {Header} from "../Components/Structure/Header.jsx";

const columns = [
    { key: "objetivo", label: "Objetivo" },
    { key: "descripcion", label: "Descripción" },
];

const datosIniciales = [
    {
        objetivo: "Visión",
        descripcion:
            "Consolidarnos como la organización líder y referente en el estado de Morelos por nuestra capacidad de transformar el entorno social de las comunidades indígenas y grupos vulnerables. Aspiramos a un futuro donde cada ciudadano tenga acceso pleno a la salud, educación de calidad y justicia social, logrando un desarrollo regional sustentable, inclusivo y en total armonía con la cultura y el medio ambiente de nuestra región.",
    },
    {
        objetivo: "Misión",
        descripcion: "Alguna descripción"
    },
];

export default function Objetivos() {
    const [objetivos, setObjetivos] = useState(datosIniciales);

    const handleEdit = (row, index) => {
        console.log("Editar", row, index);
        // aqui abrir modal de edición
    };

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="objetivos"/>
            <DataTable
                columns={columns}
                rows={objetivos}
                onEdit={handleEdit}
            />
        </div>
    );
}