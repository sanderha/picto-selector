
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import DocCard from './DocCard'
import useRevealOnHover from '../../hooks/useRevealOnHover';


export default function DocRow({ deleteMethod, deleteCardMethod, cards, row }) {
    const { styleObj, handleHover, handleHoverLeave } = useRevealOnHover();

    const hasCards = () => row.cardsIds.length;

    const renderCards = () => {
        return row.cardsIds.map((cardId, i) => {
            const card = cards.find(card => card.id === cardId);
            if (!card) {
                return null;
            }

            return <Draggable key={cardId} draggableId={'card-' + card.id} index={i}>
                {(p) => {
                    return <Col
                        sm="auto"
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        ref={p.innerRef}
                        className="doc-row-col flex-shrink-1"
                    >
                        <DocCard deleteMethod={deleteCardMethod} card={card} />
                    </Col>
                }}
            </Draggable>
        })
    }

    return (
        <Row>
            <Col>

                <Droppable droppableId={`row-${row.id}`} direction="horizontal">
                    {(provided, snapshot) => {
                        return (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`doc-row card mb-2${snapshot.isDraggingOver ? " doc-row--is-dragged-over" : ""}${!hasCards() ? " doc-row--is-empty" : ""}`}
                                onMouseLeave={handleHoverLeave}
                                onMouseEnter={handleHover}
                            >
                                <Row className={`no-gutters flex-nowrap`}>
                                    {renderCards()}
                                    {provided.placeholder}
                                    {!hasCards() && <div className="doc-row__empty-text">Drag pictures here!</div>}
                                </Row>
                                <Row>
                                    <Col className="text-right">
                                        <button onClick={() => deleteMethod(row.id)} className="btn-danger btn btn-sm doc-row-delete" style={styleObj}>
                                            Delete row
                                        </button>
                                    </Col>
                                </Row>
                            </div>
                        )
                    }}
                </Droppable>
            </Col>
        </Row>
    );
}