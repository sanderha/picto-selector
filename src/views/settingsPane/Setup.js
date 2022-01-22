import { cardSizeFieldValues, rowSizeFieldValues } from "../../misc/defaults";
import { useState } from "react";

export default function Setup({ settings, setSettings }) {
    const [cardSizeVal, setCardSizeVal] = useState(settings.cardSize);
    const [rowSizeVal, setRowSizeVal] = useState(settings.rowSize);

    const handleCardSizeChange = e => {
        setCardSizeVal(e.target.value);
        setSettings({ ...settings, cardSize: e.target.value });
    };

    const handleRowSizeChange = e => {
        setRowSizeVal(e.target.value);
        setSettings({ ...settings, rowSize: e.target.value });
    };

    return (
        <div className="setup">
            <div className="form-group mb-2">
                <label htmlFor="title">Document title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" value={settings.title || ''} onChange={e => setSettings({ ...settings, title: e.target.value })} />
                <small id="titleHelp" className="form-text text-muted">This title will appear at the top of the document</small>
            </div>
            <div className="form-group mb-2" >
                <label htmlFor="title">Card size</label>
                <br />
                {cardSizeFieldValues.map((size, i) => (
                    <div className="form-check form-check-inline" key={i}>
                        <input className="form-check-input" name="card-size-field" id={`card-size-field-${i}`} type="radio" value={size.value} checked={size.value === cardSizeVal} onChange={handleCardSizeChange} />
                        <label className="form-check-label" htmlFor={`card-size-field-${i}`}>{size.label}</label>
                    </div>
                ))}
            </div>
            <div className="form-group mb-2" >
                <label htmlFor="title">Row spacing</label>
                <br />
                {rowSizeFieldValues.map((size, i) => (
                    <div className="form-check form-check-inline" key={i}>
                        <input className="form-check-input" name="row-size-field" id={`row-size-field-${i}`} type="radio" value={size.value} checked={size.value === rowSizeVal} onChange={handleRowSizeChange} />
                        <label className="form-check-label" htmlFor={`row-size-field-${i}`}>{size.label}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}