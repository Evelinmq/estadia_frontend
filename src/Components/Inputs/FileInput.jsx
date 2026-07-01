import '../Estilos.css'
import { forwardRef, useState, useEffect } from 'react';

const FileInput = forwardRef(({ label, error, previewImage, id = "file-upload", accept = "image/*,video/*", style, ...props }, ref) => {
    const [esVideo, setEsVideo] = useState(false);

    const getImageSrc = (preview) => {
        if (!preview) return null;
        if (preview.startsWith('blob:') || preview.startsWith('http')) return preview;
        return `data:image/jpeg;base64,${preview}`;
    };

    useEffect(() => {
        const src = getImageSrc(previewImage);
        if (!src) {
            setEsVideo(false);
            return;
        }

        if (src.startsWith('data:') && src.includes('video')) {
            setEsVideo(true);
            return;
        }

        setEsVideo(false);
    }, [previewImage]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {label && <label className="label">{label}</label>}

            <label htmlFor={id} style={{ cursor: 'pointer', width: '100%' }}>
                <div
                    className="modal-input"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        aspectRatio: '16 / 9',
                        minHeight: '140px',
                        borderStyle: previewImage ? 'solid' : 'dashed',
                        borderColor: error ? '#ef4444' : '#d1d5db',
                        overflow: 'hidden',
                        padding: '0',
                        backgroundColor: previewImage ? 'transparent' : '#f9fafb',
                        boxSizing: 'border-box',
                        ...style
                    }}
                >
                    {previewImage ? (
                        esVideo ? (
                            /* Vista previa para Video (Modo editar de la API o nuevo archivo cargado) */
                            <video
                                src={getImageSrc(previewImage)}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                muted
                                loop
                                autoPlay
                                playsInline
                            />
                        ) : (
                            /* Vista previa para Imagen */
                            <img
                                src={getImageSrc(previewImage)}
                                alt="Vista previa"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={() => {
                                    // Si metemos un video (sea Blob local o URL remota) y el <img> falla, activamos el reproductor
                                    setEsVideo(true);
                                }}
                            />
                        )
                    ) : (
                        <div style={{ textAlign: 'center', color: '#878787', padding: '10px' }}>
                            <span style={{ fontSize: '28px', lineHeight: '1', display: 'block', marginBottom: '4px' }}>+</span>
                            <p style={{ margin: '0', fontSize: '14px' }}>Añadir imagen o video</p>
                        </div>
                    )}
                </div>
            </label>

            {/* Input nativo oculto */}
            <input
                id={id}
                ref={ref}
                type="file"
                accept={accept}
                style={{ display: 'none' }}
                {...props}
            />

            {error && <span className="error" style={{ color: '#ef4444', fontSize: '12px' }}>{error.message}</span>}
        </div>
    );
});

FileInput.displayName = 'FileInput';

export default FileInput;