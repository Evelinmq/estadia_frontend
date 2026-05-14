import './Password.css'

export function InputPassword({ value, onChange }) {

    return(
        <div>
            <input type="number" value={value} onChange={onChange} className="input-password" placeholder={"0"} />
        </div>
    )

}