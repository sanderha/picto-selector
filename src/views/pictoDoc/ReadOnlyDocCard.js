import Card from 'react-bootstrap/Card'
import DocCardTitle from './DocCard/DocCardTitle'



export default function ReadOnlyDocCard({ card, isFloating }) {

    return <Card body className={`doc-card doc-card--read-only text-center ${isFloating ? "doc-card--floating" : ""}`} title={card.name}>
        <img className="card-image" width="120" src={card.img} alt={card.name} />
        <DocCardTitle>{card.name}</DocCardTitle>
    </Card>
}