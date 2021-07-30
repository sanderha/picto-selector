export default function AddRowBtn({ addRowMethod }) {
    return (
        <button className="add-row-btn btn btn-primary" onClick={addRowMethod}>
            Add row
        </button>
    )
}