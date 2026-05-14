
import '../Estilos.css'
import logo from '../../Img/logo.png'
import icono from '../../Img/icono.png'
import donacion from '../../Img/donacion.png'
import {Button} from "../Buttons/Button.jsx";



export const Encabezado = () => {


    return (
        <header className="encabezado">
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <img src={logo} alt="Logo" />

            <a href="#" className="navegacion-link active">Inicio</a>
            <a href="#" className="navegacion-link">Voluntariado</a>
            <a href="#" className="navegacion-link">Programas</a>
            <a href="#" className="navegacion-link"><img src={icono} alt="Icono" /></a>

            <Button label="Iniciar Sesión" onClick={() => {}} />
            <Button label="Donación" onClick={() => {}} img={donacion} />
            <Button label="Registrarse" onClick={() => {}} />

        </header>

    )
}

export default Encabezado;