import './Informacion.css'

export default function Mision({ descripcion }) {
    return (
        <div className="card-Mision">
            <div>
                <h3 className="titulo-Vision-Mision">MISIÓN</h3>
                <p className="descripcion-Vision-Mision">{descripcion} </p>
            </div>
        </div>

    );
}