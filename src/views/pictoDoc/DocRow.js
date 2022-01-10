import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import DocCard from './DocCard'
import useRevealOnHover from '../../hooks/useRevealOnHover';


export default function DocRow({ deleteMethod, deleteCardMethod, cards, row, editCardSettings, setEditCardSettings, toggleCardsDialog }) {
    const { handleHover, handleHoverLeave } = useRevealOnHover();
    const [showCardsDialog, setShowCardsDialog] = useState(false);

    useEffect(() => {
        if(showCardsDialog === true){
            toggleCardsDialog(row.id);
            setShowCardsDialog(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [showCardsDialog]);


    const renderCards = () => {
        return cards.map((card, i) => {
            return <Draggable key={'card-' + card.id} draggableId={'card-' + card.id} index={i}>
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
                                    <Col sm="auto">
                                        <div className="doc-card-add" onClick={() => setShowCardsDialog(true)} title="Click to add pictures here!">
                                            <span>+</span>
                                        </div>
                                    </Col>
                                    {provided.placeholder}
                                    {!cards.length && <div className="doc-row__empty-text" onClick={() => setShowCardsDialog(true)}>Click to add pictures here!</div>}
                                </Row>
                            </div>
                        )
                    }}
                </Droppable>
            </Col>
        </Row>
    );
}