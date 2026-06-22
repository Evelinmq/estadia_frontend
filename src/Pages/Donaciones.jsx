import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { alertaExito, alertaCamposVacios, confirmarEliminar, alertaError } from "../Utils/alerts";
import Select from "../Components/Inputs/Select.jsx";
import Input from "../Components/Inputs/Input.jsx";
import "./ModalGlobal.css";
import FileInput from "../Components/Inputs/FileInput.jsx";
import {AmountButton} from "../Components/Buttons/AmountButton.jsx";

export default function Donaciones () {

    const [monto, setMonto] = useState(null);
    const [montoError, setMontoError] = useState("");
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({mode: "onChange"});

    const onSubmit = async (data) => {

        if (!monto || monto <= 0) {
            setMontoError("Debes seleccionar un monto");
            return;
        }


        try {


            let url;
            let metodo;

            url = `${BASE_URL}/api/donacion`;
            metodo = "POST";

            const respuesta = await fetch(url, {
                method: metodo,
                body: formData,
                credentials: 'include',
            });

            if (!respuesta.ok) {
                throw new Error(`Error en el servidor: ${respuesta.status}`);
            }

            alertaExito("Donación exitosa");
        } catch (error) {
            alertaError("Lo sentimos, ocurrió un error al procesar la solicitud");
            console.error(error);
        }
    };

    return (
        <div className="donaciones-page">
            <div className="registro-card-view">
            <div>
                <h1 className="donaciones-title">Donar</h1>
                <h2 className="donaciones-welcome">¡Con tu apoyo, ayudas a que nuestros programas lleguen más lejos!</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-container">

                        <div className="column">

                            <div className="form-group" style={{width: '100%'}}>
                                <AmountButton onChange={(val) => {
                                    setMonto(val);
                                    setMontoError("");
                                }} />

                                {montoError && (
                                    <p className="error-message">{montoError}</p>
                                )}
                            </div>


                            <div className="form-group" style={{width: '100%'}}>
                                <Input
                                    label="Nombre/s"
                                    TYPE="text"
                                    PLACEHOLDER="Nombre completo"
                                    error={errors.nombre}
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

                            <div className="form-group" style={{ width: '100%' }}>
                                <Input
                                    label="Correo"
                                    TYPE="text"
                                    PLACEHOLDER="Correo"
                                    error={errors.correo}
                                    {...register("correo", {
                                        required: "El correo es obligatorio",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Formato de correo inválido"},
                                    })}/>
                            </div>

                            <div className="form-group">
                                <label className="privacy-check">
                                    <input
                                        type="checkbox"
                                        {...register("privacidad", {
                                            required: "Debes aceptar el aviso de privacidad"
                                        })}
                                    />

                                    Estoy de acuerdo con el <a className="link" href="https://www.paypal.com/mx/legalhub/paypal/privacy-full">Aviso de privacidad de Paypal</a>
                                </label>

                                {errors.privacidad && (
                                    <p className="error-message">
                                        {errors.privacidad.message}
                                    </p>
                                )}
                            </div>

                                <div className="form-actions-card">
                                    <button type="button" className="btn-cancelar"  onClick={()=> navigate("/pantalla-principal")}>
                                        Cancelar
                                    </button>
                                    <button type="submit" className="btn-guardar">
                                        Donar
                                    </button>
                                </div>


                        </div>
                </div>

            </form>
            </div>
        </div>
    )
}