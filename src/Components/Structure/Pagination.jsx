import "./Pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        // CORREGIDO: Debe ser menor que el total de páginas
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    // páginas a mostrar con "..." cuando hay muchas
    const getPages = () => {
        const pages = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push("...");
            for (
                let i = Math.max(2, currentPage - 1);
                i <= Math.min(totalPages - 1, currentPage + 1);
                i++
            ) {
                pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="pagination">
            {/* Botón anterior */}
            <button
                className={`pagination__btn pagination__arrow ${currentPage === 1 ? "pagination__btn--disabled" : ""}`}
                onClick={handlePrev}
                disabled={currentPage === 1}
                aria-label="Página anterior"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Números */}
            {getPages().map((page, index) =>
                page === "..." ? (
                    <span key={`dots-${index}`} className="pagination__dots">
                        …
                    </span>
                ) : (
                    <button
                        key={page}
                        className={`pagination__btn ${
                            currentPage === page ? "pagination__btn--active" : ""
                        }`}
                        onClick={() => onPageChange(page)}
                        aria-label={`Página ${page}`}
                        aria-current={currentPage === page ? "page" : undefined}
                    >
                        {page}
                    </button>
                )
            )}

            {/* Botón siguiente */}
            {/* CORREGIDO: Ahora evalúa totalPages, ejecuta handleNext y usa clases correctas */}
            <button
                className={`pagination__btn pagination__arrow ${currentPage === totalPages ? "pagination__btn--disabled" : ""}`}
                onClick={handleNext}
                disabled={currentPage === totalPages}
                aria-label="Página siguiente"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    );
}