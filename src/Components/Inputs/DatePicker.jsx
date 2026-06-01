import { useRef } from "react";
import '../Inputs/DatePicker.css';

const CalendarIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

export function DatePicker({ label = "Fecha", onChange, value }) {
    const inputRef = useRef(null);

    const openPicker = () => {
        if (inputRef.current) {
            inputRef.current.showPicker();
        }
    };

    return (
        <div className="date-wrapper" onClick={openPicker}>
            <span className="date-label">{label}</span>

           <span className="date-value">
                {value
                    ? new Date(value + "T00:00:00").toLocaleDateString("es-MX")
                    : ""}
            </span>

            <span className="date-icon">
                <CalendarIcon />
            </span>

            <input
                ref={inputRef}
                type="date"
                className="date-input"
                value={value || ""}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}