import Card from 'react-bootstrap/Card'
import CardImg from 'react-bootstrap/CardImg'

export default function ReadOnlyDocCard({ card, isFloating }) {

    return <Card body className={`doc-card doc-card--read-only doc-card--small text-center ${isFloating ? "doc-card--floating" : ""}`} title={card.name}>
        <CardImg width="100%" src={card.img} alt={card.name} loading="lazy"/>
    </Card>
}