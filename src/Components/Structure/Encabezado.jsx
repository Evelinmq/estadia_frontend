
import '../Estilos.css'
import logo from '../../Img/logo.png'
import icono from '../../Img/icono.png'
import donacion from '../../Img/donacion.png'
import {Button} from "../Buttons/Button.jsx";
import { useState } from 'react';


export const Encabezado = () => {

const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };



    return (
        <header className="encabezado">

           <div className="header-logo">
                <img src={logo} alt="Logo" />
            </div>


            <button className={`menu-hamburguesa ${menuAbierto ? 'abierto' : ''}`} onClick={toggleMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>

        <nav className={`navegacion-menu ${menuAbierto ? 'desplegado' : ''}`}>
                <a href="#" className="navegacion-link active" onClick={() => setMenuAbierto(false)}>Inicio</a>
                <a href="#" className="navegacion-link" onClick={() => setMenuAbierto(false)}>Voluntariado</a>
                <a href="#" className="navegacion-link" onClick={() => setMenuAbierto(false)}>Programas</a>
                <a href="#" className="navegacion-link" onClick={() => setMenuAbierto(false)}>
                    <img src={icono} alt="Icono" /></a>
            

            <div className="botones-grupo">
            <Button label="Iniciar Sesión" onClick={() => {}} />
            <Button label="Donación" onClick={() => {}} img={donacion} />
            <Button label="Registrarse" onClick={() => {}} />
            </div>
            </nav>
        </header>

    )
}

export default Encabezado;