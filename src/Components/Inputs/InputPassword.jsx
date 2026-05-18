import './Password.css';

export function InputPassword({ value, onChange, onKeyDown, inputRef, disabled }) {
    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="input-password"
                placeholder="0"
                disabled={disabled}
                min="0"
                max="9"
            />
        </div>
    );
}