import Card from 'react-bootstrap/Card'
import CardImg from 'react-bootstrap/CardImg'

export default function ReadOnlyDocCard({ card, isFloating }) {

    return <Card body className={`bg-primary doc-card doc-card--read-only doc-card--small text-center ${isFloating ? "doc-card--floating" : ""}`}>
        <CardImg width="100%" src={card.img} alt={card.img} />
    </Card>
}