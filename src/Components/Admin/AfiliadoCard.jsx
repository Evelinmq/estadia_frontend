import EditButton from "../Buttons/EditButton.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import DownloadButton from "../Buttons/DownloadButton.jsx";
import LogoSrc from '../../Img/logo.png';
import "./UserCard.css";

export default function AfiliadoCard({
    nombre,
    apellidoP,
    apellidoM,
    genero,
    edad,
    telefono,
    imagen,
    onEdit,
    onDelete,
    onDownload,
    }) {
    const nombreCompleto = [nombre, apellidoP, apellidoM].filter(Boolean).join(" ");

    
    return (
        <div className="user-card">
            {/* Encabezado____________________ */}
            <div className="user-card__header">
                <img src={LogoSrc} alt="Juventud x Temixco" className="user-card__logo" />
                <h3 className="user-card__titulo">Afiliado</h3>
            </div>

            <div className="user-card__body">
                {/* Foto */}
                <div className="user-card__imagen-wrapper">
                    {imagen ? (
                        <img src={imagen} alt={nombreCompleto} className="user-card__imagen" />
                    ) : (
                        <div className="user-card__imagen-placeholder">
                            <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="user-card__silhouette">
                                <ellipse cx="40" cy="28" rx="20" ry="22" fill="#555" />
                                <ellipse cx="40" cy="85" rx="36" ry="26" fill="#555" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Campos*/}
                <div className="user-card__campos">
                    <p className="user-card__nombre">{nombreCompleto || "Nombre ApellidoP ApellidoM"}</p>
                    <div className="user-card__campo">
                        <span className="user-card__label">Género:</span>
                        <span className="user-card__valor">{genero ?? ""}</span>
                    </div>
                    <div className="user-card__campo">
                        <span className="user-card__label">Edad:</span>
                        <span className="user-card__valor">{edad ?? ""}</span>
                    </div>
                    <div className="user-card__campo">
                        <span className="user-card__label">Teléfono:</span>
                        <span className="user-card__valor">{telefono ?? ""}</span>
                    </div>
                </div>
            </div>

            <div className="user-card__acciones">
                <DownloadButton onClick={onDownload} />
                <EditButton onClick={onEdit} />
                <DeleteButton onClick={onDelete} />
            </div>
        </div>
    );
}