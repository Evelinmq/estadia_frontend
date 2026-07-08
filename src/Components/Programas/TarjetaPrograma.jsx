import { Button } from "../Buttons/Button.jsx";
import './Programa.css';

export default function TarjetaPrograma({ titulo, descripcion, imagen, onCompartir }) {
    return (
        <div className="programa-card">
            <div className="contenedor-imagen">
                {imagen ? (
                    <img src={imagen} alt={titulo} className="imagen-circular" />
                ) : (
                    <div className="sin-imagen">
                        <span>Sin imagen</span>
                    </div>
                )}
            </div>

            <div className="info-wrapper">
                <h3 className="Programa-titulo">{titulo}</h3>
                <p className="Programa-descripcion">{descripcion}</p>
                <div
                    className="compartir-link"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onCompartir();
                    }}
                >
                    <span>🔗</span> Compartir
                </div>
            </div>

            <div className="Acciones-botones">
                <Button label={"Ver más"} />
            </div>
        </div>
    );
}