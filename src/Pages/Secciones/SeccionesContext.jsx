import { createContext, useContext, useState } from 'react';

// Datos de ejemplo
const seccionesIniciales = [
    {
        id: 1,
        slug: 'emprende-tu-negocio',
        titulo: 'Emprende tu negocio',
        descripcion: 'Se busca ayudar a la gente a poder emprender su propio negocio, con precios accesibles.',
        imagen: null,
        imagenes: [],
    },
    {
        id: 2,
        slug: 'vivienda',
        titulo: 'Vivienda',
        descripcion: 'Se busca ayudar a la gente a poder construir su vivienda, con materiales a precios accesibles.',
        imagen: null,
        imagenes: [],
    },
    {
        id: 3,
        slug: 'salud-auditiva',
        titulo: 'Salud Auditiva',
        descripcion: 'Se busca ayudar a la gente con problemas auditivos, para mejorar su forma de salud.',
        imagen: null,
        imagenes: [],
    },
    {
        id: 4,
        slug: 'banco-de-alimento',
        titulo: 'Banco de Alimento',
        descripcion: 'Se busca ayudar a la gente con problemas auditivos, para mejorar su forma de salud.',
        imagen: null,
        imagenes: [],
    },
    {
        id: 5,
        slug: 'liconsa',
        titulo: 'Liconsa',
        descripcion: 'Se busca ayudar a la gente con problemas auditivos, para mejorar su forma de salud.',
        imagen: null,
        imagenes: [],
    },
];

const SeccionesContext = createContext(null);

export function SeccionesProvider({ children }) {
    const [secciones, setSecciones] = useState(seccionesIniciales);

    // El admin llama a esto para agregar una nueva sección
    const agregarSeccion = (nuevaSeccion) => {
        const slug = nuevaSeccion.titulo
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')   // quita acentos
            .replace(/\s+/g, '-')               // espacios → guiones
            .replace(/[^a-z0-9-]/g, '');        // elimina caracteres especiales

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
    const obtenerPorSlug = (slug) => secciones.find((s) => s.slug === slug) ?? null;

    return (
        <SeccionesContext.Provider value={{ secciones, agregarSeccion, agregarImagenes, obtenerPorSlug }}>
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