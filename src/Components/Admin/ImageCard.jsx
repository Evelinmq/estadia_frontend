import { useState, useEffect } from "react";
import EditButton from "../Buttons/EditButton.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import "./ImageCard.css";

export default function ImageCard({ titulo, imagen, onEdit, onDelete }) {
    const [esVideo, setEsVideo] = useState(false);

    // Si la prop de la imagen cambia se reinicia el estado
    useEffect(() => {
        setEsVideo(false);
    }, [imagen]);

    return (
        <div className="image-card">
            <h3 className="image-card__titulo">{titulo}</h3>

            <div className="image-card__imagen-wrapper">
                {imagen ? (
                    esVideo ? (
                        <video
                            src={imagen}
                            className="image-card__imagen"
                            style={{ objectFit: 'cover' }}
                            muted
                            loop
                            autoPlay
                            playsInline
                        />
                    ) : (
                        <img
                            src={imagen}
                            alt={titulo}
                            className="image-card__imagen"
                            onError={() => {
                                setEsVideo(true);
                            }}
                        />
                    )
                ) : (
                    <div className="image-card__imagen-placeholder">
                        <span>Sin archivo</span>
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