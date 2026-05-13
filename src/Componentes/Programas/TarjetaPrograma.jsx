import {Button} from "../Button.jsx";
import './Programa.css'


export default function TarjetaPrograma({ titulo, descripcion, imagen }) {
    return (
        <div className="programa-card">
            <div className="Imagen-programa-card">
                {imagen ? (
                    <img src={imagen} alt={titulo} className="Imagen-programa-card" />
                ) : (
                    <div className="Imagen-programa-card">
                        <span>Sin imagen</span>
                    </div>
                )}
            </div>

            <div className="info-wrapper">
                <h3 className="Programa-titulo">{titulo} Emprende tu negocio</h3>
                <p className="Programa-descripcion">{descripcion} Se busca ayudar a la gente a poder emprender su propio negocio, con precios accesibles.</p>
            <div className="compartir-link">
               <span>🔗</span> Compartir
            </div>
        </div>
        <div className="Acciones-botones">
            <Button label={"Ver más"}/>
        </div>
    </div>

    );
}