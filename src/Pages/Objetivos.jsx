import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "../Components/Admin/Datatable.jsx";
import { Header } from "../Components/Structure/Header.jsx";
import { alertaExito, alertaCamposVacios } from "../Utils/alerts.js";
import "./ModalGlobal.css";

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
    const [showModal, setShowModal] = useState(false);

    const [indexEdicion, setIndexEdicion] = useState(null);
    const [objetivoSeleccionado, setObjetivoSeleccionado] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onChange"
    });

    const handleEdit = (row, index) => {
        setIndexEdicion(index);
        setObjetivoSeleccionado(row.objetivo);
        setShowModal(true);

        setValue("descripcion", row.descripcion);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIndexEdicion(null);
        setObjetivoSeleccionado("");
        reset();
    };

    const onSubmit = (data) => {
        const nuevosObjetivos = [...objetivos];
        nuevosObjetivos[indexEdicion].descripcion = data.descripcion;

        setObjetivos(nuevosObjetivos);
        alertaExito(`${objetivoSeleccionado} actualizada con éxito`);
        handleCloseModal();
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
                                <div className="form-group" style={{ width: '100%' }}>
                                    <label className="label">Descripción:</label>
                                    <textarea
                                        placeholder="Descripción"
                                        className="modal-input"
                                        style={{
                                            height: '220px',
                                            paddingTop: '14px',
                                            resize: 'none',
                                            borderColor: errors.descripcion ? '#ef4444' : '#d1d5db'
                                        }}
                                        {...register("descripcion", {
                                            required: "La descripción es obligatoria",
                                            validate: (val) => val.trim() === val || "No se permiten espacios al inicio o final"
                                        })}
                                    />
                                    {errors.descripcion && <span className="error">{errors.descripcion.message}</span>}
                                </div>

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