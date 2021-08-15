import Card from 'react-bootstrap/Card'
import CardImg from 'react-bootstrap/CardImg'

export default function DocCard({ card, deleteMethod, editSettings, setEditSettings }) {

    const handleSettingsClick = () => {
        // close again when clicking button on the current active card
        // otherwise stay open but with new card id
        if(editSettings.cardId === card.id){
            setEditSettings({visible: !editSettings.visible, cardId: card.id});
            return;
        }
        setEditSettings({visible: true, cardId: card.id});
    }

    return <Card body className="doc-card m-2 text-center">
        {card.title ? card.title : null}
        {/**<a onClick={handleSettingsClick}>toggle settings</a>**/}
        <CardImg width="100%" src={card.img} alt={card.name} />
        <div className="doc-card__delete">
            <button className="btn btn-sm btn-danger mt-2 " onClick={() => deleteMethod(card)}>
                Delete
            </button>
        </div>
    </Card>
}