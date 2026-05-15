import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../Components/Structure/Header.jsx";
import ImageCard from "../Components/Admin/ImageCard.jsx";
import Pagination from "../Components/Structure/Pagination.jsx";
import { alertaExito, alertaCamposVacios, confirmarEliminar, alertaError } from "../Utils/alerts";
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
                                <div className="form-group" style={{ width: '100%' }}>
                                    <label className="label">Sección:</label>
                                    <select
                                        className="modal-select"
                                        style={{ borderColor: errors.seccionId ? '#ef4444' : '#d1d5db' }}
                                        {...register("seccionId", { required: "Debes seleccionar una sección" })}
                                    >
                                        <option value="">Seleccionar</option>
                                        {seccionesRegistradas.map((sec) => (
                                            <option key={sec.id} value={sec.id}>
                                                {sec.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.seccionId && <span className="error">{errors.seccionId.message}</span>}
                                </div>

                                {/* INPUT DE IMAGEN (VISTA PREVIA) */}
                                <div className="form-group" style={{ width: '100%' }}>
                                    <label className="label">Imagen:</label>
                                    <label htmlFor="file-upload-prog" style={{ cursor: 'pointer' }}>
                                        <div className="modal-input" style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '180px',
                                            borderStyle: previewImage ? 'solid' : 'dashed',
                                            borderColor: errors.imagen ? '#ef4444' : '#d1d5db',
                                            overflow: 'hidden',
                                            padding: '0'
                                        }}>
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Vista previa"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div style={{ textAlign: 'center', color: '#878787' }}>
                                                    <span style={{ fontSize: '24px' }}>+</span>
                                                    <p>Añadir Imagen</p>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                    <input
                                        id="file-upload-prog"
                                        type="file"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        {...register("imagen", { required: !isEditing })}
                                    />
                                    {errors.imagen && <span className="error">La imagen es obligatoria</span>}
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

            <Pagination
                currentPage={currentPage}
                totalPages={3}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}