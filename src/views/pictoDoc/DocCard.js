import Card from 'react-bootstrap/Card'
import CardImg from 'react-bootstrap/CardImg'

export default function DocCard({ card, deleteMethod }) {
    return <Card body className="doc-card m-2 text-center">
        <CardImg width="100%" src={card.img} alt={card.img} />
        <div className="doc-card__delete">
            <button className="btn btn-sm btn-danger mt-2 " onClick={() => deleteMethod(card)}>
                Delete
            </button>
        </div>
    </Card>
}