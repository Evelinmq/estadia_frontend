import EditButton from "../Buttons/EditButton.jsx";
import DeleteButton from "../Buttons/DeleteButton.jsx";
import "./Datatable.css";

export default function Datatable({ columns, rows, onEdit, onDelete }) {
    return (
        <div className="datatable-wrapper">
            <table className="datatable">
                <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={col.key}>{col.label}</th>
                    ))}
                    <th className="datatable__actions-header"></th>
                </tr>
                </thead>
                <tbody>
                {rows.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length + 1} className="datatable__empty">
                            Sin registros
                        </td>
                    </tr>
                ) : (
                    rows.map((row, index) => (
                        <tr key={index} className="datatable__row">
                            {columns.map((col) => (
                                <td key={col.key} data-label={col.label}>
                                    {row[col.key]}
                                </td>
                            ))}
                            <td className="datatable__actions">
                                {onEdit && <EditButton onClick={() => onEdit(row, index)} />}
                                {onDelete && <DeleteButton onClick={() => onDelete(row, index)} />}
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}