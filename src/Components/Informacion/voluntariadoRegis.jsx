import './Informacion.css'
import { Button } from '../Buttons/Button';
import foco from "../../Img/foco.png";
import formulario from "../../Img/formulario.png";
import taza from "../../Img/taza.png";
import user from "../../Img/user.png";


export default function VoluntariadoRegis(){
    return(

        <div className="card-registro-voluntariado">
           <div className="pasos-contenedor">

            <div className="paso-item">
            <img src={formulario} alt="formulario" className="icono-flujo"/>
            <p className="descripcion-flujo"> Registrate</p>
            </div>
            
            <div className="paso-item">
                <div className="iconos-dobles">
            <img src={taza} alt="taza"  className="icono-flujo"/>
            <img src={user} alt="user" className="icono-flujo"/>
            </div>
            <p className="descripcion-flujo">Nos comunicamos contigo</p>
            </div>

            <div className="paso-item">
            <img src={foco} alt="foco" className="icono-flujo"/>
            <p className="descripcion-flujo"> ¡Comienza a ayudar!</p>
            </div>

           </div>

           <div className="seccion-boton-registro">
            <p className="texto-ayuda-boton">Dale click al botón de registro para comenzar</p>
            <div className="flecha-abajo">↓</div>
            <Button label="Registrarse"  onClick={() => {}} />
           </div>

        </div>


    )

}

