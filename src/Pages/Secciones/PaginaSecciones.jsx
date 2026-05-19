import { Link } from 'react-router-dom';
import Encabezado from '../../Components/Structure/Encabezado.jsx';
import PieDePagina from '../../Components/Structure/PieDePagina.jsx';
import TarjetaPrograma from '../../Components/Programas/TarjetaPrograma.jsx';
import { useSecciones } from './SeccionesContext.jsx';

export default function PaginaSecciones() {
    const { secciones } = useSecciones();

    return (
        <>
            <Encabezado />

            <main style={styles.main}>
                <h2 style={styles.titulo}>Contamos con diferentes tipos de programas</h2>

                <div style={styles.lista}>
                    {secciones.map((seccion) => (
                        // Envuelve cada tarjeta en un Link para la navegación dinámica
                        <Link
                            key={seccion.id}
                            to={`/secciones/${seccion.slug}`}
                            style={styles.link}
                        >
                            <TarjetaPrograma
                                titulo={seccion.titulo}
                                descripcion={seccion.descripcion}
                                imagen={seccion.imagen}
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
    },
    lista: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    // Elimina la decoración del link para que la tarjeta se vea igual
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
    },
};

/*
import { SeccionesProvider } from './Pages/Secciones/SeccionesContext.jsx';
import AppRouter from './Routes/AppRouter.jsx';

function App() {
    return (
        <SeccionesProvider>
            <AppRouter />
        </SeccionesProvider>
    );
}

export default App;
 */