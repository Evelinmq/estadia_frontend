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
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [alianza, setAlianza] = useState([]);
    const [AlianzaSeleccionado, setAlianzaSeleccionado] = useState(null);
    const [terminoBusqueda, setTerminoBusqueda] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange"
    });

    register("id");


    const handleOpenModal = (editMode = false) => {
        setIsEditing(editMode);
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
            const url = termino ? `/api/Alianza/busquedaAlianza?nombre=${encodeURIComponent(termino)}`
            : "/api/Alianza";
            const data = await obtenerDatos(url);
            setAlianza(data || []);
        } catch (error) {
            console.error('Error al cargar alianzas:', error);
       }
    };

    
           
             useEffect(() => {
               cargarAlianzas();
             }, []);

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





        const onSubmit = async (data) => {
           try {
            data.nombre = data.nombre?.trim();

            const datosEnviar = {
            nombre: data.nombre,
            imagen: previewImage ||null
        };

            if (isEditing && AlianzaSeleccionado) {
                
                const alianzaId = data.id || (AlianzaSeleccionado && AlianzaSeleccionado.id);

                if (!alianzaId) {
                alertaError("El afiliado no contiene un ID válido.");
                return;
            }
            
           
            await actualizarDatos(`/api/Alianza/${alianzaId}`, datosEnviar);
            alertaExito("Alianza actualizad correctamente");
        }else{
            await enviarDatos('/api/Alianza', datosEnviar);
            alertaExito("Alianza guardada correctamente")
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

    if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64 = reader.result.split(",")[1];
            setPreviewImage(base64);
        };

        reader.readAsDataURL(file);
    }
};
     const eliminarAlianza = async (id) => {
        
             
            if (!id) {
            console.error("No se puede eliminar sin un ID válido");
            return;
           }
        
                const confirmar = await confirmarEliminar("¿Deseas eliminar la alianza?");
                if (confirmar) {
                    try {
                       console.log("Eliminando beneficiario");
               await eliminarDatos(`/api/Alianza/${id}`);
               await cargarAlianzas();
        
                alertaExito("Alianza eliminado correctamente");
                
            } catch (error) {
                console.error("Error en eliminar beneficiario:", error);
            }
        }
        }

    return (
        <div style={{ padding: "24px" }}>
            <Header seccion="alianzas" onAdd={() => handleOpenModal(false)}
                onSearch={(valor) => {
                setTerminoBusqueda(valor) }} />

            {/*tarjetas de Aliados */}
            <div className="grid-alianzas" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '25px',
                marginTop: '30px'
            }}>
                {alianza.map((aliado) => (
                    <ImageCard
                        key={aliado.id}
                        titulo={aliado.name}
                        imagen={aliado.image ? `data:image/jpeg;base64,${aliado.image}` : null}
                        onEdit={() => handleEditar(aliado)}
                        onDelete={() => eliminarAlianza(aliado.id)}
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
                totalPages={3}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}