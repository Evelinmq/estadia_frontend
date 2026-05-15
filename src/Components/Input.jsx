import './Estilos.css'

export default function Input({ label, type, value, onChange }) {

    return(
        <div>
            <label className="label">{label}</label>
            <div/>
            <input type={type} value={value} onChange={onChange} className="input" placeholder={label} />
        </div>
    )

}
