import Card from 'react-bootstrap/Card'
import CardImg from 'react-bootstrap/CardImg'

export default function ReadOnlyDocCard({ card }) {

    return <Card body className="bg-primary doc-card doc-card--read-only doc-card--small text-center">
        <CardImg width="100%" src={`/picto/${card.img}`} alt={card.img} />
    </Card>
}