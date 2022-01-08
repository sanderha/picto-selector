import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReadOnlyDocCard from '../pictoDoc/ReadOnlyDocCard'

export default function CardsBank({ cards, chooseCard }) {

    if(!cards.length){
        return '(no cards)';
    }

    return (
        <div className={`cards-bank`}>

            <Row>
                {cards.map((card, i) => {
                    return (
                        <Col sm="auto" key={i} onClick={() => chooseCard(card)}>
                            <ReadOnlyDocCard card={card} />
                        </Col>
                    )
                })}
            </Row>

        </div>
    )
}