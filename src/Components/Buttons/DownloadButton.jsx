import "./DownloadButton.css";
import DescargarIcon from "../../assets/DownloadIcon.svg";

export default function DownloadButton({ onClick }) {
    return (
        <button className="download-btn" onClick={onClick} aria-label="Descargar">
            <img src={DescargarIcon} alt="Descargar" width="18" height="18" />
        </button>
    );
}