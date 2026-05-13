import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import "./SectionCard.css";

export default function SectionCard({ titulo, descripcion, imagen, onEdit, onDelete }) {
    return (
        <div className="section-card">
            <h3 className="section-card__titulo">{titulo}</h3>

            <div className="section-card__imagen-wrapper">
                {imagen ? (
                    <img src={imagen} alt={titulo} className="section-card__imagen" />
                ) : (
                    <div className="section-card__imagen-placeholder">
                        <span>Sin imagen</span>
                    </div>
                )}
            </div>

            <p className="section-card__descripcion">{descripcion}</p>

            <div className="section-card__acciones">
                <EditButton onClick={onEdit} />
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    );
}