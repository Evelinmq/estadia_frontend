import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Header } from "../Components/Structure/Header.jsx";
import ImageCard from "../Components/Admin/ImageCard.jsx";
import Pagination from "../Components/Structure/Pagination.jsx";
import { alertaExito, alertaCamposVacios, confirmarEliminar, alertaError } from "../Utils/alerts.js";
import Input from "../Components/Inputs/Input.jsx";
import FileInput from "../Components/Inputs/FileInput.jsx";
import "./ModalGlobal.css";
import { obtenerDatos, eliminarDatos, actualizarDatos, enviarDatos } from "../Utils/api.js";

export default function Alianzas() {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const ITEMS_POR_PAGINA = 10;
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [alianza, setAlianza] = useState([]);
    const [AlianzaSeleccionado, setAlianzaSeleccionado] = useState(null);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");
    const [loading, setLoading] = useState(true); // Control de carga añadido

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onChange"
    });

    const MIMES_PERMITIDOS = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/svg+xml',
    ];

    const MAX_SIZE_MB = 50;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    register("id");

    const handleOpenModal = (editMode = false) => {
        setIsEditing(editMode);

        if (!editMode) {
            setAlianzaSeleccionado(null);
            setPreviewImage(null);
            reset({
                id: "",
                nombre: "",
                imagen: null
            });
        }

        setShowModal(true);
    };

    const handleEditar = (user) => {
        setIsEditing(true);
        setAlianzaSeleccionado(user);

        reset({
            id: user.id,
            nombre: user.name || "",
            imagen: null
        });
        setPreviewImage(user.image || null);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPreviewImage(null);
        reset();
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            cargarAlianzas(terminoBusqueda);
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [terminoBusqueda]);

    const cargarAlianzas = async (termino = "") => {
        try {
            setLoading(true); // Activa la carga antes del fetch
            const url = termino ? `/api/Alianza/busquedaAlianza?nombre=${encodeURIComponent(termino)}` : "/api/Alianza";
            const data = await obtenerDatos(url);

            if (Array.isArray(data)) {
                setAlianza(data);
                const paginas = Math.ceil(data.length / ITEMS_POR_PAGINA);
                setTotalPages(paginas === 0 ? 1 : paginas);
            } else {
                setAlianza([]);
                setTotalPages(1);
            }
            if (termino) setCurrentPage(1); // Resetea página al buscar
        } catch (error) {
            console.error('Error al cargar alianzas:', error);
            setAlianza([]);
            setTotalPages(1);
        } finally {
            setLoading(false); // Detiene la carga pase lo que pase
        }
    };

    useEffect(() => {
        cargarAlianzas();
    }, []);

    const onSubmit = async (data) => {
        try {
            data.nombre = data.nombre?.trim();

            const datosEnviar = {
                nombre: data.nombre,
                imagen: previewImage || null
            };

            if (isEditing && AlianzaSeleccionado) {
                const alianzaId = data.id || (AlianzaSeleccionado && AlianzaSeleccionado.id);

                if (!alianzaId) {
                    alertaError("El afiliado no contiene un ID válido.");
                    return;
                }

                await actualizarDatos(`/api/Alianza/${alianzaId}`, datosEnviar);
                alertaExito("Alianza actualizada correctamente");
            } else {
                await enviarDatos('/api/Alianza', datosEnviar);
                alertaExito("Alianza guardada correctamente");
            }
            await cargarAlianzas();
            handleCloseModal();
        } catch (error) {
            alertaError("Error al procesar la solicitud");
        }
    };

    const onError = () => {
        if (Object.keys(errors).length > 0) {
            alertaCamposVacios();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!MIMES_PERMITIDOS.includes(file.type)) {
            alertaError("Solo se permiten archivos JPEG, PNG o SVG");
            e.target.value = "";
            setValue("imagen", null);
            return;
        }

        if (file.size > MAX_SIZE_BYTES) {
            alertaError(`El archivo no debe exceder los ${MAX_SIZE_MB}MB`);
            e.target.value = "";
            setValue("imagen", null);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.split(",")[1];
            setPreviewImage(base64);
        };
        reader.readAsDataURL(file);
    };

    const eliminarAlianza = async (id) => {
        if (!id) {
            console.error("No se puede eliminar sin un ID válido");
            return;
        }

        const confirmar = await confirmarEliminar("¿Deseas eliminar la alianza?");
        
        if (confirmar) {
            try {
                await eliminarDatos(`/api/Alianza/${id}`);

                if (currentPage > 1 && alianza.length % ITEMS_POR_PAGINA === 1) {
                    setCurrentPage(prev => prev - 1);
                }

                await cargarAlianzas();
                alertaExito("Alianza eliminada correctamente");
            } catch (error) {
                console.error("Error en eliminar alianza:", error);
            }
        }
    };

    return (
        <div style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            minHeight: "calc(100vh - 48px)",
            justifyContent: "space-between"
        }}>
            {/* Contenedor Superior Estructural */}
            <div style={{ width: "100%" }}>
                <Header seccion="alianzas" onAdd={() => handleOpenModal(false)}
                        onSearch={(valor) => { setTerminoBusqueda(valor) }} />

                {/* Renderizado Condicional Controlado */}
                {loading ? (
                    <div style={{ textAlign: "center", marginTop: "50px", color: "#666" }}>
                        <p>Cargando alianzas...</p>
                    </div>
                ) : alianza.length > 0 ? (
                    <div
                        className="grid-secciones"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                            gap: '24px',
                            marginTop: '30px',
                            justifyContent: 'center',
                            justifyItems: 'center'
                        }}
                    >
                        {alianza
                            .slice((currentPage - 1) * ITEMS_POR_PAGINA, currentPage * ITEMS_POR_PAGINA)
                            .map((aliado) => (
                                <ImageCard
                                    key={aliado.id}
                                    titulo={aliado.name}
                                    imagen={aliado.image ? `data:image/jpeg;base64,${aliado.image}` : null}
                                    onEdit={() => handleEditar(aliado)}
                                    onDelete={() => eliminarAlianza(aliado.id)}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div style={{ textAlign: "center", marginTop: "80px", color: "#999", fontSize: "1.1rem" }}>
                        <p>No se encontraron alianzas registradas.</p>
                    </div>
                )}
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

                                <FileInput
                                    id="file-upload-aliado"
                                    label="Imagen:"
                                    previewImage={previewImage}
                                    error={errors.imagen}
                                    accept={MIMES_PERMITIDOS.join(',')}
                                    {...register("imagen", {
                                        required: !isEditing ? "La imagen es obligatoria" : false,
                                        onChange: (e) => handleFileChange(e)
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
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}