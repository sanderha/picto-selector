import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import ReadOnlyDocCard from './pictoDoc/ReadOnlyDocCard'

export default function CardsBank({cards}) {


    return (
        <div className="cards-bank">

            <Droppable droppableId="card-bank-droppable">
                {(provided) => {
                    return <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <Row>
                            {cards.map((card, i) => {
                                return (
                                    <Col sm="auto" key={i} >
                                        <Draggable draggableId={'card-org-id-' + card.originalId} index={i}>
                                            {(p) => {
                                                return <div
                                                    {...p.draggableProps}
                                                    {...p.dragHandleProps}
                                                    ref={p.innerRef}
                                                >
                                                    <ReadOnlyDocCard card={card} />
                                                </div>

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