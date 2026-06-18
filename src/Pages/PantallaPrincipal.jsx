
import Encabezado from "../Components/Structure/Encabezado.jsx";
import './ModalGlobal.css';
import QuienesSomos from "../Components/Informacion/QuienesSomos.jsx";
import Mision from "../Components/Informacion/Mision.jsx";
import Vision from "../Components/Informacion/Vision.jsx";
import ReactPlayer from 'react-player';
import Valores from "../Components/Informacion/Valores.jsx";
import AlianzasConvenios from "../Components/Informacion/AlianzasConvenios.jsx";
import PieDePagina from "../Components/Structure/PieDePagina.jsx";
import videoEstadias from "../Img/videoEstadias.mp4";

export default function PantallaPrincipal() {


    return(

        <div>
            <Encabezado />
            <div className="card-pantalla">
            <div className="card-titulo">
                <h2 className="titulo-pantalla">¿Quiénes somos?</h2>
            </div>
            <div className="card-video"> 
                <ReactPlayer src={videoEstadias} l controls={true} width="100%" height="100%" className="video-pantalla"/> 
            </div>
            <div className="card-informacion">
                <QuienesSomos />
                <h2 className="subtitulo-pantalla">Nuestra Misión y Visión</h2>
                <Mision />
                <Vision />
            </div>

            <div>
                <h2 className="subtitulo-pantalla2">Nuestros Valores</h2>

                <div className="fila">
                    <Valores titulo="Respeto"  descripcion="Consideración sobre lo que es digno para las personas, en un ambiente de paz y cordialidad." />
                     <Valores titulo="Igualdad"  descripcion="Sin distinción de raza, género, sexo, status social, o nacional."/>
                      <Valores titulo="Aprendizaje"  descripcion="Procuraremos la formación continua y el desarrollo profesional de las y los asociados."/>
                </div>

                <div className="fila">
                <Valores titulo="Adaptabilidad"  descripcion="Estamos convencidos de que para brindar un servicio de excelencia, es necesario adaptarse a contextos y tecnologias cada vez más dinámicas para estar a la vanguardia." />
             <Valores titulo="Colaboración" descripcion="Creemos que los logros son fruto del esfuerzo compartido, por lo que cada proyecto que abordamos se concreta en el marco de un equipo inter cooperativo y bien comunicado." />
                   

            </div>


            <div className="card-pantalla">
                    <AlianzasConvenios />
            </div>

            <div>
                <PieDePagina />
            </div>

        </div>

    </div>
    </div>


    )

}