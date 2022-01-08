import './App.scss';

import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import PictoDoc from './views/PictoDoc';
import { createRowObj, rowIdFromDroppableId, cardIdFromDraggableId, cardOriginalIdFromDraggableId, incrementId, reorderItems, updateCardInList } from './functions/utilities'
import { Row, Col, Container } from 'react-bootstrap';
import { defaultCards, defaultDocSettings, defaultRows } from './misc/defaults';
import SettingsPane from './views/SettingsPane';
import useEditCardSettings from './hooks/useEditCardSettings';
import CardsBank from "./views/settingsPane/CardsBank";

function App() {
    const [docSettings, setDocSettings] = useState(defaultDocSettings);
    const [rows, setRows] = useState([]);
    const [cards, setCards] = useState([]);
    const [userIsDragging, setUserIsDragging] = useState(false);
    const [toggleCardsDialog, setToggleCardsDialog] = useState(null);
    const [editCardSettings, setEditCardSettings, cardSettingsData, setCardSettingsData] = useEditCardSettings();

    useEffect(() => {
        const updateCardSettings = () => {
            const card = cards.find(c => c.id === editCardSettings.cardId);
            const updatedCard = {...card, ...cardSettingsData};
            const updatedCards = updateCardInList(updatedCard, cards);
            setCards([...updatedCards]);
        }
        updateCardSettings();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cardSettingsData, editCardSettings.cardId]);

    useEffect(() => {
        // check if there are rows with no cards, then add new empty row
        const ensureNewEmptyRow = () => {
            if (!rows.length) {
                return;
            }
            const lastRow = rows[rows.length - 1];
            // last row has cards, add another empty row
            if (lastRow.cardsIds.length) {
                const newEmptyRow = createRowObj(incrementId(rows));
                setRows([...rows, newEmptyRow]);
            }
        }
        ensureNewEmptyRow();
    }, [cards.length, rows, userIsDragging]);

    useEffect(() => {
        const cleanupExcessRows = () => {
            // if only empty rows exist, its ok
            if(!rows.find(row => row.cardsIds.length)){
                return;
            }
            const lastRowId = rows[rows.length - 1].id;
            const rowsToKeep = [];
            rows.forEach((row, i) => {
                if(!row.cardsIds.length && row.id !== lastRowId){
                    rowsToKeep.push(row);
                }
            });
            setRows(rowsToKeep);
        }
        //TODO is broken at the moment
        //cleanupExcessRows();
    }, [cards]);

    useEffect(() => {
        // reset to default state when no rows with items
        if(!rows.length || !rows.find(row => row.cardsIds.length)){
            setRows(defaultRows);
        }
    
    }, [rows, cards.length]);

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

    const addCardToRow = (rowId, cardOriginalId, index) => {
        console.log('addCardToRow', rowId, cardOriginalId, index);
        const originalCard = defaultCards.find(card => card.originalId === cardOriginalId);
        const row = rows.find(obj => obj.id === rowId);
        let newCard = { ...originalCard };
        newCard.id = incrementId(cards);
        newCard.rowId = rowId;
        const reorderedCardIds = reorderItems(row.cardsIds, null, index, newCard.id);
        row.cardsIds = reorderedCardIds;
        setCards([...cards, newCard]);
    }

    const submitModal = (card) => {
        if(!toggleCardsDialog){
            return;
        }
        addCardToRow(toggleCardsDialog, card.originalId, 0);
        setToggleCardsDialog(null);
    }

    return (
        <div className="picto-app"> 
                <Modal onHide={() => setToggleCardsDialog(null)} show={toggleCardsDialog ? true : false} size='xl' scrollable>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                        <CardsBank cards={defaultCards} chooseCard={submitModal} />
                    </ModalBody>
                </Modal>
                <Container fluid className="p-3">
                    <Row>
                        <Col className="hide-for-print" sm={4}>
                            <SettingsPane 
                                setCards={setCards} 
                                cards={cards} 
                                settings={docSettings} 
                                setSettings={setDocSettings} 
                                userIsDragging={userIsDragging} 
                                editCardSettings={editCardSettings} 
                                setEditCardSettings={setEditCardSettings} 
                                setCardSettingsData={setCardSettingsData}
                            />
                        </Col>
                        <Col className="picto-doc-wrapper-col">
                            <PictoDoc
                                settings={docSettings} 
                                userIsDragging={userIsDragging} 
                                setCardsMethod={setCards} 
                                setRowsMethod={setRows} 
                                rows={rows} 
                                cards={cards} 
                                editCardSettings={editCardSettings}
                                setEditCardSettings={setEditCardSettings}
                                toggleCardsDialog={setToggleCardsDialog}
                                onDragEnd={onDragEnd}
                                onDragStart={onDragStart}
                            />
                        </Col>
                    </Row>
                </Container>
        </div>
    );
}

export default App;
