import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Pagination from "../Components/Structure/Pagination.jsx";
import { Header } from "../Components/Structure/Header.jsx";
import BeneficiarioCard from "../Components/Admin/BeneficiarioCard.jsx";
import { alertaExito, alertaCamposVacios } from "../Utils/alerts";
import "./ModalGlobal.css";
import Input from "../Components/Inputs/Input.jsx";

export default function Beneficiarios() {

    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [beneficiarios, setBeneficiarios] = useState([]);
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
            alertaExito("Beneficiario actualizado");
            handleCloseModal();
        };
    
        const onError = () => {
            if (Object.keys(errors).length > 0) {
                alertaCamposVacios();
            }
        };
    
        const handleEditar = (user) => {
        reset({
            id: user.id,
            nombres: user.nombre,
            apellidoP: user.apellidoP || "",
            apellidoM: user.apellidoM || "",
            genero: user.genero || "",
            edad: user.edad || "",
            telefono: user.telefono || "",
            municipio: user.municipio || "",
            colonia: user.colonia || "",
            correo: user.correo,
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
    
        const handleCloseModal = () => {
            setShowModal(false);
            setPreviewImage(null);
            reset();
        };
    
        return (

            <div style={{ padding: "24px" }}>
                <Header seccion="beneficiarios" />
    
                <div className="grid-secciones" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
            <BeneficiarioCard
                nombre="Juan"
                apellidoP="García"
                apellidoM="López"
                genero="Masculino"
                edad={22}
                telefono="777 123 4567"
                municipio="Temixco"
                colonia="Centro"
                correo="juan@mail.com"
                 onEdit={() => handleEditar({
                        id: 1,
                        nombre: "Juan",
                        apellidoP: "García",
                        apellidoM: "López",
                        genero: "Masculino",
                        edad: 22,
                        telefono: "777 123 4567",
                        municipio: "Temixco",
                        colonia: "Centro",
                        correo: "juan@mail.com"
                    })}
            />

                </div>
    
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-container-custom">
                            <h2 className="modal-title">{"Editar Beneficiario"}</h2>
    
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
                                                message: "Solo se permiten números y sin espacios"
                                            }
                                        })}
                                        />
                                    </div>

                                </div>

                                <div className="column">
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

                                     <div className="form-group" style={{ width: '100%' }}>
                                       <Input
                                        label="Municipio"
                                        TYPE="text"
                                        PLACEHOLDER="Municipio"
                                        error={errors.municipio}
                                        {...register("municipio", {
                                            required: "El municipio es obligatorio",
                                            pattern: {
                                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                                message: "Solo se permiten letras"
                                            }
                                        })}
                                        />
                                    </div>

                                     <div className="form-group" style={{ width: '100%' }}>
                                       <Input
                                        label="Colonia"
                                        TYPE="text"
                                        PLACEHOLDER="Colonia"
                                        error={errors.colonia}
                                        {...register("colonia", {
                                            required: "La colonia es obligatoria",
                                            pattern: {
                                                value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                                message: "Solo se permiten letras"
                                            }
                                        })}
                                        />
                                    </div>


                                     <div className="form-group" style={{ width: '100%' }}>
                                       <Input
                                        label="Correo electrónico"
                                        TYPE="text"
                                        PLACEHOLDER="Correo electrónico"
                                        error={errors.correo}
                                        {...register("correo", {
                                            required: "El correo electrónico es obligatorio",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Ingrese un correo electrónico válido"
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
                  
                    
    
    