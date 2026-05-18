import './Informacion.css';
import imagenPrueba from '../../Img/imagenPrueba.png';

export default function QuienesSomos() {


    return(
        <div className="tarjeta-organizacion">
            <div className="tarjeta-imagen">
                <img  src={imagenPrueba} alt="QuienesSomos" className="img-QuienesSomos"/>
            </div>
            <div className="tarjeta-contenido">
                <h3 className="tarjeta-titulo">¡Juventud por Temixco!</h3>
                <p className="tarjeta-texto">Es una organización sin fines de lucro que tiene como beneficiarios en todas y cada una de las actividades asistenciales que realiza a personas, sectores y regiones de escasos recursos; comunidades indígenas y grupos vulnerables.</p>
           </div>
            </div>
    )

}