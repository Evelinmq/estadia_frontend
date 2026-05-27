import '../Inputs/SearchInput.css';

const SearchIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
)

export function SearchInput({ placeholder = "Buscar", onSearch }) {
    const handleChange = (e) => {
        onSearch?.(e.target.value);
    }
    return (
        <div className="search-wrapper">
      <span className="search-icon">
        <SearchIcon />
      </span>
            <input
                type="text"
                placeholder={placeholder}
                className="search-input"
                onChange={handleChange}
            />
        </div>
    )
}