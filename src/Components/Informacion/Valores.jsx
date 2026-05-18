import './Informacion.css'

export default function Valores ({titulo, descripcion}) {

    return(
        <div className="valores-card">
        <div className="contenedor-texto">
                <h2 className="titulo">{titulo}</h2>
            <p className="descripcion">{descripcion}</p>
        </div>

        </div>

    )

}