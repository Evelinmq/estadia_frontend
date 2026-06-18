import './Informacion.css';
import imagen2 from "../../Img/imagen2.png";

export default function InfoVoluntariado() {


    return(
        <div className="tarjeta-organizacion">
            <div className="tarjeta-imagen">
                <img  src={imagen2} alt="voluntariado" className="img-QuienesSomos"/>
            </div>
            <div className="tarjeta-contenido-morado">
                <p className="tarjeta-texto-blanco">Se parte del cambio y únete como voluntariado</p>
           </div>
            </div>
    )

}