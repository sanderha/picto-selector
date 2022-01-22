import { useState } from 'react';
import { CARD_BORDER_COLOR_DEFAULT, CARD_TITLE_ABOVE } from '../../misc/constants';
import { cardBorderFieldValues, cardTitleFieldValues, cardBorderColorFieldValues } from "../../misc/defaults";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-regular-svg-icons'
import ColorInputField from '../../components/ColorInputField';

export default function CardSettings({ card, submitSettings, closeFunc }) {
    const [title, setTitle] = useState(card.title || '');
    const [titlePos, setTitlePos] = useState(card.titlePosition || CARD_TITLE_ABOVE);
    const [border, setBorder] = useState(card.border || 0);
    const [borderColor, setBorderColor] = useState(card.borderColor || CARD_BORDER_COLOR_DEFAULT);
    const handleSave = () => submitSettings({ title, titlePosition: titlePos, border, borderColor });

    return (
        <div className="card-settings">
            <div className="card-settings__close">
                <button className="clean-btn" onClick={closeFunc}>
                    <FontAwesomeIcon icon={faWindowClose} />
                </button>
            </div>
            <h2>Card settings</h2>
            <div className="row form-group mb-3">
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
            <div className="form-group mb-3">
                <label htmlFor="card-border">Border</label>
                <select type="text" className="form-control" id="card-border" value={border} onChange={e => setBorder(+e.target.value)}>
                    {cardBorderFieldValues.map((v, i) => <option key={i} value={v.value}>{v.label}</option>)}
                </select>
            </div>
            <div className="form-group mb-3">
                <label>Border color</label>
                <div className="row">
                    {cardBorderColorFieldValues.map((c, i) => <div key={i} className="col col-auto"><ColorInputField onClick={()=> setBorderColor(c)} color={c} selected={borderColor === c}/></div>)}
                </div>
            </div>
    
            <div className="row col">
                <button onClick={handleSave} className="btn btn-success">Save</button>
            </div>
        </div>
    );
}