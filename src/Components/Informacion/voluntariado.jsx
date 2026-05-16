import React from "react";
import "./Informacion.css";
import voluntariado from "../../Img/voluntariado.png";


export default function Voluntariado({imagen, texto, className}) {

    return(
        <div className={`card-Voluntariado ${className}`}>
            <img src={imagen} alt="Voluntariado" className="imagen-Voluntariado"/>
            <div className="card-texto">
            <p className="descripcion-Voluntariado">
              {texto}
            </p>
            </div>
        </div>
    )
}

