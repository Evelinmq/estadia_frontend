import '../Estilos.css'
import logo from '../../Img/logo.png'
import icono from '../../Img/icono.png'
import donacion from '../../Img/donacion.png'
import {Button} from "../Buttons/Button.jsx";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Encabezado = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const navigate = useNavigate();

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
                <a href="#" className="navegacion-link active" onClick={(e) => { e.preventDefault(); 
                navigate("/"); setMenuAbierto(false);  }}>Inicio</a>
                <a href="#" className="navegacion-link" onClick={(e) => { e.preventDefault(); 
                navigate("/voluntariado"); setMenuAbierto(false);  }}>Voluntariado</a> 
                <a href="#" className="navegacion-link" onClick={(e) => { e.preventDefault(); 
                navigate("/paginaSecciones"); setMenuAbierto(false);  }}>Programas</a>
                <a href="#" className="navegacion-link" onClick={() => setMenuAbierto(false)}>
                    <img src={icono} alt="Icono" />
                </a>
                
                
                <div className="botones-grupo">
                    <Button label="Iniciar Sesión" onClick={() => navigate("/login")} />
                    <Button label="Donación" onClick={() => navigate("/") }img={donacion} />
                    <Button label="Registrarse" onClick={() => navigate("/registroBeneficiarios")} />
                </div>
            </nav>
        </header>
    );
};

export default Encabezado;