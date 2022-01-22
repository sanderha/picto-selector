export default function ColorInputField({ selected, color, onClick }) {
    return <div onClick={onClick} className={`color-input-field ${selected ? "color-input-field--selected" : null}`} style={{backgroundColor: color}}></div>;
}