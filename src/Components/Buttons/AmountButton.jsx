import { useState } from 'react';
import './AmountButton.css';

const AMOUNTS = [100, 200, 300, 400];

export function AmountButton({ onChange }) {
    const [selected, setSelected] = useState(null);
    const [customMode, setCustomMode] = useState(false);
    const [customValue, setCustomValue] = useState('');
    const [error, setError] = useState('');

    const handleFixed = (amount) => {
        if (customMode && parseFloat(customValue) > 0) {
            setError('Ya ingresaste un monto personalizado. Por favor borra el campo para seleccionar una cantidad.');
            return;
        }
        setError('');
        setSelected(amount);
        setCustomMode(false);
        setCustomValue('');
        if (onChange) onChange(amount);
    };

    const handleOtro = () => {
        setSelected('otro');
        setCustomMode(true);
        setError('');
        if (onChange) onChange(null);
    };

    const handleCustomChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');

        setCustomValue(value);

        if (onChange) {
            onChange(value ? parseInt(value, 10) : null);
        }
    };

    return (
        <div className="amount-container">
            <label className="amount-label">Monto:</label>
            <div className="amount-grid">
                {AMOUNTS.map((amount) => (
                    <button
                        key={amount}
                        type="button"
                        className={`amount-btn${selected === amount ? ' amount-btn--selected' : ''}`}
                        onClick={() => handleFixed(amount)}
                    >
                        ${amount}
                    </button>
                ))}
                <button
                    type="button"
                    className={`amount-btn${selected === 'otro' ? ' amount-btn--selected' : ''}`}
                    onClick={handleOtro}
                >
                    $ Otro
                </button>
            </div>

            {customMode && (
                <div className="amount-custom-wrap">
                    <input
                        className="amount-custom-input"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="Ingresa un monto"
                        value={customValue}
                        onChange={handleCustomChange}
                    />
                </div>
            )}

            {error && <p className="amount-error">{error}</p>}
        </div>
    );
}