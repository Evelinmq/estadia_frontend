import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Pagination from "../Components/Structure/Pagination.jsx";
import { Header } from "../Components/Structure/Header.jsx";
import SectionCard from "../Components/Admin/SectionCard.jsx";
import { alertaExito, alertaCamposVacios, confirmarEliminar, alertaError } from "../Utils/alerts";
import Input from "../Components/Inputs/Input.jsx";
import TextArea from "../Components/Inputs/TextArea.jsx";
import FileInput from "../Components/Inputs/FileInput.jsx";
import "./ModalGlobal.css";

export default function Secciones() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const [secciones, setSecciones] = useState([
        { id: 1, titulo: "Emprende tu negocio", descripcion: "Se busca potenciar el crecimiento..." }
    ]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange"
    });

    const onSubmit = (data) => {
        alertaExito(isEditing ? "Sección actualizada" : "Sección creada");
        handleCloseModal();
    };

    const onError = () => {
        if (Object.keys(errors).length > 0) {
            alertaCamposVacios();
        }
    };

    const handleOpenModal = (editMode = false) => {
        setIsEditing(editMode);
        setShowModal(true);
    };

    const imagenSeleccionada = watch("imagen");

    useEffect(() => {
        if (imagenSeleccionada && imagenSeleccionada.length > 0) {
            const file = imagenSeleccionada[0];
            setPreviewImage(URL.createObjectURL(file));
        }
    }, [imagenSeleccionada]);

    const eliminar = async (id) => {
        const confirmar = await confirmarEliminar();

        if (confirmar) {
            try {
                // await api.delete(id);
                alertaExito("Sección eliminada correctamente");
                // RECARGAR LA VISTA EN TIEMPO REAL
                setSecciones(secciones.filter(seccion => seccion.id !== id));

            } catch (error) {
                alertaError("No se pudo eliminar la sección");
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPreviewImage(null);
        reset();
    };

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="secciones" onAdd={() => handleOpenModal(false)} />

            <div className="grid-secciones" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
                {secciones.map((sec) => (
                    <SectionCard
                        key={sec.id}
                        titulo={sec.titulo}
                        descripcion={sec.descripcion}
                        onEdit={() => handleOpenModal(true)}
                        onDelete={() => eliminar(sec.id)}
                    />
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container-custom">
                        <h2 className="modal-title">{isEditing ? "Editar Sección" : "Agregar Sección"}</h2>

                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="modal-center">

                                {/* INPUT SECCIÓN */}
                                <Input
                                    label="Sección:"
                                    type="text"
                                    placeholder="Nombre de la sección"
                                    error={errors.nombre}
                                    {...register("nombre", {
                                        required: "El nombre de la sección es obligatorioa",
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: "Solo se permiten letras"
                                        },
                                        validate: (val) =>
                                            val.trim() === val || "No se permiten espacios al inicio o final"
                                    })}
                                />

                                {/* ÁREA DESCRIPCIÓN */}
                                <TextArea
                                    label="Descripción:"
                                    placeholder="Descripción"
                                    error={errors.descripcion}
                                    style={{ minHeight: '100px' }}
                                    {...register("descripcion", {
                                        required: "La descripción es obligatoria",
                                        validate: (val) => val.trim() === val || "Sin espacios al inicio o final"
                                    })}
                                />

                                {/* IMAGEN */}
                                <FileInput
                                    label="Imagen:"
                                    previewImage={previewImage}
                                    error={errors.imagen}
                                    {...register("imagen", {
                                        required: !isEditing ? "La imagen es obligatoria" : false
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

            <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
        </div>
    );
}