import '../Estilos.css'
import { forwardRef } from 'react';

const FileInput = forwardRef(({ label, error, previewImage, id = "file-upload", accept = "image/*", style, ...props }, ref) => {

    const getImageSrc = (preview) => {
        if (!preview) return null;
        if (preview.startsWith('blob:') || preview.startsWith('http')) return preview;
        return `data:image/jpeg;base64,${preview}`;
    };

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
                        <img
                            src={getImageSrc(previewImage)}
                            alt="Vista previa"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <div style={{ textAlign: 'center', color: '#878787', padding: '10px' }}>
                            <span style={{ fontSize: '28px', lineHeight: '1', display: 'block', marginBottom: '4px' }}>+</span>
                            <p style={{ margin: '0', fontSize: '14px' }}>Añadir imagen</p>
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