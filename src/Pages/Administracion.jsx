import { useState } from "react";
import DataTable from "../Components/Admin/Datatable.jsx";
import {Header} from "../Components/Structure/Header.jsx";
import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import Input from "../Components/Inputs/Input.jsx";
import { alertaCamposVacios, alertaError, alertaExito, confirmarEliminar } from "../Utils/alerts.js";
import { obtenerDatos, actualizarDatos, eliminarDatos, enviarDatos } from "../Utils/api.js";


function InputField( {label, type = "text", placeholder, value, onChange, ...props}) {
    const [visible, setVisible] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (visible ? "text" : "password") : type;
    

    return (
        <div className="lf-field">
            <label className="lf-label">{label}</label>
            <div className="lf-input-wrap">
                <input
                    className="lf-input"
                    type={inputType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    {...props}
                    autoComplete={isPassword ? "current-password" : "email"}
                />
                {isPassword && (
                    <button
                        type="button"
                        className="lf-eye"
                        onClick={() => setVisible((v) => !v)}
                        aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {visible ? (
                            /* ojo tachado */
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                                <line x1="1" y1="1" x2="23" y2="23"/>
                            </svg>
                        ) : (
                            /* ojo abierto */
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}


const columns = [
    { key: "nombre", label: "Nombre completo" },
    { key: "correo", label: "Correo electrónico" },
];

const datosIniciales = [
    { nombre: "Nombres ApellidoPaterno ApellidoMaterno", correo: "correo@dominio.com" },
];

export default function Administracion() {

     const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [admins, setAdmins] = useState([]);
    const [password, setPassword] = useState("");
    const [confirPasswrod, setConfirPassword] = useState("");
    const [AdministradorSeleccionado, setAdministradorSeleccionado] = useState(null);

    const [terminoBusqueda, setTerminoBusqueda] = useState("");



useEffect(() => {
  cargarAdministradores(); 
}, []);


useEffect(() => {
  const delayDebounceFn = setTimeout(() => {
    cargarAdministradores(terminoBusqueda);
  }, 500);
  return () => clearTimeout(delayDebounceFn);
}, [terminoBusqueda]);

    const handleEdit = (row, index) => {
        console.log("Editar", row, index);
        handleEditar(row);
    };

    const handleDelete = (row, index) => {
        setAdmins(admins.filter((_, i) => i !== index));
    };


     const {
            register,
            handleSubmit,
            reset,
            watch,
            formState: { errors },
        } = useForm({
            mode: "onChange"
        });
        const passwordValue = watch("contrasena");


        const handleEditar = (user) => {
        reset({
            id: user.id,
            nombre: user.nombre,
            apellidoP: user.apellidoP || "",
            apellidoM: user.apellidoM || "",
            correo: user.correo,
            contrasena: ""
            
        });
        setAdministradorSeleccionado(user)
        setIsEditing(true);
    
        setShowModal(true);
    
    };
            // Funciones de Modal
           const handleOpenModal = (editMode = false, user = null) => {
            setIsEditing(editMode);
            if (editMode && user) {
                setAdministradorSeleccionado(user);
                reset({
                    nombre: user.nombre,
                    apellidoP: user.apellidoP || "",
                    apellidoM: user.apellidoM || "",
                    correo: user.correo,
                    password: "", 
                    confirmarPassword: ""
                });
            } else {
                setAdministradorSeleccionado(null);
                reset({
                    nombre: "",
            apellidoP: "",
            apellidoM: "",
            correo: "",
            password: "",
            confirmarPassword: ""
        });
    }
    
    setShowModal(true);
};
        
            const handleCloseModal = () => {
                setShowModal(false);
                reset();
            };

        
const cargarAdministradores = async (termino = "") => {
  try {
     
    const url = termino 
      ? `/api/admin/buscar?nombre=${encodeURIComponent(termino)}` 
      : '/api/admin';
      
    const data = await obtenerDatos(url);

    
    setAdmins(data || []);
  } catch (error) {
    console.error('Error al cargar Administradores:', error);
  }
};
               
                 // SUBMIT PARA AGREGAR Y ENVIAR A BACKEND
               const onSubmit = async (data) => {
        try {
            data.nombre = data.nombre?.trim();

            if (isEditing && AdministradorSeleccionado) {
                await actualizarDatos(`/api/admin/${AdministradorSeleccionado.id}`, data);
                alertaExito("Administrdor actualizado correctamente");
            } else {
                await enviarDatos('/api/admin', data);
                alertaExito("Administrador guardado correctamente");
            }

            cargarAdministradores();
            setShowModal(false);
            reset();
        } catch (error) {
            alertaError("Error al procesar la solicitud");
            console.error("Error:", error);
        }
    };

            
            const onError = () => {
                if (Object.keys(errors).length > 0) {
                    alertaCamposVacios();
                }
            };
        
        const eliminarAdministrador = async (id) => {
                
        const confirmar = await confirmarEliminar("¿Eliminar Administrador?");
        if (confirmar) {
            try {
                await eliminarDatos(`/api/admin/${id}`);
                alertaExito("Administrador eliminado correctamente");
                cargarAdministradores();
               
            } catch (error) {
                alertaError("No se pudo eliminar el Administrador");
            }
        }
    };
            

    return (
        <div style={{ padding: "24px" }}>

        <div style={{ padding: "24px" }}>
            <Header seccion="administracion" onAdd={() => handleOpenModal(false)}
                onSearch={(valor) => {
                setTerminoBusqueda(valor) }}/>
            <DataTable
                columns={columns}
                rows={admins}
                onEdit={handleEdit}
                onDelete={(row) => eliminarAdministrador(row.id)}
            />
        </div>
        
        {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container-custom">
                        <h2 className="modal-title">
                            {isEditing ? "Editar Administrador" : "Agregar Administrador"}
                        </h2>

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
                                                               {...register("nombre", {
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
                                                           </div>

                                                           <div className="column">
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

                                                                <div className="form-group" style={{ width: '100%' }}>
                                                               <InputField
                                                                label="Contraseña:"
                                                                type="password"
                                                                placeholder="Contraseña"
                                                                
                                                                error={errors.password}
                                                                {...register("contrasena", {
                                                                    required: isEditing ? false : "La contraseña es obligatoria",
                                                                    minLength: {
                                                                        value: 6,
                                                                         message: "La contraseña debe tener al menos 6 caracteres"
                                                                        }
                                                                    })}/>
                                                                    {errors.password && (
                                                                        <span className="error" style={{ color: '#ef4444', fontSize: '12px' }}>
                                                                            {errors.password.message}
                                                                            </span>
                                                                        )}
                                                                
                                                                </div>

                                                                <div className="form-group" style={{ width: '100%' }}>
                                                                    <InputField
                                                                    label="Confirmar contraseña:"
                                                                    type="password"
                                                                    placeholder="Repite tu contraseña"
                                                                    error={errors.confirmarPassword}
                                                                    {...register("confirmarPassword", {
                                                                        required: "Confirmar la contraseña es obligatorio",
                                                                        validate: (value) => 
                                                                            value === passwordValue || "Las contraseñas no coinciden"})} />
                                                                            {errors.confirmarPassword && (
                                                                                <span className="error" style={{ color: '#ef4444', fontSize: '12px' }}>
                                                                                    {errors.confirmarPassword.message}
                                                                                    </span>
                                                                                )}
                                                                                </div>


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