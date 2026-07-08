import {useEffect, useState} from "react";

export default function TarjetaImagen({ imagen, titulo }) {
    const [esVideo, setEsVideo] = useState(false);

    useEffect(() => {
        setEsVideo(false);
    }, [imagen.url]);

    return (
        <div style={imgStyles.card}>
            <div style={imgStyles.imgWrapper}>
                {esVideo ? (
                    <video
                        src={imagen.url}
                        style={imgStyles.img}
                        controls={true}
                        muted
                        loop
                        playsInline
                        autoPlay
                    />
                ) : (
                    <>
                        <div
                            style={{
                                ...imgStyles.blurBackground,
                                backgroundImage: `url(${imagen.url})`,
                            }}
                        />
                        <img
                            src={imagen.url}
                            alt={imagen.descripcion ?? titulo}
                            style={imgStyles.img}
                            onError={() => {
                                setEsVideo(true);
                            }}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

const imgStyles = {
    card: {
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid #e0d0de',
        width: '100%',
        maxWidth: 380,
        flexShrink: 0,
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(74,0,66,0.08)',
    },
    imgWrapper: {
        position: 'relative',
        width: '100%',
        height: 300,
        overflow: 'hidden',
    },
    blurBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(10px)',
        transform: 'scale(1.15)',
        opacity: 0.7,
    },
    img: {
        position: 'relative',
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        display: 'block',
    },
};