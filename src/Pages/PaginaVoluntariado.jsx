import Encabezado from "../Components/Structure/Encabezado";
import './ModalGlobal.css';
import InfoVoluntariado from "../Components/Informacion/InfoVoluntariado";
import Voluntariado from "../Components/Informacion/Voluntariado";
import prueba2 from "../Img/prueba2.png";
import VoluntariadoRegis from "../Components/Informacion/VoluntariadoRegis";
import PieDePagina from "../Components/Structure/PieDePagina.jsx";


export default function PaginaVoluntariado() {
    return (
        <div>
            <Encabezado />

             <div className="card-informacion">
                 <InfoVoluntariado />
             </div>


             <div>
                             <h2 className="subtitulo-pantalla2">Caminos para colaborar</h2>

                             <div className="card-pantalla">
                             <div className="fila">
                                <Voluntariado className="card-morada" imagen={prueba2} texto="Diseño de protocolos de atención para personas en situación de vulnerabilidad." />
                                <Voluntariado className="card-morado2" imagen={prueba2} texto="Organización de talleres de salud emocional y nutrición (usando los alimentos de la canasta básica)." />
                                <Voluntariado className="card-morado3" imagen={prueba2} texto="Evaluación del impacto social: ¿Cómo mejoró la salud  de la colonia tras la intervención?" />
                             </div>
                             </div>


                             <div className="fila">

                                 <Voluntariado className="card-morado4" imagen={prueba2} texto="Programa de intervención integral para el bienestar comunitario en zonas vulnerables." />
             </div>
          </div>

          <div>

             <h2 className="subtitulo-pantalla2">¿Cómo empezar?</h2>
             <div>
                <VoluntariadoRegis/>
             </div>
          </div>

          <div>
            <PieDePagina />
            </div>            



        </div>
    );
}