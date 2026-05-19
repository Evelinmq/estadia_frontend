import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../Components/Structure/Header.jsx";
import ImageCard from "../Components/Admin/ImageCard.jsx";
import Pagination from "../Components/Structure/Pagination.jsx";
import { alertaExito, alertaCamposVacios, confirmarEliminar, alertaError } from "../Utils/alerts.js";
import Input from "../Components/Inputs/Input.jsx";
import FileInput from "../Components/Inputs/FileInput.jsx";
import "./ModalGlobal.css";

export default function Alianzas() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const [aliados, setAliados] = useState([
        { id: 1, titulo: "Bancos de alimentos de México", imagen: null }
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

    const imagenSeleccionada = watch("imagen");

    useEffect(() => {
        if (imagenSeleccionada && imagenSeleccionada.length > 0) {
            const file = imagenSeleccionada[0];
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [imagenSeleccionada]);

    const handleOpenModal = (editMode = false) => {
        setIsEditing(editMode);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPreviewImage(null);
        reset();
    };

    const onSubmit = (data) => {
        console.log("Datos del aliado:", data);
        alertaExito(isEditing ? "Aliado actualizado" : "Aliado creado correctamente");
        handleCloseModal();
    };

    const onError = () => {
        if (Object.keys(errors).length > 0) {
            alertaCamposVacios();
        }
    };

    const eliminarAliado = async (id) => {
        const confirmar = await confirmarEliminar();
        if (confirmar) {
            try {
                setAliados(aliados.filter(a => a.id !== id));
                alertaExito("Aliado eliminado correctamente");
            } catch (error) {
                alertaError("No se pudo eliminar el aliado");
            }
        }
    };

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="alianzas" onAdd={() => handleOpenModal(false)} />

            {/*tarjetas de Aliados */}
            <div className="grid-alianzas" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '25px',
                marginTop: '30px'
            }}>
                {aliados.map((aliado) => (
                    <ImageCard
                        key={aliado.id}
                        titulo={aliado.titulo}
                        imagen={aliado.imagen}
                        onEdit={() => handleOpenModal(true)}
                        onDelete={() => eliminarAliado(aliado.id)}
                    />
                ))}
            </div>

            {/* MODAL ALIANZAS */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container-custom">
                        <h2 className="modal-title">
                            {isEditing ? "Editar Aliado" : "Agregar Aliado"}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="modal-center">

                                {/* INPUT DE NOMBRE DEL ALIADO */}
                                <Input
                                    label="Aliado:"
                                    type="text"
                                    placeholder="Nombre del aliado"
                                    error={errors.nombre}
                                    {...register("nombre", {
                                        required: "El nombre del aliado es obligatorio",
                                        pattern: {
                                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                            message: "Solo se permiten letras"
                                        },
                                        validate: (val) =>
                                            val.trim() === val || "No se permiten espacios al inicio o final"
                                    })}
                                />

                                {/* CONTENEDOR DE IMAGEN */}
                                <FileInput
                                    id="file-upload-aliado"
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

            <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}