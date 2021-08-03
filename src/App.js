import './App.scss';

import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import PictoDoc from './views/PictoDoc';
import CardsBank from './views/CardsBank';
import { rowIdFromDroppableId, cardIdFromDraggableId, cardOriginalIdFromDraggableId, incrementId, createCardObj, reorderItems } from './functions/utilities'

function App() {
    const [rows, setRows] = useState([
        { id: 1, cardsIds: []}, { id: 2, cardsIds: []}
    ]);
    const [cards, setCards] = useState([]);
    const [userIsDragging, setUserIsDragging] = useState(false);

    const orignalCards = [
        createCardObj({ name: "card1", originalId: 1, img: "putonclothes_c_l.jpg" }),
        createCardObj({ name: "card2", originalId: 2, img: "putoncoat_c_l.jpg" }),
        createCardObj({ name: "card3", originalId: 3, img: "putondress_c_l.jpg" }),
        createCardObj({ name: "card4", originalId: 4, img: "putonshoes_c_l.jpg" }),
    ];

    const onDragStart = () => {
        setUserIsDragging(true);
    }

    const onDragEnd = (result) => {
        setUserIsDragging(false);

        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        console.log(result);
        // if came from row, remove that from the row
        if (destination.droppableId === 'card-bank-droppable') {
            const cardId = cardIdFromDraggableId(draggableId);
            setCards(cards.filter(card => card.id !== cardId))

            return;
        }
        if (source && source.droppableId !== 'card-bank-droppable') {
            // from another row
            const cardId = cardIdFromDraggableId(draggableId);
            const rowId = rowIdFromDroppableId(destination.droppableId);
            moveCard(rowId, cardId, destination.index, source.index);
            return;
        }
        const submittedCardOriginalId = cardOriginalIdFromDraggableId(draggableId);
        const rowId = rowIdFromDroppableId(destination.droppableId);
        addCardToRow(rowId, submittedCardOriginalId, destination.index, source.index);
    }

    const moveCard = (rowId, cardId, index, sourceIndex) => {
        let card = cards.find(c => c.id === cardId);
        const sourceRow = rows.find(row => row.id === card.rowId);
        const destRow = rows.find(row => row.id === rowId);
        // remove item from source row
        sourceRow.cardsIds.splice(sourceIndex, 1);
        // set new row id
        card.rowId = rowId;
        const reorderedCardIds = reorderItems(destRow.cardsIds, null, index, card.id);
        destRow.cardsIds = reorderedCardIds;
    }

    const addCardToRow = (rowId, cardOriginalId, index, sourceIndex) => {
        const originalCard = orignalCards.find(card => card.originalId === cardOriginalId);
        const row = rows.find(obj => obj.id === rowId);
        let newCard = { ...originalCard };
        newCard.id = incrementId(cards);
        newCard.rowId = rowId;
        const reorderedCardIds = reorderItems(row.cardsIds, null, index, newCard.id);
        row.cardsIds = reorderedCardIds;
        setCards([...cards, newCard]);
    }


    return (
        <div className="picto-app">
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
                <Container fluid className="p-3">
                    <Row>
                        <Col className="settings-pane" sm={4}>
                            settings and picto's here
                            <Row className="mt-4">
                                <Col>
                                    <CardsBank cards={orignalCards} />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="picto-doc-wrapper-col">
                            <PictoDoc userIsDragging={userIsDragging} setCardsMethod={setCards} setRowsMethod={setRows} rows={rows} cards={cards} />
                        </Col>
                    </Row>
                </Container>
            </DragDropContext>
        </div>
    );
}

export default App;
