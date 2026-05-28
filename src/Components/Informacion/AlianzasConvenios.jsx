import { useState, useEffect, useRef, useCallback } from "react";
import { obtenerDatos } from "../../Utils/api";


const GAP = 24;

function useVisible() {
    const [visible, setVisible] = useState(
        typeof window !== "undefined" && window.innerWidth <= 600 ? 2 : 5
    );

    useEffect(() => {
        const onResize = () =>
            setVisible(window.innerWidth <= 600 ? 2 : 5);

        window.addEventListener("resize", onResize);

        return () => window.removeEventListener("resize", onResize);
    }, []);

    return visible;
}


export default function AlianzasConvenios() {
    const [allies, setAllies] = useState([]);
    const visible = useVisible();
    const wrapperRef = useRef(null);
    const [cardW, setCardW] = useState(160);
    const [current, setCurrent] = useState(0);
    const autoRef = useRef(null);

    const maxIndex = Math.max(0, allies.length - visible);

    const calcCardW = useCallback(() => {
        if (!wrapperRef.current) return;
        const w = wrapperRef.current.offsetWidth;
        setCardW(Math.floor((w - GAP * (visible - 1)) / visible));
    }, [visible]);

    useEffect(() => {
        calcCardW();
        window.addEventListener("resize", calcCardW);
        return () => window.removeEventListener("resize", calcCardW);
    }, [calcCardW]);

    const clampedCurrent = Math.min(current, maxIndex);

    const goNext = useCallback(() => {
        setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, [maxIndex]);

    const goPrev = useCallback(() => {
        setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
    }, [maxIndex]);

    const resetAuto = useCallback(() => {
        clearInterval(autoRef.current);
        if (allies.length > visible) {
            autoRef.current = setInterval(goNext, 3000);
        }
    }, [allies.length, visible, goNext]);

    useEffect(() => {
        resetAuto();
        return () => clearInterval(autoRef.current);
    }, [resetAuto]);

    const handlePrev = () => { goPrev(); resetAuto(); };
    const handleNext = () => { goNext(); resetAuto(); };

    const step = cardW + GAP;
    const totalDots = maxIndex + 1;

    useEffect(() => {

    const cargarAlianzas = async () => {

        try {

            const data = await obtenerDatos('/api/Alianza');

            const formateadas = data.map((item) => ({
                id: item.id,
                name: item.name,
                src: item.image
                    ? `data:image/jpeg;base64,${item.image}`
                    : null
            }));

            setAllies(formateadas);

        } catch (error) {
            console.error("Error al cargar alianzas:", error);
        }
    };

    cargarAlianzas();

}, []);

    return (
        <section style={styles.section}>
            <p style={styles.label}>Alianzas y convenios</p>

            <div style={styles.carouselWrapper} ref={wrapperRef}>
                <div style={styles.fadeLeft} />
                <div style={styles.fadeRight} />

                <button
                    onClick={handlePrev}
                    aria-label="Anterior"
                    style={{ ...styles.btn, ...styles.btnPrev, opacity: clampedCurrent === 0 ? 0.35 : 1 }}
                >
                    <ChevronIcon direction="left" />
                </button>

                <div style={styles.trackOuter}>
                    <div
                        style={{
                            ...styles.track,
                            gap: GAP,
                            transform: `translateX(-${clampedCurrent * step}px)`,
                        }}
                    >
                        {allies.map((ally) => (
                            <div
                                key={ally.id}
                                style={{ ...styles.card, width: cardW, minWidth: cardW }}
                            >
                                {ally.src ? (
                                    <img
                                        src={ally.src}
                                        alt={ally.name}
                                        style={styles.img}
                                    />
                                ) : (
                                    <span style={styles.placeholder}>{ally.name}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    aria-label="Siguiente"
                    style={{ ...styles.btn, ...styles.btnNext, opacity: clampedCurrent >= maxIndex ? 0.35 : 1 }}
                >
                    <ChevronIcon direction="right" />
                </button>
            </div>

            {totalDots > 1 && (
                <div style={styles.dots}>
                    {Array.from({ length: totalDots }).map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Ir a página ${i + 1}`}
                            onClick={() => { setCurrent(i); resetAuto(); }}
                            style={{
                                ...styles.dot,
                                background: i === clampedCurrent ? "#888780" : "#D3D1C7",
                                transform: i === clampedCurrent ? "scale(1.35)" : "scale(1)",
                            }}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function ChevronIcon({ direction }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {direction === "left"
                ? <polyline points="15 18 9 12 15 6" />
                : <polyline points="9 18 15 12 9 6" />}
        </svg>
    );
}

const styles = {
    section: {
        width: "100%",
        padding: "2rem 0 2.5rem",
    },
    label: {
        textAlign: "center",
        fontSize: 48,
        fontWeight: 700,
        letterSpacing: "0.08em",
        color: "#4A0042",
        marginBottom: "1.25rem",
    },
    carouselWrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    trackOuter: {
        overflow: "hidden",
        flex: 1,
        padding: "8px 0",
    },
    track: {
        display: "flex",
        alignItems: "center",
        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
    },
    card: {
        height: 140,
        flexShrink: 0,
        background: "#fff",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    img: {
        maxWidth: "80%",
        maxHeight: "75%",
        objectFit: "contain",
    },
    placeholder: {
        fontSize: 13,
        fontWeight: 500,
        color: "#888780",
    },
    fadeLeft: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 48,
        background: "linear-gradient(90deg, #fff 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 2,
    },
    fadeRight: {
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        width: 48,
        background: "linear-gradient(270deg, #fff 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 2,
    },
    btn: {
        flexShrink: 0,
        background: "#FFF7FE",
        border: "0.5px solid #4A0042",
        borderRadius: "50%",
        width: 34,
        height: 34,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "#4A0042",
        zIndex: 3,
        transition: "background 0.15s, opacity 0.2s",
    },
    btnPrev: { marginRight: 8 },
    btnNext: { marginLeft: 8 },
    dots: {
        display: "flex",
        justifyContent: "center",
        gap: 6,
        marginTop: "1rem",
        color: "#8E0073",
        background: "8E0073"
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: "50%",
        border: "none",
        cursor: "pointer",
        padding: 0,
        color: "#8E0073",
        transition: "background 0.2s, transform 0.2s",
    },
};