import EditButton from "../Buttons/EditButton.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import "./ImageCard.css";

export default function ImageCard({ titulo, imagen, onEdit, onDelete }) {
    return (
        <div className="image-card">
            <h3 className="image-card__titulo">{titulo}</h3>

            <div className="image-card__imagen-wrapper">
                {imagen ? (
                    <img src={imagen} alt={titulo} className="image-card__imagen" />
                ) : (
                    <div className="image-card__imagen-placeholder">
                        <span>Sin imagen</span>
                    </div>
                )}
            </div>

            <div className="image-card__acciones">
                <EditButton onClick={onEdit} />
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    );
}