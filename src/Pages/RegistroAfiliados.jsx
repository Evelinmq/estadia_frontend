import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { alertaExito, alertaCamposVacios } from "../Utils/alerts.js";
import Input  from "../Components/Inputs/Input.jsx";
import "./ModalGlobal.css"; 
import { useNavigate } from 'react-router-dom';

export default function RegistroAfiliados() {

    const navigate = useNavigate();


    const [currentPage, setCurrentPage] = useState(1);
           const [showModal, setShowModal] = useState(false);
           const [afiliados, setAfiliados] = useState([]);
           const [previewImage, setPreviewImage] = useState(null)
           
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
           
               const onSubmit = (data) => {
                   alertaExito("Afiliado registrado con éxito");
                   handleCloseModal();
               };
           
               const onError = () => {
                   if (Object.keys(errors).length > 0) {
                       alertaCamposVacios();
                   }
               };
           
               const handleRegistrar = (user) => {
               reset({
                   id: user.id,
                   nombres: user.nombre,
                   apellidoP: user.apellidoP || "",
                   apellidoM: user.apellidoM || "",
                   genero: user.genero || "",
                   edad: user.edad || "",
                   telefono: user.telefono || "",
                   fotografia: null
               });
               if (user.fotografia) {
                   setPreviewImage(user.fotografia);
               }
               setShowModal(true);
           
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
           
              

    return (
        <div>
            <h1 className="subtitulo-pantalla">Registro de Afiliados</h1>
            <p style={{ textAlign: 'center', margin: '20px' }}>¡Bienvenido al registro de afiliados! Por favor, completa el siguiente formulario para unirte a nuestra comunidad y apoyar nuestra causa.</p>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <div className="form-container">
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
                                                      <Input
                                                       label="Genero"
                                                       TYPE="text"
                                                       PLACEHOLDER="Genero"
                                                       error={errors.genero}
                                                       {...register("genero", {
                                                           required: "El genero es obligatorio",
                                                           pattern: {
                                                               value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                                               message: "Solo se permiten letras"
                                                           }
                                                       })}
                                                       />
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
                                            </div>
                                                   
                                <div className="form-container">
                                    <div className="form-actions-card">
                                <button type="button" className="btn-cancelar" onClick={()=> navigate("/pantalla-principal")}>
                                    Cancelar
                                </button>
                                <button type="submit" className="btn-guardar">
                                    Guardar
                     </button>
                     </div>
            </div>
                                     
                                           
        </form>

     </div>
    );
}
                                 
