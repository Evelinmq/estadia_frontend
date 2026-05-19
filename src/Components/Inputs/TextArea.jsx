import '../Estilos.css'
import { forwardRef } from 'react';

const TextArea = forwardRef(({ label, error, style, ...props }, ref) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {label && <label className="label">{label}</label>}

            <textarea
                ref={ref}
                placeholder={label}
                className="modal-input"
                style={{
                    paddingTop: '14px',
                    paddingBottom: '14px',
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    resize: 'none',
                    width: '100%',
                    minHeight: '120px',
                    lineHeight: '1.5',
                    borderColor: error ? '#ef4444' : '#d1d5db',
                    boxSizing: 'border-box',
                    ...style
                }}
                {...props}
            />

            {error && <span className="error" style={{ color: '#ef4444', fontSize: '12px' }}>{error.message}</span>}
        </div>
    );
});

TextArea.displayName = 'TextArea';

export default TextArea;