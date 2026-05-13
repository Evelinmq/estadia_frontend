import { useState } from "react";
import "./Sidebar.css";

// Inline SVG icons matching the app's style (fallback if SVGs not loaded)
const icons = {
    Beneficiarios: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
        </svg>
    ),
    Afiliados: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    ),
    Administración: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    ),
    Programas: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.08 15.92 0 13.36 0c-1.3 0-2.51.52-3.36 1.36L9 2.36 7.99 1.35C7.14.51 5.93 0 4.64 0 2.08 0 0 2.08 0 4.64c0 .48.11.92.18 1.36H0v2h20V6zm-9.82 0C9.96 5.3 9.5 4.5 9.5 3.64 9.5 2.74 10.24 2 11.14 2c.45 0 .88.18 1.18.49L13 3.18l-.72.82H10.18zM4.64 2c.9 0 1.64.74 1.64 1.64 0 .86-.46 1.66-1.18 2.36H3.08C2.71 5.56 2.5 5.08 2.5 4.64 2.5 3.74 3.24 3 4.14 3L4.64 2zM2 8v12h8v-4h4v4h8V8H2zm6 8H4v-2h4v2zm0-4H4v-2h4v2zm6 0h-4v-2h4v2zm6 4h-4v-2h4v2zm0-4h-4v-2h4v2z"/>
        </svg>
    ),
    Secciones: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>
    ),
    Alianzas: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    ),
    Logout: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
        </svg>
    ),
};

const navItems = [
    { label: "Beneficiarios", icon: "Beneficiarios", svgFile: "Beneficiarios.svg" },
    { label: "Afiliados", icon: "Afiliados", svgFile: "Afiliados.svg" },
    { label: "Administración", icon: "Administración", svgFile: "Administracion.svg" },
    { label: "Programas", icon: "Programas", svgFile: "Programas.svg" },
    { label: "Secciones", icon: "Secciones", svgFile: "Secciones.svg" },
    { label: "Alianzas", icon: "Alianzas", svgFile: "Alianzas.svg" },
];

export default function Sidebar({ activePage, onNavigate }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [active, setActive] = useState(activePage || "Programas");

    const handleNav = (label) => {
        setActive(label);
        setMobileOpen(false);
        if (onNavigate) onNavigate(label);
    };

    return (
        <>
            {/* Mobile hamburger button */}
                <button
                    className="sidebar-hamburger"
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label="Abrir menú"
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* Overlay for mobile */}
                {mobileOpen && (
                    <div
                        className="sidebar-overlay"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                {/* Sidebar */}
                <aside className={`sidebar${mobileOpen ? " sidebar--open" : ""}`}>
                    {/* Navigation */}
                    <nav className="sidebar__nav">
                        {navItems.map(({ label, icon, svgFile }) => (
                            <button
                                key={label}
                                className={`sidebar__item${active === label ? " sidebar__item--active" : ""}`}
                                onClick={() => handleNav(label)}
                            >
              <span className="sidebar__icon">
                <img
                    src={`/src/assets/${svgFile}`}
                    alt={label}
                    width="28"
                    height="28"
                    onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "inline";
                    }}
                />
                <span style={{ display: "none" }}>{icons[icon]}</span>
              </span>
                                <span className="sidebar__label">{label}</span>
                            </button>
                        ))}
                    </nav>

                    {/* Divider */}
                    <div className="sidebar__divider" />

                    {/* Logout */}
                    <button
                        className="sidebar__item sidebar__item--logout"
                        onClick={() => handleNav("logout")}
                    >
          <span className="sidebar__icon">
            <img
                src="/src/assets/Logout.svg"
                alt="Cerrar Sesión"
                width="28"
                height="28"
                onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "inline";
                }}
            />
            <span style={{ display: "none" }}>{icons.Logout}</span>
          </span>
                        <span className="sidebar__label">Cerrar Sesión</span>
                    </button>
                </aside>
        </>
    );
}