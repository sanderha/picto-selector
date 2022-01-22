import PrintBtn from "../components/PrintBtn";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DocRow from "./pictoDoc/DocRow";
import BottomAd from './ads/BottomAd';
import { rowIdFromDroppableId, cardIdFromDraggableId, cardOriginalIdFromDraggableId, reorderItems } from "../functions/utilities";
import { DragDropContext } from 'react-beautiful-dnd'

export default function PictoDoc({ rows, cards, setUserIsDragging, setRowsMethod, setCardsMethod, userIsDragging, settings, editCardSettings, setEditCardSettings, toggleCardsDialog, addCardToRow }) {

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
            setCardsMethod(cards.filter(card => card.id !== cardId))

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

    const deleteRow = (rowId) => {
        setRowsMethod(rows.filter(row => row.id !== rowId))
        setCardsMethod(cards.filter(card => card.rowId !== rowId));
    }

    const deleteCard = (card) => {
        // remove card from row
        const row = rows.find(row => row.id === card.rowId);
        row.cardsIds = row.cardsIds.filter(item => item !== card.id);
        // remove card
        setCardsMethod([...cards.filter(c => c.id !== card.id)])
        setEditCardSettings({ ...editCardSettings, visible: false });
    }

    const renderTitle = () => {
        if (!settings.title) return;

        return <Row>
            <Col>
                <h1 className="doc-title">{settings.title}</h1>
            </Col>
        </Row>
    }

    return (
        <div className={`doc${userIsDragging ? " doc--is-dragging" : ""}`}>
            {renderTitle()}
            <DragDropContext onDragEnd={(result) => onDragEnd(result)} onDragStart={onDragStart}>
                {rows.map((row, i) => {
                    return <DocRow
                        key={i}
                        row={row}
                        size={settings.rowSize}
                        deleteCardMethod={deleteCard}
                        deleteMethod={deleteRow}
                        cards={cards.filter(card => row.id === card.rowId).sort(function (a, b) {
                            return row.cardsIds.indexOf(a.id) - row.cardsIds.indexOf(b.id);
                        })}
                        cardSize={settings.cardSize}
                        editCardSettings={editCardSettings}
                        setEditCardSettings={setEditCardSettings}
                        toggleCardsDialog={toggleCardsDialog}
                    />
                })}
            </DragDropContext>

            <div className="text-center mt-4 hide-for-print">
                <Row className="justify-content-md-center">
                    <Col className="col-md-auto">
                        <PrintBtn />
                    </Col>
                </Row>
                <div className="mt-2" style={{fontSize: "10px"}}>*Empty rows are not visible in the final print</div>
            </div>
            <Row>
                <Col>
                    <BottomAd show={false} />
                </Col>
            </Row>
        </div>
    );
}