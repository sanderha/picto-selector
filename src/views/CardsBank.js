import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import ReadOnlyDocCard from './pictoDoc/ReadOnlyDocCard'

export default function CardsBank({ cards, userIsDragging }) {

    return (
        <div className={`cards-bank ${userIsDragging ? "cards-bank--dragging" : ""}`}>

            <Droppable isDropDisabled={true} droppableId="card-bank-droppable">
                {(provided, snapshot) => {
                    return <div ref={provided.innerRef} {...provided.droppableProps}>
                        <Row>
                            {cards.map((card, i) => {
                                return (
                                    <Col sm="auto" key={i} >
                                        <Draggable draggableId={'card-org-id-' + card.originalId} index={i}>
                                            {(provided, snapshot) => {
                                                return <React.Fragment>
                                                    <div
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        <ReadOnlyDocCard isFloating={snapshot.isDragging} card={card} />

                                                    </div>
                                                    {snapshot.isDragging && (
                                                        <div><ReadOnlyDocCard card={card} /></div>
                                                    )}
                                                </React.Fragment>
                                            }}
                                        </Draggable>

                                    </Col>
                                )
                            })}
                            {provided.placeholder}
                        </Row>
                    </div>
                }}

            </Droppable>

        </div>
    )
}