export default function HeaderProgramas({ titulo = "Emprende tu negocio" }) {

    // Con API
    //<HeaderProgramas titulo={programa.titulo} />

    // Con Context
    //<HeaderProgramas titulo={programaContext.titulo} />


    return (
        <section style={styles.section}>
            <p style={styles.label}>{titulo}</p>

            <div style={styles.second}>
                <p>Herramientas de alto valor para impulsar tu bienestar y crecimiento a <strong>bajo costo</strong></p>
            </div>

            <div style={styles.wrapper}>
                <div style={styles.card}>
                    <p style={styles.contact}>¡Si estas interesado contactate con nosotros o registrate!</p>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        width: "100%",
        padding: "2rem 1rem",
        boxSizing: "border-box",
    },
    label: {
        textAlign: "center",
        fontSize: "clamp(2rem, 5vw, 3rem)",
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: "#4A0042",
        marginBottom: "0 0 1.25rem 0",
        fontFamily: "'Poppins', sans-serif",
    },
    second: {
        color: "#400339",
        display: "flex",
        justifyContent: "center",
        padding: "8px 0",
        margin: "0 auto 2rem",
        maxWidth: "800px",
        textAlign: "center",
    },
    secondText: {
        fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
        lineHeight: 1.4,
        margin: 0,
    },
    wrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
    },
    card: {
        minHeight: "100px",
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "#D8CBD6",
        borderRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        boxSizing: "border-box",
    },
contact: {
    fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
        fontWeight: 750,
        color: "#4A0042",
        textAlign: "center",
        margin: 0,
        lineHeight: 1.3,
    },
};