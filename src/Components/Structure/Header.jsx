import '../Structure/Header.css';
import { SearchInput } from '../Inputs/SearchInput.jsx';
import { DatePicker } from '../Inputs/DatePicker.jsx';
import { ExportAllButton } from '../Buttons/ExportarAllButton.jsx'
import { AddButton } from '../Buttons/AddButton.jsx';
import LogoSrc from '../../Img/logo.png';

const Logo = () => (
    <img
        src={LogoSrc}
        alt="Juventud x Temixco"
        className="header-logo"
    />
)

// Beneficiarios y Afiliados
export function HeaderConFiltros({ searchPlaceholder = "Buscar beneficiario", onExport }) {
    return (
        <header className="header">
            <Logo />
            <div className="header-controls">
                <SearchInput placeholder={searchPlaceholder} />
                <DatePicker label="Fecha Inicial" />
                <DatePicker label="Fecha Final" />
            </div>
            <ExportAllButton onClick={onExport} />
        </header>
    )
}

// Administración, Programas y Secciones
export function HeaderConAgregar({ searchPlaceholder = "Buscar", onAdd }) {
    return (
        <header className="header">
            <Logo />
            <div className="header-controls">
                <SearchInput placeholder={searchPlaceholder} />
            </div>
            <AddButton onClick={onAdd} />
        </header>
    )
}

// Alianzas
export function HeaderSolo() {
    return (
        <header className="header header--solo">
            <Logo />
        </header>
    )
}

// Componente unificado
const PLACEHOLDERS = {
    beneficiarios: "Buscar beneficiario",
    afiliados:     "Buscar afiliado",
    administracion:"Buscar administrador",
    programas:     "Buscar programa",
    secciones:     "Buscar sección",
    alianzas: "Buscar alianza"
}

const CON_FILTROS = ["beneficiarios", "afiliados"]
const CON_AGREGAR = ["administracion", "programas", "secciones", "alianzas"]

export function Header({ seccion = "beneficiarios", onExport, onAdd }) {
    const key = seccion.toLowerCase()
    const placeholder = PLACEHOLDERS[key] ?? `Buscar ${seccion}`

    if (CON_FILTROS.includes(key))
        return <HeaderConFiltros searchPlaceholder={placeholder} onExport={onExport} />

    if (CON_AGREGAR.includes(key))
        return <HeaderConAgregar searchPlaceholder={placeholder} onAdd={onAdd} />

    return <HeaderSolo />
}