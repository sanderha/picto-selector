import PrintBtn from "../components/PrintBtn";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DocRow from "./pictoDoc/DocRow";
import BottomAd from './ads/BottomAd';
import { DragDropContext } from 'react-beautiful-dnd'

export default function PictoDoc({ rows, cards, setRowsMethod, setCardsMethod, userIsDragging, settings, editCardSettings, setEditCardSettings, toggleCardsDialog, onDragEnd, onDragStart }) {

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
                        deleteCardMethod={deleteCard}
                        deleteMethod={deleteRow}
                        cards={cards.filter(card => row.id === card.rowId).sort(function (a, b) {
                            return row.cardsIds.indexOf(a.id) - row.cardsIds.indexOf(b.id);
                        })}
                        editCardSettings={editCardSettings}
                        setEditCardSettings={setEditCardSettings}
                        toggleCardsDialog={toggleCardsDialog}
                    />
                })}
            </DragDropContext>

            <div className="text-center">
                <Row className="justify-content-md-center">
                    <Col className="col-md-auto">
                        {cards.length ? <PrintBtn /> : null}
                    </Col>
                </Row>
            </div>
            <Row>
                <Col>
                    <BottomAd />
                </Col>
            </Row>
        </div>
    );
}