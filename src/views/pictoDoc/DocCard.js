import Card from 'react-bootstrap/Card'
import CardImg from 'react-bootstrap/CardImg'
import { CARD_TITLE_ABOVE, CARD_TITLE_BELOW } from '../../misc/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

export default function DocCard({ card, deleteMethod, editSettings, setEditSettings }) {

    const handleSettingsClick = () => {
        // close again when clicking button on the current active card
        // otherwise stay open but with new card id
        if (editSettings.cardId === card.id) {
            setEditSettings({ visible: false, cardId: null });
            return;
        }
        setEditSettings({ visible: true, cardId: card.id });
    }

    return <Card body className="doc-card m-2 text-center">
        {card.titlePosition === CARD_TITLE_ABOVE && card?.title}
        <div className="doc-card__image">
            <button className="clean-btn doc-card__delete" onClick={() => deleteMethod(card)} title="delete">
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
            {editSettings.cardId === null ? <button className="clean-btn doc-card__settings-btn" onClick={handleSettingsClick} title="edit">
                <FontAwesomeIcon icon={faEdit} />
            </button> : null}
            <CardImg width="100%" src={card.img} alt={card.name} />
        </div>

        {card.titlePosition === CARD_TITLE_BELOW && card?.title}
    </Card>
}