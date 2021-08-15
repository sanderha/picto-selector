import { useState, useEffect } from 'react';
import { CARD_TITLE_ABOVE } from '../../misc/constants';
import { cardTitleFieldValues } from "../../misc/defaults";


export default function CardSettings({ card, submitSettings, closeFunc }) {
    const [title, setTitle] = useState(card.title || '');
    const [titlePos, setTitlePos] = useState(card.titlePosition || CARD_TITLE_ABOVE);

    useEffect(() => {
        submitSettings({title, titlePosition: titlePos});
    }, [title, titlePos]);

    return (
        <div className="card-settings">
            <button onClick={closeFunc}>(close)</button>
            <h2>Card settings</h2>
            <div className="form-group">
                <label htmlFor="card-title">Card title</label>
                <input type="text" className="form-control" id="card-title" placeholder="Enter card title" value={title} onChange={e => setTitle(e.target.value)} />
                <label htmlFor="card-title-pos">Card title position</label>
                <select type="text" className="form-control" id="card-title-pos" value={titlePos} onChange={e => setTitlePos(+e.target.value)}>
                    {cardTitleFieldValues.map((v, i) => <option key={i} value={v.value}>{v.label}</option>)}
                </select>
            </div>
        </div>
    );
}