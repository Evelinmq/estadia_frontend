

import './Estilos.css'

export function Button({ label, onClick }) {

    return(
        <button className="button" onClick={onClick}>{label}</button>
    )
}

export function ButtonPieDePagina({ label, onClick }) {

    return(
        <button className="buttonPieDePagina" onClick={onClick}>{label}</button>
    )
}