import './App.scss';

import { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd'
import PictoDoc from './views/PictoDoc';
import CardsBank from './views/CardsBank';
import { createRowObj, rowIdFromDroppableId, cardIdFromDraggableId, cardOriginalIdFromDraggableId, incrementId, reorderItems } from './functions/utilities'
import { Row, Col, Container } from 'react-bootstrap';
import { defaultCards, defaultDocSettings, defaultRows } from './misc/defaults';

function App() {
    const [docSettings, setDocSettings] = useState(defaultDocSettings);
    const [rows, setRows] = useState(defaultRows);
    const [cards, setCards] = useState([]);
    const [userIsDragging, setUserIsDragging] = useState(false);

    useEffect(() => {
        // check if there are rows with no cards, then add new empty row
        const ensureNewEmptyRow = () => {
            if (!rows.length) {
                return;
            }
            const lastRow = rows[rows.length - 1];
            const lastDefaultRow = defaultRows[defaultRows.length - 1];
            if(lastRow.id === lastDefaultRow.id && !lastRow.cardsIds.length){
                return;
            }
            if (lastRow.cardsIds.length) { 
                const currentHighestIdRow = Math.max(...rows.map(r => r.id));
                setRows([...rows, createRowObj(currentHighestIdRow + 1)]);
            }
        }
        ensureNewEmptyRow();
    }, [cards.length, rows, userIsDragging]);

    const onDragStart = () => {
        setUserIsDragging(true);
    }

    const onDragEnd = (result) => {
        setUserIsDragging(false);

        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }

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
        const originalCard = defaultCards.find(card => card.originalId === cardOriginalId);
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
                        <Col className={`settings-pane ${userIsDragging ? "settings-pane--disabled" : ""}`} sm={4}>
                            <div className="form-group">
                                <label htmlFor="title">Document title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" value={docSettings.title || ''} onChange={e => setDocSettings({ ...docSettings, title: e.target.value })} />
                                <small id="titleHelp" className="form-text text-muted">This title will appear at the top of the document</small>
                            </div>
                            <Row>
                                <Col>
                                    <hr />
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col>
                                    <CardsBank cards={defaultCards} userIsDragging={userIsDragging} />
                                </Col>
                            </Row>
                        </Col>
                        <Col className="picto-doc-wrapper-col">
                            <PictoDoc settings={docSettings} userIsDragging={userIsDragging} setCardsMethod={setCards} setRowsMethod={setRows} rows={rows} cards={cards} />
                        </Col>
                    </Row>
                </Container>
            </DragDropContext>
        </div>
    );
}

export default App;
