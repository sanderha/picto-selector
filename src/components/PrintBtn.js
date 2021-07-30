export default function PrintBtn() {

    const printDoc = () => {
        window.print()
    }

    return (
        <button className="btn btn-secondary" onClick={printDoc}>
            Print!
        </button>
    )
}