import { Link } from 'react-router-dom';
import Encabezado from '../../Components/Structure/Encabezado.jsx';
import PieDePagina from '../../Components/Structure/PieDePagina.jsx';
import TarjetaPrograma from '../../Components/Programas/TarjetaPrograma.jsx';
import { useSecciones } from './SeccionesContext.jsx';
import {toast} from "../../Utils/alerts.js";

export default function PaginaSecciones() {
    const { secciones } = useSecciones();

    const compartirSeccion = async (seccion) => {
        const url = `${window.location.origin}/secciones/${seccion.slug}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: seccion.titulo,
                    text: `Conoce el programa ${seccion.titulo}`,
                    url,
                });
            } else {
                await navigator.clipboard.writeText(url);
                toast("¡Enlace copiado al portapapeles!");
            }
        } catch (error) {
            console.log("Compartir cancelado", error);
        }
    };

    return (
        <>
            <Encabezado />

            <main style={styles.main}>
                <h2 style={styles.titulo}>Contamos con diferentes tipos de programas</h2>

                <div style={styles.lista}>
                    {secciones.map((seccion) => (
                        <Link
                            key={seccion.id}
                            to={`/secciones/${seccion.slug}`}
                            style={styles.link}
                        >
                            <TarjetaPrograma
                                titulo={seccion.titulo}
                                descripcion={seccion.descripcion}
                                imagen={seccion.imagen}
                                onCompartir={() => compartirSeccion(seccion)}
                            />
                        </Link>
                    ))}
                </div>
            </main>

            <PieDePagina />
        </>
    );
}

const styles = {
    main: {
        minHeight: '80vh',
        padding: '2rem 3rem',
    },
    titulo: {
        fontSize: '1.6rem',
        fontWeight: 700,
        color: '#4A0042',
        marginBottom: '1.5rem',
        position: 'center',
        alignItems: 'center',
    },
    lista: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
    },
};