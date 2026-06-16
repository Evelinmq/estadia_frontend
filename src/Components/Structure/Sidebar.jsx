import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {alertaCerrarSesion, alertaError, alertaExito, confirmarEliminar} from "../../Utils/alerts.js";
import {eliminarDatos} from "../../Utils/api.js";

const navItems = [
    { label: "Beneficiarios",  svgFile: "Beneficiarios.svg",   path: "/admin/beneficiarios"  },
    { label: "Afiliados",      svgFile: "Afiliados.svg",        path: "/admin/afiliados"      },
    { label: "Administración", svgFile: "Administracion.svg",   path: "/admin/administracion" },
    { label: "Programas",      svgFile: "Programas.svg",        path: "/admin/programas"      },
    { label: "Secciones",      svgFile: "Secciones.svg",        path: "/admin/secciones"      },
    { label: "Alianzas",       svgFile: "Alianzas.svg",         path: "/admin/alianzas"       },
    { label: "Objetivos",      svgFile: "Objetivos.svg",        path: "/admin/objetivos"      },
];

export default function Sidebar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();



    const handleLogout = async () => {
        const resultado = await alertaCerrarSesion();
        
        if (resultado.isConfirmed) {
            setMobileOpen(false);
            localStorage.clear();
            navigate("/", { replace: true });
        }
    };

    return (
        <>
            {/* Mobile hamburger */}
            <button
                className="sidebar-hamburger"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Abrir menú"
            >
                <span /><span /><span />
            </button>

            {/* Overlay */}
            {mobileOpen && (
                <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`sidebar${mobileOpen ? " sidebar--open" : ""}`}>
                <nav className="sidebar__nav">
                    {navItems.map(({ label, svgFile, path }) => (
                        <NavLink
                            key={label}
                            to={path}
                            className={({ isActive }) =>
                                `sidebar__item${isActive ? " sidebar__item--active" : ""}`
                            }
                            onClick={() => 
                                setMobileOpen(false)}
                        >
              <span className="sidebar__icon">
                <img
                    src={`/src/assets/${svgFile}`}
                    alt={label}
                    width="28"
                    height="28"
                />
              </span>
                            <span className="sidebar__label">{label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar__divider" />

                <button className="sidebar__item sidebar__item--logout" onClick={handleLogout}>
          <span className="sidebar__icon">
            <img src="/src/assets/Logout.svg" alt="Cerrar Sesión" width="28" height="28" />
          </span>
                    <span className="sidebar__label">Cerrar Sesión</span>
                </button>
            </aside>
        </>
    );
}