import './Informacion.css'
import {useEffect, useState} from "react";
import {obtenerDatos} from "../../Utils/api.js";
import {alertaError} from "../../Utils/alerts.js";

export default function Mision() {

    const [mision, setMision] = useState(null);

    useEffect(() => {
        const cargarMision = async () => {
            try {
                const datos = await obtenerDatos("/api/goal/name/Mision");
                setMision(datos);
            } catch (error) {
                alertaError("Lo sentimos. Ocurrió un error al cargar los datos de la página");
                console.log("Ocurrió un error al cargar la Visión, error: ", error);
            }
        }
        cargarMision();
    }, []);

    return (
        <div className="tarjeta-organizacion">
        <div className="card-Mision">
            <div>
                <h3 className="titulo-Vision-Mision">MISIÓN</h3>
                <p className="descripcion-Vision-Mision">{mision?.description} </p>
            </div>
        </div>
        </div>
    );
}