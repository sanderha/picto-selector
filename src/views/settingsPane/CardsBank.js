import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReadOnlyDocCard from '../pictoDoc/ReadOnlyDocCard'
import LazyLoad from 'react-lazyload';

export default function CardsBank({ cards, chooseCard }) {

    if(!cards.length){
        return '(no cards)';
    }

    return (
        <div className={`cards-bank`}>

            <Row>
                {cards.map((card, i) => {
                    return (
                        
                            <Col sm="2" key={i} onClick={() => chooseCard(card)}>
                                <LazyLoad once  scrollContainer=".lazy-load-scroll-container-js">
                                    <ReadOnlyDocCard card={card} />
                                </LazyLoad>
                            </Col>
                        

                    )
                })}
            </Row>

        </div>
    )
}