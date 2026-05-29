import { createContext, useContext, useState, useEffect } from 'react';
import {alertaError} from "../../Utils/alerts.js";

const BASE_URL = "http://localhost:8080";

const SeccionesContext = createContext(null);

export function SeccionesProvider({ children }) {
    const [secciones, setSecciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                setLoading(true);

                const res = await fetch(`${BASE_URL}/api/section`,{
                    credentials: 'include',
                });

                const data = await res.json();

                const adaptadas = data.map((sec) => ({
                    id: sec.id,
                    slug: sec.name
                        .toLowerCase()
                        .normalize('NFD')
                        .replace(/[\u0300-\u036f]/g, '')
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, ''),
                    titulo: sec.name,
                    descripcion: sec.description,
                    imagen: `${BASE_URL}/api/section/imagen/${sec.id}`,
                    imagenes: [],
                }));

                setSecciones(adaptadas);
            } catch (error) {
                alertaError("Ocurrió un error a cargar la información");
                console.error("Ocurrió un error a cargar las secciones: ", error)
            } finally {
                setLoading(false);
            }
        };

        cargar();

    }, []);

    const cargarImagenesDeSeccion = async (id) => {
        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/api/section/${id}/programs`, {
                credentials: 'include',
            });

            const programas = await res.json();

            const imagenes = programas
                .filter(p => p.image !== null)
                .map(p => ({
                    id: p.id,
                    url: `${BASE_URL}/api/section/program/image/${p.id}`,
                    descripcion: p.name ?? '',
                }));

            setSecciones(prev =>
                prev.map(s => s.id === id ? { ...s, imagenes } : s)
            );
        } catch (e) {
            alertaError("Ocurrió un error al cargar las imagenes");
            console.log("Ocurrió un error al obtener las imagenes de los programas: ", e);
        } finally {
            setLoading(false);
        }
    }

    // El admin llama a esto para agregar una nueva sección
    const agregarSeccion = (nuevaSeccion) => {
        const slug = nuevaSeccion.titulo
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        setSecciones((prev) => [
            ...prev,
            { ...nuevaSeccion, id: Date.now(), slug, imagenes: nuevaSeccion.imagenes ?? [] },
        ]);
    };

    // El admin llama a esto para agregar imágenes a una sección existente
    const agregarImagenes = (slug, nuevasImagenes) => {
        setSecciones((prev) =>
            prev.map((s) =>
                s.slug === slug
                    ? { ...s, imagenes: [...(s.imagenes ?? []), ...nuevasImagenes] }
                    : s
            )
        );
    };

    // Buscar una sección por su slug (para la ruta dinámica)
    const obtenerPorSlug = (slug) =>
        secciones.find((s) => s.slug === slug) ?? null;

    return (
        <SeccionesContext.Provider value={{ secciones, loading, agregarSeccion, agregarImagenes, obtenerPorSlug, cargarImagenesDeSeccion }}>
            {children}
        </SeccionesContext.Provider>
    );
}

// Hook para consumir el contexto fácilmente
export function useSecciones() {
    const ctx = useContext(SeccionesContext);
    if (!ctx) throw new Error('useSecciones debe usarse dentro de <SeccionesProvider>');
    return ctx;
}