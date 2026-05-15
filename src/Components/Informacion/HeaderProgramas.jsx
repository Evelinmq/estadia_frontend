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
    wrapper: {
        position: "relative",
        display: "flex",
        alignItems: "center",
    },
    second: {
        color: "#400339",
        fontSize: 24,
        display: "flex",
        overflow: "hidden",
        flex: 1,
        padding: "8px 0",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "50px",
        marginRight: "50px",
        flexShrink: 0,
        textAlign: "center",
    },
    card: {
        height: 138,
        flexShrink: 0,
        backgroundColor: "#D8CBD6",
        borderRadius: 12,
        display: "flex",
        overflow: "hidden",
        flex: 1,
        padding: "8px 0",
        alignItems: "center",
        justifyContent: "center",
        margin: "50px",
    },
    contact: {
        fontSize: 32,
        fontWeight: 750,
        color: "#4A0042",
        alignItems: "center",
        textAlign: "center",
        padding: "8px 0",
        margin: "25px",
        display: "flex",
        overflow: "hidden",
    },
};