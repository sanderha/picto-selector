import './App.scss';

import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import PictoDoc from './views/PictoDoc';
import { createRowObj, incrementId, reorderItems, updateCardInList } from './functions/utilities'
import { Row, Col, Container } from 'react-bootstrap';
import { defaultDocSettings, defaultRows } from './misc/defaults';
import { allCards } from './services/backend-service';
import SettingsPane from './views/SettingsPane';
import useEditCardSettings from './hooks/useEditCardSettings';
import CardsBank from "./views/settingsPane/CardsBank";

function App() {
    const [docSettings, setDocSettings] = useState(defaultDocSettings);
    const [rows, setRows] = useState([]);
    const [cards, setCards] = useState([]);
    const [originalCards, setOriginalCards] = useState([]);
    const [userIsDragging, setUserIsDragging] = useState(false);
    const [toggleCardsDialog, setToggleCardsDialog] = useState(null);
    const [editCardSettings, setEditCardSettings, cardSettingsData, setCardSettingsData] = useEditCardSettings();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!originalCards.length) {
            allCards().then(cards => {
                setOriginalCards(cards);
                setLoading(false);
            });
        }
    }, []);

    useEffect(() => {
        const updateCardSettings = () => {
            const card = cards.find(c => c.id === editCardSettings.cardId);
            const updatedCard = { ...card, ...cardSettingsData };
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
            if (!rows.find(row => row.cardsIds.length)) {
                return;
            }
            const lastRowId = rows[rows.length - 1].id;
            const rowsToKeep = [];
            rows.forEach((row, i) => {
                if (!row.cardsIds.length && row.id !== lastRowId) {
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
        if (!rows.length || !rows.find(row => row.cardsIds.length)) {
            setRows(defaultRows);
        }

    }, [rows, cards.length]);

    const addCardToRow = (rowId, card, index) => {
        const row = rows.find(obj => obj.id === rowId);
        let newCard = { ...card };
        newCard.id = incrementId(cards);
        newCard.rowId = rowId;
        const reorderedCardIds = reorderItems(row.cardsIds, null, index, newCard.id);
        row.cardsIds = reorderedCardIds;
        setCards([...cards, newCard]);
    }

    const submitModal = (card) => {
        if (!toggleCardsDialog) {
            return;
        }
        addCardToRow(toggleCardsDialog, card, 0);
        setToggleCardsDialog(null);
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="picto-app">
            <Modal onHide={() => setToggleCardsDialog(null)} show={toggleCardsDialog ? true : false} size='xl' scrollable>
                <ModalHeader></ModalHeader>
                <ModalBody>
                    <CardsBank cards={originalCards} chooseCard={submitModal} />
                </ModalBody>
            </Modal>
            <Container fluid className="p-3">
                <Row>
                    <Col className="hide-for-print" sm={4}>
                        <div className="content-box">
                            <h1>Welcome to Simple Picto-selector Online</h1>
                            <p>Create simple picto sheets by adding pictures to the rows on the screen.</p>
                            <p>You can modify pictures by hovering over them and clicking the edit button</p>
                            <hr />
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
                        </div>

                    </Col>
                    <Col className="picto-doc-wrapper-col">
                        <PictoDoc
                            settings={docSettings}
                            userIsDragging={userIsDragging}
                            setUserIsDragging={setUserIsDragging}
                            setCardsMethod={setCards}
                            setRowsMethod={setRows}
                            rows={rows}
                            cards={cards}
                            editCardSettings={editCardSettings}
                            setEditCardSettings={setEditCardSettings}
                            toggleCardsDialog={setToggleCardsDialog}
                            addCardToRow={addCardToRow}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
