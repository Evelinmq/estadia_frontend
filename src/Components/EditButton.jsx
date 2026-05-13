import "./EditButton.css";
import EditarIcon from "../assets/Editar.svg";

export default function EditButton({ onClick }) {
    return (
        <button className="edit-btn" onClick={onClick} aria-label="Editar">
            <img src={EditarIcon} alt="Editar" width="18" height="18" />
        </button>
    );
}