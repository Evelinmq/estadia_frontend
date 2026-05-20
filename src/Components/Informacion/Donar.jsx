import { useForm } from "react-hook-form";
import { useState } from "react";
import Input from "../Inputs/Input.jsx";
import { Button } from "../Buttons/Button.jsx";

/* Estilos */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Nunito', sans-serif;
    background: #f0eaf5;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 16px;
  }

  .card {
    background: #fff;
    border-radius: 20px;
    padding: 48px 52px;
    width: 100%;
    max-width: 780px;
    box-shadow: 0 8px 40px rgba(128, 0, 128, 0.08);
    animation: fadeUp .45s ease both;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .titulo {
    font-size: 2rem;
    font-weight: 800;
    color: #5b0060;
    text-align: center;
    margin-bottom: 8px;
  }
  .subtitulo {
    font-size: .92rem;
    color: #7a7a9d;
    text-align: center;
    margin-bottom: 36px;
    line-height: 1.5;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px 28px;
  }
  .span-full { grid-column: 1 / -1; }

  @media (max-width: 600px) {
    .card { padding: 32px 20px; }
    .titulo { font-size: 1.5rem; }
    .grid { grid-template-columns: 1fr; }
    .span-full { grid-column: 1; }
  }

  /* Prefix $ para el monto */
  .input-prefix-wrap { position: relative; }
  .input-prefix-wrap .prefix {
    position: absolute;
    left: 14px;
    top: 38px; /* debajo del label */
    color: #7b2d8b;
    font-weight: 700;
    font-size: .95rem;
    pointer-events: none;
    z-index: 1;
  }
  .input-prefix-wrap .modal-input { padding-left: 28px !important; }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 36px;
    flex-wrap: wrap;
  }

  .btn-cancelar-custom {
    padding: 12px 32px;
    border-radius: 12px;
    font-family: 'Nunito', sans-serif;
    font-size: .95rem;
    font-weight: 700;
    cursor: pointer;
    border: none;
    background: #e8e0ef;
    color: #5b0060;
    transition: background .15s;
  }
  .btn-cancelar-custom:hover { background: #ddd0e8; }

  .toast {
    position: fixed;
    bottom: 28px;
    right: 28px;
    background: #5b0060;
    color: #fff;
    padding: 14px 22px;
    border-radius: 12px;
    font-weight: 700;
    font-size: .9rem;
    box-shadow: 0 6px 24px rgba(0,0,0,.18);
    animation: slideIn .3s ease both;
    z-index: 999;
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

export default function FormDonar() {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ mode: "onChange" });

    const onSubmit = (data) => {
        reset();
    };

    const handleCancel = () => reset();

    return (
        <>
            <style>{styles}</style>

            <div className="card">
                <h1 className="titulo">Donar</h1>
                <p className="subtitulo">
                    Completa el formulario para realizar tu donación y apoyar nuestra causa.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="grid">

                        {/* Monto */}
                        <div className="span-full">
                            <div className="input-prefix-wrap">
                                <span className="prefix">$</span>
                                <Input
                                    label="Monto (MXN)"
                                    type="text"
                                    inputMode="numeric"
                                    error={errors.monto}
                                    {...register("monto", {
                                        required: "El monto es obligatorio.",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Solo se permiten números enteros.",
                                        },
                                        validate: (val) =>
                                            parseInt(val, 10) > 0 || "El monto debe ser mayor a $0.",
                                    })}
                                    onKeyDown={(e) => {
                                        const allowed = [
                                            "Backspace", "Delete", "Tab",
                                            "ArrowLeft", "ArrowRight", "Home", "End",
                                        ];
                                        if (!allowed.includes(e.key) && !/^\d$/.test(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        {/* Nombre */}
                        <Input
                            label="Nombre(s)"
                            type="text"
                            error={errors.nombre}
                            {...register("nombre", {
                                required: "El nombre es obligatorio.",
                                minLength: { value: 2, message: "Mínimo 2 caracteres." },
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    message: "Solo se permiten letras.",
                                },
                                validate: (val) =>
                                    val.trim() === val || "Sin espacios al inicio o al final.",
                            })}
                        />

                        {/* Apellido Paterno */}
                        <Input
                            label="Apellido Paterno"
                            type="text"
                            error={errors.apellidoPaterno}
                            {...register("apellidoPaterno", {
                                required: "El apellido paterno es obligatorio.",
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    message: "Solo se permiten letras.",
                                },
                                validate: (val) =>
                                    val.trim() === val || "Sin espacios al inicio o al final.",
                            })}
                        />

                        {/* Apellido Materno */}
                        <Input
                            label="Apellido Materno"
                            type="text"
                            error={errors.apellidoMaterno}
                            {...register("apellidoMaterno", {
                                required: "El apellido materno es obligatorio.",
                                pattern: {
                                    value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                                    message: "Solo se permiten letras.",
                                },
                                validate: (val) =>
                                    val.trim() === val || "Sin espacios al inicio o al final.",
                            })}
                        />

                        {/* Correo */}
                        <Input
                            label="Correo electrónico"
                            type="email"
                            error={errors.correo}
                            {...register("correo", {
                                required: "El correo es obligatorio.",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Ingresa un correo válido.",
                                },
                            })}
                        />

                    </div>

                    {/* Acciones */}
                    <div className="actions">
                        <button type="button" className="btn-cancelar-custom" onClick={handleCancel}>
                            Regresar
                        </button>

                        <Button label="Donar" onClick={() => {}} />
                    </div>
                </form>
            </div>
        </>
    );
}