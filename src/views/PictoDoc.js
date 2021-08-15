import PrintBtn from "../components/PrintBtn";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DocRow from "./pictoDoc/DocRow";

export default function PictoDoc({ rows, cards, setRowsMethod, setCardsMethod, userIsDragging, settings, editCardSettings, setEditCardSettings }) {
    const deleteRow = (rowId) => {
        setRowsMethod(rows.filter(row => row.id !== rowId))
        setCardsMethod(cards.filter(card => card.rowId !== rowId));
    }

    const deleteCard = (card) => {
        // remove card from row
        const row = rows.find(row => row.id === card.rowId);
        row.cardsIds = row.cardsIds.filter(item => item !== card.id);
        // remove card
        setCardsMethod(cards.filter(c => c.id !== card.id))
    }

    const rowCards = (rowId) => cards.filter(card => rowId === card.rowId)

    const renderTitle = () => {
        if (!settings.title) return;

        return <Row>
            <Col>
                <h1 className="doc-title">{settings.title}</h1>
            </Col>
        </Row>
    }

    const renderRows = () => {
        return rows.map((row, i) => {
            return <DocRow 
                key={i} 
                row={row} 
                deleteCardMethod={deleteCard} 
                deleteMethod={deleteRow} 
                cards={rowCards(row.id)} 
                editCardSettings={editCardSettings}
                setEditCardSettings={setEditCardSettings}
            />
        })
    }

    return (
        <div className={`doc${userIsDragging ? " doc--is-dragging" : ""}`}>
            {renderTitle()}
            {renderRows()}
            <div className="text-center">
                <Row className="justify-content-md-center">
                    <Col className="col-md-auto">
                        {cards.length ? <PrintBtn /> : null}
                    </Col>
                </Row>
            </div>
        </div>
    );
}