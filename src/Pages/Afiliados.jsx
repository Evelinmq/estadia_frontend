import {Header} from "../Components/Structure/Header.jsx";
import AfiliadoCard from "../Components/Admin/AfiliadoCard.jsx";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Pagination from "../Components/Structure/Pagination.jsx";
import { alertaExito, alertaCamposVacios, alertaError, confirmarEliminar} from "../Utils/alerts";
import "./ModalGlobal.css";
import Input from "../Components/Inputs/Input.jsx";
import { obtenerDatos, actualizarDatos, eliminarDatos } from "../Utils/api.js";
import Select from "../Components/Inputs/Select.jsx";

export default function Afiliados() {

   
       const [currentPage, setCurrentPage] = useState(1);
       const [showModal, setShowModal] = useState(false);
       const [afiliados, setAfiliados] = useState([]);
       const [previewImage, setPreviewImage] = useState(null);
       const [AfiliadoSeleccionado, setAfiliadoSeleccionado] = useState(null);

       const isEditing = !!AfiliadoSeleccionado;
       
           const {
               register,
               handleSubmit,
               reset,
               watch,
               setValue,
               formState: { errors },
           } = useForm({
               mode: "onChange"
           });

           register("id");
       
       
           const onError = () => {
               if (Object.keys(errors).length > 0) {
                   alertaCamposVacios();
               }
           };

          

           const handleEditar = (user) => {
            
    setAfiliadoSeleccionado(user);
    const idCorrecto = user.id;

    reset({
        id: idCorrecto,
        nombres: user.nombre || "",
        apellidoP: user.apellidoP || "",
        apellidoM: user.apellidoM || "",
        genero: user.genero || "",
        edad: user.edad || "",
        telefono: user.telefono || "",
        fotografia: null
    });

    const fotoExistente = user.foto
        ? `data:image/jpeg;base64,${user.foto}`
        : null;

    setPreviewImage(fotoExistente);

    setShowModal(true);
    
};

        const cargarAfiliados = async () => {
           try {
             const data = await obtenerDatos('/api/afiliados');
             setAfiliados(data);
           }catch (error) {
             console.error('Error al cargar Afiliados:', error);
           }
         };
       
         useEffect(() => {
           cargarAfiliados();
         }, []);
       
         // SUBMIT PARA AGREGAR Y ENVIAR A BACKEND
       const onSubmit = async (data) => {
           try {
            if (data.nombres) data.nombres = data.nombres.trim()

            if (isEditing) {
                
                const afiliadoId = data.id || (AfiliadoSeleccionado && AfiliadoSeleccionado.id);

                if (!afiliadoId) {
                alertaError("El afiliado no contiene un ID válido.");
                return;
            }
            
            const datosEnviar = {
                nombre: data.nombres, 
                apellidoP: data.apellidoP,
                apellidoM: data.apellidoM,
                genero: data.genero,   
                edad: parseInt(data.edad, 10),
                telefono: data.telefono,
                foto: previewImage ? (previewImage.includes(",") ? previewImage.split(",")[1] : previewImage) : null
            };

           
            await actualizarDatos(`/api/afiliados/${afiliadoId}`, datosEnviar);
            alertaExito("Afiliado actualizado correctamente");
        }
             await cargarAfiliados();
             handleCloseModal();
           } catch (error) {
             alertaError("Error al procesar la solicitud");
            
           }
         };
   
   
       const handleImageChange = (e) => {
           const file = e.target.files[0];
           if (file) {
               const reader = new FileReader();
               reader.onloadend = () => {
                   setPreviewImage(reader.result); 
               };
               reader.readAsDataURL(file);
           }
       };


     const eliminarAfiliados = async (id) => {

    const idLimpio = typeof id === 'object' ? (id.id || id.idUsuario) : id;

    if (!idLimpio) {
        console.error("No se puede eliminar sin un ID válido");
        return;
    }


        const confirmar = await confirmarEliminar("¿Eliminar al afiliado?");
        if (confirmar) {
            try {
               console.log("Eliminando afiliado");
       await eliminarDatos(`/api/afiliados/${idLimpio}`);
       await cargarAfiliados();

        alertaExito("Afiliado eliminado correctamente");
        
    } catch (error) {
        console.error("Error en eliminarAfiliados:", error);
    }
}
}
 

       
           const handleCloseModal = () => {
               setShowModal(false);
               setPreviewImage(null);
               setAfiliadoSeleccionado(null);
               reset();
           };
       
           return (
   
               <div style={{ padding: "24px" }}>
                   <Header seccion="Afiliados" />
       
                   <div className="grid-secciones" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
            
             {afiliados.length > 0 ? (
                    afiliados.map((b) => (
                        
                        <AfiliadoCard
                            key={b.id} 
                            nombre={b.nombres || b.nombre}
                            apellidoP={b.apellidoP}
                            apellidoM={b.apellidoM}
                            genero={b.genero}
                            edad={b.edad}
                            telefono={b.telefono}
                            imagen={b.foto ? `data:image/jpeg;base64,${b.foto}` : null}
                            onEdit={() => handleEditar(b)}
                            onDelete={() => eliminarAfiliados(b.id)}
                        />
                    ))
                ) : (
                    <p>No se encontraron afiliados registrados.</p>
                )}
            
   
                   </div>
       
                   {showModal && (
                       <div className="modal-overlay">
                           <div className="modal-container-custom">
                               <h2 className="modal-title">{"Editar Afiliado"}</h2>
       
                               <form onSubmit={handleSubmit(onSubmit, onError)}>
                                   <div className="modal-grid-columns">
                                       {/* INPUT SECCIÓN */}
                                       <div className="column">
                                       <div className="form-group" style={{ width: '100%' }}>
                                           <Input
                                           label="Nombre/s"
                                           TYPE="text"
                                           PLACEHOLDER="Nombre completo"
                                           error={errors.nombres}
                                           {...register("nombres", {
                                               required: "El nombre es obligatorio",
                                               pattern: {
                                                   value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                                   message: "Solo se permiten letras"
                                               },
                                               validate: (val) => val.trim() === val || "Sin espacios al inicio o final"
                                           })}
                                           />
                                       </div>
       
                                       <div className="form-group" style={{ width: '100%' }}>
                                          <Input
                                           label="Apellido Paterno"
                                           TYPE="text"
                                           PLACEHOLDER="Apellido paterno"
                                           error={errors.apellidoP}
                                           {...register("apellidoP", {
                                               required: "El apellido paterno es obligatorio",
                                               pattern: {
                                                   value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                                   message: "Solo se permiten letras"
                                               }
                                           })}
                                           />
                                       </div>
   
                                        <div className="form-group" style={{ width: '100%' }}>
                                          <Input
                                           label="Apellido Materno"
                                           TYPE="text"
                                           PLACEHOLDER="Apellido materno"
                                           error={errors.apellidoM}
                                           {...register("apellidoM", {
                                               required: "El apellido materno es obligatorio",
                                               pattern: {
                                                   value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                                   message: "Solo se permiten letras"
                                               }
                                           })}
                                           />
                                       </div>
   
                                        <div className="form-group" style={{ width: '100%' }}>
                                          <Select
                                          label="Genero"
                                          error={errors.genero}
                                           {...register("genero", { required: "El genero es obligatorio" })}>
                                            <option value="">Selecciona una opción</option>
                                            <option value={0}>Hombre</option>
                                             <option value={1}>Mujer</option>
                                              <option value={2}>No binario</option>
                                               <option value={3}>Otro</option>
                                                </Select>
                                       </div>

                                       </div>

                                       <div className="column">
   
                                        <div className="form-group" style={{ width: '100%' }}>
                                          <Input
                                           label="Edad"
                                           TYPE="number"
                                           PLACEHOLDER="Edad"
                                           error={errors.edad}
                                           {...register("edad", {
                                               required: "La edad es obligatoria",
                                               pattern: {
                                                   value: /^[0-9]+$/,
                                                   message: "Solo se permiten números"
                                               }
                                           })}
                                           />
                                       </div>
   
                                        <div className="form-group" style={{ width: '100%' }}>
                                          <Input
                                           label="Teléfono"
                                           TYPE="tel"
                                           PLACEHOLDER="Teléfono"
                                           error={errors.telefono}
                                           {...register("telefono", {
                                               required: "El teléfono es obligatorio",
                                               pattern: {
                                                   value: /^[0-9]+$/,
                                                   message: "Solo se permiten números y sin espacios"
                                               }
                                           })}
                                           />
                                       </div>
   
   
                                       {/* IMAGEN */}
                                       <div className="form-group" style={{ width: '100%' }}>
                                           <label className="label">Imagen:</label>
                                           <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                                               <div className="modal-input" style={{
                                                   display: 'flex',
                                                   flexDirection: 'column',
                                                   alignItems: 'center',
                                                   justifyContent: 'center',
                                                   height: '100px',
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
                                                       <span style={{ color: '#878787' }}>+ Añadir imagen</span>
                                                   )}
                                               </div>
                                           </label>
                                           <input
                                               id="file-upload"
                                               type="file"
                                               accept="image/*"
                                               style={{ display: 'none' }}
                                               {...register("imagen", { 
                                                   required: previewImage ? false : "La imagen es obligatoria",
                                                   onChange: handleImageChange 
                                               })}
                                           />
                                           {errors.imagen && <span className="error">La imagen es obligatoria</span>}
       
                                           {previewImage && (
                                               <p style={{ fontSize: '12px', color: '#8E0073', marginTop: '8px', cursor: 'pointer' }}
                                                  onClick={() => {setPreviewImage(null);
                                                   setValue("imagen", null);
                                                  }}>
                                                   Cambiar imagen
                                               </p>
                                           )}
                                       </div>
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
                     