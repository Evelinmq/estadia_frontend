import './Informacion.css'

export default function Vision({descripcion }) {
    return (
        <div className="card-Vision">

            <div >
                <h3 className="titulo-Vision-Mision">VISIÓN</h3>
                <p className="descripcion-Vision-Mision">{descripcion}</p>
            </div>
        </div>

    );
}
