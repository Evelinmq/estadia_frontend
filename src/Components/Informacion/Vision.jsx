import './Informacion.css'

import {obtenerDatos} from "../../Utils/api.js";
import {useEffect, useState} from "react";
import {alertaError} from "../../Utils/alerts.js";

export default function Vision() {

    const [vision, setVision] = useState(null);

    useEffect(() => {
        const cargarVision = async () => {
            try {
                const datos = await obtenerDatos("/api/goal/name/Vision");
                setVision(datos);
            } catch (error) {
                alertaError("Lo sentimos. Ocurrió un error al cargar los datos de la página");
                console.log("Ocurrió un error al cargar la Visión, error: ", error);
            }
        };
        cargarVision();
    }, []);

    return (
        <div className="tarjeta-organizacion">
        <div className="card-Vision">

            <div >
                <h3 className="titulo-Vision-Mision">VISIÓN</h3>
                <p className="descripcion-Vision-Mision">{vision?.description}</p>
            </div>
        </div>
        </div>

    );
}
