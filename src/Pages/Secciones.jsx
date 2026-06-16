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

import { obtenerDatos, eliminarDatos } from "../Utils/api.js";

const BASE_URL = "http://localhost:8080";

const MIMES_PERMITIDOS = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/svg+xml',
];

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function Secciones() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_POR_PAGINA = 8;
    const [showModal, setShowModal] = useState(false);
    const [secciones, setSecciones] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [archivo, setArchivo] = useState(null);
    const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageVersion, setImageVersion] = useState(Date.now());

    const isEditing = !!seccionSeleccionada;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    //Cargar secciones
    const cargarSecciones = async () => {
        try {
            setLoading(true);
            const data = await obtenerDatos('/api/section');

            if (Array.isArray(data)) {
                const paginas = Math.ceil(data.length / ITEMS_POR_PAGINA);
                setTotalPages(paginas === 0 ? 1 : paginas);
                setSecciones(data);
            } else {
                setSecciones([]);
            }

            setImageVersion(Date.now());
        } catch (error) {
            alertaError("Ocurrió un error al cargar las secciones");
            console.error('Error al cargar las Secciones: ', error);
            setSecciones([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                await cargarSecciones();
            } catch (error) {
                alertaError("Ocurrió un error al cargar las secciones");
                console.error("Error al cargar secciones:", error);
            }
        };

        obtenerDatos();
    }, []);

    // Abrir modal
    const handleOpenModal = (sec = null) => {
        setSeccionSeleccionada(sec);
        setArchivo(null);

        if (sec) {
            reset({ nombre: sec.name || "", descripcion: sec.description || "" });
            setPreviewImage(`${BASE_URL}/api/section/imagen/${sec.id}`);
        } else {
            reset({ nombre: "", descripcion: "" });
            setPreviewImage(null);
        }
        setShowModal(true);
    };

    // Cambio de imagen
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!MIMES_PERMITIDOS.includes(file.type)) {
            alertaError("Solo se permiten archivos JPEG, PNG o SVG");
            e.target.value = "";
            return;
        }

        if (file.size > MAX_SIZE_BYTES) {
            alertaError(`El archivo no debe exceder los ${MAX_SIZE_MB}MB`);
            e.target.value = "";
            return;
        }

        setArchivo(file);
        setPreviewImage(URL.createObjectURL(file));
    };

    // Submit (POST/PUT)
    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const headers = {};

            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            if (!isEditing && !archivo) {
                alertaError("La imagen es obligatoria para crear una sección");
                return;
            }

            const formData = new FormData();
            formData.append("name", data.nombre.trim());
            formData.append("description", data.descripcion.trim());
            if (archivo) {
                formData.append("archivo", archivo);
            }

            let url;
            let metodo;

            if (isEditing) {
                url = `${BASE_URL}/api/section/update/${seccionSeleccionada.id}`;
                metodo = "POST";
            } else {
                url = `${BASE_URL}/api/section`;
                metodo = "POST";
            }

            const respuesta = await fetch(url, {
                method: metodo,
                headers: headers,
                body: formData,
                credentials: 'include',
            });

            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }

            alertaExito(isEditing ? "Sección actualizada correctamente" : "Sección creada correctamente");
            await cargarSecciones();
            handleCloseModal();
        } catch (error) {
            alertaError("Error al procesar la solicitud");
            console.error(error);
        }
    };

    // Delete
    const eliminar = async (id) => {
        const confirmar = await confirmarEliminar("¿Eliminar esta sección?");
        if (confirmar) {
            try {

                await eliminarDatos(`/api/section/${id}`);
                await cargarSecciones();
                alertaExito("Sección eliminada correctamente");


            } catch (error) {
                alertaError(error.message || "No se pudo eliminar la sección");
                console.error("Error al eliminar la sección: ", error);
            }
        }
    };

    // cerrar modal
    const handleCloseModal = () => {
        setShowModal(false);
        setPreviewImage(null);
        setSeccionSeleccionada(null);
        setArchivo(null);
        reset();
    };

    const onError = () => {
        if (Object.keys(errors).length > 0) {
            alertaCamposVacios();
        }
    };

    //  URL de imagen para cada card
    const getImagenUrl = (id) => `${BASE_URL}/api/section/imagen/${id}?v=${imageVersion}`;

    // Lógica para el buscador
    const handleSearch = async (busqueda) => {
        try {
            setLoading(true);
            const data = await obtenerDatos(`/api/section/byName?name=${encodeURIComponent(busqueda)}`);
            setSecciones(data);
            setImageVersion(Date.now());
        } catch (error) {
            alertaError("Ocurrió un error al buscar las secciones");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="secciones" onAdd={() => handleOpenModal(null)} onSearch={handleSearch} />

            <div
                className="grid-secciones"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginTop: '30px',
                }}
            >
                {secciones.length > 0 ? (
                    secciones
                        .slice((currentPage - 1) * ITEMS_POR_PAGINA, currentPage * ITEMS_POR_PAGINA)
                        .map((sec) => (
                        <SectionCard
                            key={sec.id}
                            titulo={sec.name}
                            descripcion={sec.description}
                            imagen={getImagenUrl(sec.id)}
                            onEdit={() => handleOpenModal(sec)}
                            onDelete={() => eliminar(sec.id)}
                        />
                    ))
                ) : (
                    <p>No se encontraron secciones registradas.</p>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container-custom">
                        <h2 className="modal-title">
                            {isEditing ? "Editar Sección" : "Agregar Sección"}
                        </h2>

                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <div className="modal-center">

                                <Input
                                    label="Sección:"
                                    type="text"
                                    placeholder="Nombre de la sección"
                                    error={errors.nombre}
                                    {...register("nombre", {
                                        required: "El nombre de la sección es obligatorio",
                                        validate: (val) =>
                                            val.trim() === val || "No se permiten espacios al inicio o final",
                                    })}
                                />

                                <TextArea
                                    label="Descripción:"
                                    placeholder="Descripción"
                                    error={errors.descripcion}
                                    style={{ minHeight: '100px' }}
                                    {...register("descripcion", {
                                        required: "La descripción es obligatoria",
                                        validate: (val) =>
                                            val.trim() === val || "Sin espacios al inicio o final",
                                    })}
                                />

                                <FileInput
                                    label="Imagen:"
                                    previewImage={previewImage}
                                    error={errors.imagen}
                                    accept={MIMES_PERMITIDOS.join(',')}
                                    {...register("imagen", {
                                        required: !isEditing
                                            ? "La imagen es obligatoria"
                                            : false,
                                    })}
                                    onChange={handleImageChange}
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
                totalPages={totalPages}
                onPageChange={setCurrentPage} />
        </div>
    );
}