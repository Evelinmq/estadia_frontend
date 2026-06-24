import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { alertaExito, alertaCamposVacios, confirmarEliminar, alertaError } from "../Utils/alerts";
import Select from "../Components/Inputs/Select.jsx";
import Input from "../Components/Inputs/Input.jsx";
import "./ModalGlobal.css";
import FileInput from "../Components/Inputs/FileInput.jsx";
import { enviarDatos } from "../Utils/api.js";
import {AmountButton} from "../Components/Buttons/AmountButton.jsx";
import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

export default function Donaciones () {

    const [monto, setMonto] = useState(null);
    const [montoError, setMontoError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isValid },
    } = useForm({ mode: "onChange" });

    const onSubmit = async (data) => {
        if (!monto || monto <= 0) {
            setMontoError("Debes seleccionar un monto");
            return;
        }
    };

    return (
        <PayPalScriptProvider
            options={{
                clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
                currency: "MXN"
            }}
        >
            <div className="donaciones-page">
                <div className="registro-card-view">
                    <div>
                        <h1 className="donaciones-title">Donar</h1>
                        <h2 className="donaciones-welcome">Tu aportación ayuda a financiar nuestros programas y actividades en beneficio de la comunidad.</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-container">

                            <div className="column">

                                <div className="form-group" style={{width: '100%'}}>
                                    <AmountButton
                                        value = {monto}
                                        onChange={(val) => {
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

                                        He leído y acepto el <a className="link" href="https://www.paypal.com/mx/legalhub/paypal/privacy-full">Aviso de privacidad</a>
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
                                </div>
                                <div style={{ marginTop: "20px" }}>
                                    <PayPalButtons
                                        key={`${isValid}-${monto}`}
                                        disabled={!isValid || !monto}
                                        onClick={(data, actions) => {
                                            const formData = getValues();
                                            if (!monto || monto <= 0) {
                                                setMontoError("Debes seleccionar un monto");
                                                return actions.reject();
                                            }
                                            if (!formData.privacidad || !isValid) {
                                                alertaError("Por favor, llena correctamente el formulario y acepta el aviso de privacidad.");
                                                return actions.reject();
                                            }
                                            return actions.resolve();
                                        }}
                                        onApprove={(data, actions) => {
                                            return actions.order.capture().then(async (details) => {
                                                const formData = getValues();
                                                const donationData = {
                                                    ...formData,
                                                    monto,
                                                    estado: "COMPLETADA",
                                                    paypal_order_id: details.id
                                                };

                                                try {
                                                    console.log("DONATION DATA:", donationData);
                                                    const respuesta = await enviarDatos(
                                                        "/api/Donacion/",
                                                        donationData
                                                    );
                                                    console.log("RESPUESTA:", respuesta);

                                                    alertaExito("Tu donación ha sido procesada con éxito. Agradecemos enormemente tu apoyo a nuestra comunidad.");

                                                    reset();
                                                    setMonto(null);
                                                    navigate("/")

                                                } catch (error) {
                                                    console.error("ERROR AL GUARDAR:", error);
                                                    alertaError("Ocurrió un error al registrar tu donación en el sistema.");
                                                }
                                            });
                                        }}
                                        createOrder={(data, actions) => {
                                            return actions.order.create({
                                                purchase_units: [
                                                    {
                                                        amount: {
                                                            value: monto?.toString() || "0"
                                                        }
                                                    }
                                                ]
                                            });
                                        }}
                                        onError={(err) => {
                                            console.error(err);
                                            alertaError("Error al procesar el pago");
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </PayPalScriptProvider>
    )
}