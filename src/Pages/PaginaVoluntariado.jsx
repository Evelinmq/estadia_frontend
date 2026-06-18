import Encabezado from "../Components/Structure/Encabezado";
import './ModalGlobal.css';
import InfoVoluntariado from "../Components/Informacion/InfoVoluntariado";
import Voluntariado from "../Components/Informacion/Voluntariado";
import voluntariado1 from "../Img/voluntariado1.png";
import voluntariado2 from "../Img/voluntariado2.png";
import voluntariado3 from "../Img/voluntariado3.png";
import voluntariado4 from "../Img/voluntariado4.png";
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
                                <Voluntariado className="card-morada" imagen={voluntariado1} texto="Diseño de protocolos de atención para personas en situación de vulnerabilidad." />
                                <Voluntariado className="card-morado2" imagen={voluntariado2} texto="Organización de talleres de salud emocional y nutrición (usando los alimentos de la canasta básica)." />
                                <Voluntariado className="card-morado3" imagen={voluntariado3} texto="Evaluación del impacto social: ¿Cómo mejoró la salud  de la colonia tras la intervención?" />
                             </div>
                             </div>


                             <div className="fila">

                                 <Voluntariado className="card-morado4" imagen={voluntariado4} texto="Programa de intervención integral para el bienestar comunitario en zonas vulnerables." />
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