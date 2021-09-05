import { useState } from 'react';
import { CARD_TITLE_ABOVE } from '../../misc/constants';
import { cardBorderFieldValues, cardTitleFieldValues } from "../../misc/defaults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'

export default function CardSettings({ card, submitSettings, closeFunc }) {
    const [title, setTitle] = useState(card.title || '');
    const [titlePos, setTitlePos] = useState(card.titlePosition || CARD_TITLE_ABOVE);
    const [border, setBorder] = useState(card.border || 0);
    const handleSave = () => submitSettings({ title, titlePosition: titlePos, border });

    return (
        <div className="card-settings">
            <div className="card-settings__close">
                <button className="clean-btn" onClick={closeFunc}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
            <h2>Card settings</h2>
            <div className="row form-group">
                <div className="col col-7">
                    <label htmlFor="card-title">Title</label>
                    <input type="text" className="form-control" id="card-title" placeholder="Enter card title" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="col col-5">
                    <label htmlFor="card-title-pos">Title position</label>
                    <select type="text" className="form-control" id="card-title-pos" value={titlePos} onChange={e => setTitlePos(+e.target.value)}>
                        {cardTitleFieldValues.map((v, i) => <option key={i} value={v.value}>{v.label}</option>)}
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="card-border">Border</label>
                <select type="text" className="form-control" id="card-border" value={border} onChange={e => setBorder(+e.target.value)}>
                    {cardBorderFieldValues.map((v, i) => <option key={i} value={v.value}>{v.label}</option>)}
                </select>
            </div>
            <div className="row col text-center">
                <button onClick={handleSave} className="btn btn-success">Save</button>
            </div>
        </div>
    );
}