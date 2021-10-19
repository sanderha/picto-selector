import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import DocCard from './DocCard'
import useRevealOnHover from '../../hooks/useRevealOnHover';


export default function DocRow({ deleteMethod, deleteCardMethod, cards, row, editCardSettings, setEditCardSettings }) {
    const { handleHover, handleHoverLeave } = useRevealOnHover();


    const renderCards = () => {
        return cards.map((card, i) => {
            return <Draggable key={i} draggableId={'card-' + card.id} index={i}>
                {(p) => {
                    return <Col
                        sm="auto"
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        ref={p.innerRef}
                        className="doc-row-col flex-shrink-1"
                    >
                        <DocCard deleteMethod={deleteCardMethod} card={card} editSettings={editCardSettings} setEditSettings={setEditCardSettings}/>
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
                                className={`doc-row card mb-2${snapshot.isDraggingOver ? " doc-row--is-dragged-over" : ""}${!cards.length ? " doc-row--is-empty" : ""}`}
                                onMouseLeave={handleHoverLeave}
                                onMouseEnter={handleHover}
                            >
                                <Row className={`no-gutters flex-nowrap align-items-center`}>
                                    {renderCards()}
                                    {provided.placeholder}
                                    {!cards.length && <div className="doc-row__empty-text">Drag pictures here!</div>}
                                </Row>
                            </div>
                        )
                    }}
                </Droppable>
            </Col>
        </Row>
    );
}