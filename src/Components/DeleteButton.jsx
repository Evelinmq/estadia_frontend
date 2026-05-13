import "./DeleteButton.css";
import BorrarIcon from "../assets/Borrar.svg";

export default function DeleteButton({ onClick }) {
    return (
        <button className="delete-btn" onClick={onClick} aria-label="Eliminar">
            <img src={BorrarIcon} alt="Eliminar" width="18" height="18" />
        </button>
    );
}