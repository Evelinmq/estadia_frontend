import logoBlanco from '../Img/logoBlanco.png'
import './Estilos.css'
import facebook from "../Img/facebook.png"
import instagram from "../Img/instagram.png"
import Whats from "../Img/Whats.png"
//import telefono from "../Img/telefono.png"
import locali from "../Img/locali.png"
import corre from "../Img/corre.png"
import {ButtonPieDePagina} from "./Button.jsx";

export const PieDePagina = () =>{

    return(
<footer className="Piedepagina-card">
    <div className="footer-column ">
    <img src={logoBlanco} alt="logo" className="footer-logo"/>
    <div className="contact-info links-verticales">
        <p>+52 777 257 8970</p>
        <p>+52 777 134 3182</p>
        <p>+52 777 790 5459</p>
    </div>
</div>

    <div className="footer-column">
        <h3 className="Titulo-inferior">ENLACES</h3>
        <div className="links-verticales">
        <a href={"#"} className="navegacion-link-Inferior">Inicio</a>
        <a href={"#"} className="navegacion-link-Inferior">Voluntariado</a>
        <a href={"#"} className="navegacion-link-Inferior">Programas</a>
        </div>
    </div>

    <div className="footer-column">
        <h3 className="Titulo-inferior">REDES SOCIALES</h3>
        <div className="social-icons-wrapper">
        <a href="#" className="navegacion-link-Inferior"><img src={Whats} alt="Whats" /></a>
        <a href="#" className="navegacion-link-Inferior"><img src={facebook} alt="facebook" /></a>
        <a href="#" className="navegacion-link-Inferior"><img src={instagram} alt="Instagram" /></a>
        </div>
    <div className="extra-info links-verticales">
        <div className="contacto-item">
            <img src={corre} alt="correo" className="icon-small"/>
            <p>juventud.temixco.2019@hotmail.com</p>
        </div>
        <div className="contacto-item">
            <img src={locali} alt="localización" className="icon-small"/>
            <p>Municipio de Temixco</p>
    </div>
    </div>
    </div>


    <div className="footer-column buttons-section">
        <h3 className="Titulo-inferior">ÚNETE A NOSOTROS</h3>
        <ButtonPieDePagina  label="Registrarse"/>
        <ButtonPieDePagina label="Donar"/>
    </div>

</footer>
    )

}