
import Encabezado from "../Components/Structure/Encabezado.jsx";
import './ModalGlobal.css';
import QuienesSomos from "../Components/Informacion/QuienesSomos.jsx";
import Mision from "../Components/Informacion/Mision.jsx";
import Vision from "../Components/Informacion/Vision.jsx";
import ReactPlayer from 'react-player';
import Valores from "../Components/Informacion/Valores.jsx";
import AlianzasConvenios from "../Components/Informacion/AlianzasConvenios.jsx";
import PieDePagina from "../Components/Structure/PieDePagina.jsx";

export default function PantallaPrincipal() {


    return(

        <div>
            <Encabezado />
            <div className="card-pantalla">
            <div className="card-titulo">
                <h2 className="titulo-pantalla">¿Quiénes somos?</h2>
            </div>
            <div className="card-video"> 
                <ReactPlayer src="https://youtu.be/w81Yj4uWir0?si=ilZ5SxdLz_6iYzG4" controls={true} width="100%" height="100%" className="video-pantalla"/> 
            </div>
            <div className="card-informacion">
                <QuienesSomos />
                <h2 className="subtitulo-pantalla">Nuestra Misión y Visión</h2>
                <Mision descripcion="​Somos una organización civil sin fines de lucro dedicada a mejorar la calidad de vida de los sectores más vulnerables en Morelos y sus alrededores. Nuestra labor se centra en brindar asistencia integral en materia de salud, alimentación, vivienda y servicios jurídicos, promoviendo al mismo tiempo el desarrollo cultural, educativo y la defensa de los derechos humanos. Buscamos empoderar a la comunidad mediante la capacitación para el trabajo, la protección del patrimonio cultural y el fomento de la participación ciudadana organizada." />
                <Vision descripcion="Consolidarnos como la organización líder y referente en el estado de Morelos por nuestra capacidad de transformar el entorno social de las comunidades indígenas y grupos vulnerables. Aspiramos a un futuro donde cada ciudadano tenga acceso pleno a la salud, educación de calidad y justicia social, logrando un desarrollo regional sustentable, inclusivo y en total armonía con la cultura y el medio ambiente de nuestra región." />
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