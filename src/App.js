import './App.scss';

import { useState, useEffect } from 'react';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalHeader from 'react-bootstrap/ModalHeader'
import PictoDoc from './views/PictoDoc';
import { createRowObj, incrementId, reorderItems, updateCardInList } from './functions/utilities'
import { Row, Col, Container } from 'react-bootstrap';
import { defaultDocSettings, defaultRows } from './misc/defaults';
import { fetchAllCards } from './services/backend-service';
import SettingsPane from './views/SettingsPane';
import useEditCardSettings from './hooks/useEditCardSettings';
import CardsBank from "./views/settingsPane/CardsBank";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import CustomBsModal from './components/CustomBsModal';
import Welcome from './views/Welcome';
import Footer from './views/Footer';
import useStickyState from './hooks/useStickyState';

function App() {
    const [docSettings, setDocSettings] = useState(defaultDocSettings);
    const [showWelcome, setShowWelcome] = useState(true);
    const [rows, setRows] = useState([]);
    const [cards, setCards] = useState([]);
    const [originalCards, setOriginalCards] = useState([]);
    const [userIsDragging, setUserIsDragging] = useState(false);
    const [toggleCardsDialog, setToggleCardsDialog] = useState(null);
    const [editCardSettings, setEditCardSettings, cardSettingsData, setCardSettingsData] = useEditCardSettings();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!originalCards.length) {
            fetchAllCards().then(cards => {
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
        setRows([...rows]);
    }

    const submitModal = (card) => {
        if (!toggleCardsDialog) {
            return;
        }
        const row = rows.find(obj => obj.id === toggleCardsDialog);
        addCardToRow(toggleCardsDialog, card, row.cardsIds.length);
        setToggleCardsDialog(null);
    }

    if (loading) {
        return <div className="text-center d-flex flex-column justify-content-center align-items-center mt-5" >
            <FontAwesomeIcon size="4x" icon={faTimesCircle} className="loading-icon" spin style={{ animationDuration: "2.5s" }} />
            <br />
            Loading...
        </div>
    }

    return (
        <div className="picto-app">
            <div>
                <Container fluid className="p-3">
                    <Row>
                        <Col className="hide-for-print" sm={4}>
                            <div className="content-box">
                                {showWelcome && <Welcome setShowWelcome={setShowWelcome} />}
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
                <CustomBsModal onHide={() => setToggleCardsDialog(null)} show={toggleCardsDialog ? true : false}>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                        <CardsBank cards={originalCards} chooseCard={submitModal} />
                    </ModalBody>
                </CustomBsModal>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

export default App;
