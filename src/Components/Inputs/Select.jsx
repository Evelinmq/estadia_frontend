import '../Estilos.css'
import { forwardRef } from 'react';

const Select = forwardRef(({ label, error, children, style, ...props }, ref) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            {label && <label className="label">{label}</label>}

            <select
                ref={ref}
                className="modal-select"
                style={{
                    width: '100%',
                    borderColor: error ? '#ef4444' : '#d1d5db',
                    paddingRight: '30px',
                    ...style
                }}
                {...props}
            >
                {children}
            </select>

            {error && <span className="error" style={{ color: '#ef4444', fontSize: '12px' }}>{error.message}</span>}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;