import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "../Components/Admin/Datatable.jsx";
import { Header } from "../Components/Structure/Header.jsx";
import { alertaExito, alertaCamposVacios, alertaError } from "../Utils/alerts.js";
import "./ModalGlobal.css";
import TextArea from "../Components/Inputs/TextArea.jsx";

import { obtenerDatos, actualizarDatos } from "../Utils/api.js";

const columns = [
    { key: "name", label: "Objetivo" },
    { key: "description", label: "Descripción" },
];

export default function Objetivos() {
    const [objetivos, setObjetivos] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [idEdicion, setIdEdicion] = useState(null);
    const [objetivoSeleccionado, setObjetivoSeleccionado] = useState("");
    const [loading, setLoading] = useState(true);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                setLoading(true);

                const datos = await obtenerDatos("/api/goal");
                setObjetivos(datos)
            } catch (error) {
                alertaError("Ocurrió un error al obtener los datos");
                console.log("Error al obtener datos de la API: ", error);
            } finally {
                setLoading(false);
            }
        };
        cargarDatos();
    }, []);

    const handleEdit = (row) => {
        const idFila = row.id;

        setIdEdicion(idFila)
        setObjetivoSeleccionado(row.name);
        setShowModal(true);

        setValue("descripcion", row.description);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIdEdicion(null);
        setObjetivoSeleccionado("");
        reset();
    };

    const onSubmit = async (data) => {

        try {

            const descripcionLimpia = data.descripcion?.trim();

                await actualizarDatos(`/api/goal/${idEdicion}`, {
                    id: idEdicion,
                    name: objetivoSeleccionado,
                    description: data.descripcion
                });


            const nuevosObjetivos = objetivos.map((obj) => {
                if (obj.id === idEdicion) {
                    return {
                        ...obj,
                        description: descripcionLimpia
                    };
                }
                return obj;
            });

            setObjetivos(nuevosObjetivos);
            alertaExito(`${objetivoSeleccionado} actualizada con éxito`);
            handleCloseModal();
        } catch (error) {
            alertaError("Error del servidor");
            console.error("Error al actualizar: ", error);
        }

    };

    const onError = () => {
        if (Object.keys(errors).length > 0) {
            alertaCamposVacios();
        }
    };

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="objetivos" />

            <DataTable
                columns={columns}
                rows={objetivos}
                onEdit={handleEdit}
            />

            {/* MODAL OBJETIVOS */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container-custom">
                        <h2 className="modal-title">{objetivoSeleccionado}</h2>

                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="modal-center" style={{ maxWidth: '100%' }}>

                                {/* ÁREA DE DESCRIPCIÓN */}
                                <TextArea
                                    label="Descripción:"
                                    placeholder="Descripción"
                                    rows={6}
                                    error={errors.descripcion}
                                    {...register("descripcion", {
                                        required: "La descripción del objetivo es obligatoria",
                                        validate: (val) => val.trim() === val || "No se permiten espacios al inicio o final"
                                    })}
                                />

                            </div>

                            <div className="modal-actions">
                                <button type="button" className="btn-cancelar" onClick={handleCloseModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-guardar">
                                    Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}