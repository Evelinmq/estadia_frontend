import { useParams, useNavigate } from 'react-router-dom';
import Encabezado from '../../Components/Structure/Encabezado.jsx';
import PieDePagina from '../../Components/Structure/PieDePagina.jsx';
import HeaderProgramas from '../../Components/Informacion/HeaderProgramas.jsx';
import { useSecciones } from './SeccionesContext.jsx';

function TarjetaImagen({ imagen, titulo }) {
    return (
        <div style={imgStyles.card}>
            <img
                src={imagen.url}
                alt={imagen.descripcion ?? titulo}
                style={imgStyles.img}
            />
        </div>
    );
}

const imgStyles = {
    card: {
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #e0d0de',
        width: 280,
        flexShrink: 0,
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(74,0,66,0.08)',
    },
    img: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
        display: 'block',
    },
};

// Página principal del detalle
export default function DetalleSeccion() {
    const { slug } = useParams();                    // lee el slug de la URL
    const { obtenerPorSlug } = useSecciones();
    const navigate = useNavigate();

    const seccion = obtenerPorSlug(slug);

    // Sección no encontrada
    if (!seccion) {
        return (
            <>
                <Encabezado />
                <main style={styles.main}>
                    <p style={styles.noEncontrado}>Sección no encontrada.</p>
                    <button style={styles.volver} onClick={() => navigate('/secciones')}>
                        ← Volver a programas
                    </button>
                </main>
                <PieDePagina />
            </>
        );
    }

    return (
        <>
            <Encabezado />

            <HeaderProgramas titulo={seccion.titulo} />

            <main style={styles.main}>
                {seccion.imagenes && seccion.imagenes.length > 0 ? (
                    // ── Cuadrícula de imágenes ──────────────────
                    <div style={styles.grid}>
                        {seccion.imagenes.map((imagen, i) => (
                            <TarjetaImagen
                                key={imagen.id ?? i}
                                imagen={imagen}
                                titulo={seccion.titulo}
                            />
                        ))}
                    </div>
                ) : (
                    // En caso de que aún no se suban imágenes
                    <div style={styles.sinImagenes}>
                        <p>Lo sentimos. Aún no hay imágenes disponibles para esta sección.</p>
                    </div>
                )}
            </main>

            <PieDePagina />
        </>
    );
}

const styles = {
    main: {
        minHeight: '50vh',
        padding: '0 3rem 3rem',
    },
    grid: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        justifyContent: 'center',
    },
    sinImagenes: {
        textAlign: 'center',
        padding: '3rem',
        color: '#4A0042',
        fontSize: 18,
    },
    noEncontrado: {
        textAlign: 'center',
        fontSize: 22,
        color: '#4A0042',
        marginTop: '3rem',
    },
    volver: {
        display: 'block',
        margin: '1rem auto',
        padding: '0.5rem 1.5rem',
        background: '#4A0042',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontSize: 16,
    },
};