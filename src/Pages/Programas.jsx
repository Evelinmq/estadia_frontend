import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../Components/Structure/Header.jsx";
import ImageCard from "../Components/Admin/ImageCard.jsx";
import Pagination from "../Components/Structure/Pagination.jsx";
import { alertaExito, alertaCamposVacios, confirmarEliminar, alertaError } from "../Utils/alerts";
import Select from "../Components/Inputs/Select.jsx";
import FileInput from "../Components/Inputs/FileInput.jsx";
import "./ModalGlobal.css";

export default function Programas() {
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    // 1. Simulación de secciones registradas (Esto vendrá de tu API después)
    const [seccionesRegistradas] = useState([
        { id: 1, nombre: "Emprendimiento" },
        { id: 2, nombre: "Deportes" },
        { id: 3, nombre: "Cultura" },
        { id: 4, nombre: "Salud" }
    ]);

    // 2. Simulación de programas registrados
    const [programas, setProgramas] = useState([
        { id: 101, titulo: "Emprende tu negocio", imagen: null }
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

    // Observar cambios en la imagen para la vista previa
    const imagenSeleccionada = watch("imagen");

    useEffect(() => {
        if (imagenSeleccionada && imagenSeleccionada.length > 0) {
            const file = imagenSeleccionada[0];
            const url = URL.createObjectURL(file);
            setPreviewImage(url);
            return () => URL.revokeObjectURL(url); // Limpieza de memoria
        }
    }, [imagenSeleccionada]);

    // Funciones de Modal
    const handleOpenModal = (editMode = false) => {
        setIsEditing(editMode);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPreviewImage(null);
        reset();
    };

    // Operaciones (Simuladas)
    const onSubmit = (data) => {
        console.log("Datos del programa:", data);
        alertaExito(isEditing ? "Programa actualizado" : "Programa creado correctamente");
        handleCloseModal();
    };

    const onError = () => {
        if (Object.keys(errors).length > 0) {
            alertaCamposVacios();
        }
    };

    const eliminarPrograma = async (id) => {
        const confirmar = await confirmarEliminar();
        if (confirmar) {
            try {
                // Simulación de eliminación
                setProgramas(programas.filter(p => p.id !== id));
                alertaExito("Programa eliminado correctamente");
            } catch (error) {
                alertaError("No se pudo eliminar el programa");
            }
        }
    };

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="programas" onAdd={() => handleOpenModal(false)} />

            {/* Listado de Programas */}
            <div className="grid-programas" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '25px',
                marginTop: '30px'
            }}>
                {programas.map((prog) => (
                    <ImageCard
                        key={prog.id}
                        titulo={prog.titulo}
                        imagen={prog.imagen}
                        onEdit={() => handleOpenModal(true)}
                        onDelete={() => eliminarPrograma(prog.id)}
                    />
                ))}
            </div>

            {/* MODAL PROGRAMAS */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container-custom">
                        <h2 className="modal-title">
                            {isEditing ? "Editar Programa" : "Agregar Programa"}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="modal-center">

                                {/* SELECT DE SECCIÓN */}
                                <Select
                                    label="Sección:"
                                    error={errors.seccionId}
                                    {...register("seccionId", { required: "Debes seleccionar una sección a la que corresponde el programa" })}
                                >
                                    <option value="">Seleccionar</option>
                                    {seccionesRegistradas.map((sec) => (
                                        <option key={sec.id} value={sec.id}>
                                            {sec.nombre}
                                        </option>
                                    ))}
                                </Select>

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

            <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}