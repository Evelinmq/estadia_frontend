import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Pagination from "../Components/Structure/Pagination.jsx";
import { Header } from "../Components/Structure/Header.jsx";
import SectionCard from "../Components/Admin/SectionCard.jsx";
import { alertaExito, alertaCamposVacios, confirmarEliminar, alertaError } from "../Utils/alerts";
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
                                <div className="form-group" style={{ width: '100%' }}>
                                    <label className="label">Sección:</label>
                                    <input
                                        type="text"
                                        placeholder="Nombre de la sección"
                                        className="modal-input"
                                        style={{ borderColor: errors.nombre ? '#ef4444' : '#d1d5db' }}
                                        {...register("nombre", {
                                            required: "Este campo es obligatorio",
                                            pattern: {
                                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                                message: "Solo se permiten letras"
                                            },
                                            validate: (val) =>
                                                val.trim() === val || "No se permiten espacios al inicio o final"
                                        })}
                                    />
                                    {errors.nombre && <span className="error">{errors.nombre.message}</span>}
                                </div>

                                {/* AREA DESCRIPCIÓN */}
                                <div className="form-group" style={{ width: '100%' }}>
                                    <label className="label">Descripción:</label>
                                    <textarea
                                        placeholder="Descripción"
                                        className="modal-input"
                                        style={{
                                            height: '100px',
                                            paddingTop: '12px',
                                            resize: 'none',
                                            borderColor: errors.descripcion ? '#ef4444' : '#d1d5db'
                                        }}
                                        {...register("descripcion", {
                                            required: "La descripción es obligatoria",
                                            validate: (val) => val.trim() === val || "Sin espacios al inicio o final"
                                        })}
                                    />
                                    {errors.descripcion && <span className="error">{errors.descripcion.message}</span>}
                                </div>

                                {/* IMAGEN (Estructura idéntica a Programas) */}
                                <div className="form-group" style={{ width: '100%' }}>
                                    <label className="label">Imagen:</label>
                                    <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
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
                                        id="file-upload"
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

            <Pagination currentPage={currentPage} totalPages={3} onPageChange={setCurrentPage} />
        </div>
    );
}