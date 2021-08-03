import AddRowBtn from "../components/AddRowBtn";
import PrintBtn from "../components/PrintBtn";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { createRowObj, incrementId } from "../functions/utilities";
import DocRow from "./pictoDoc/DocRow";

export default function PictoDoc({ rows, cards, setRowsMethod, setCardsMethod, userIsDragging }) {

    const handleAddRow = () => {
        const alteredRows = [...rows];
        alteredRows.push(createRowObj(incrementId(rows)));
        setRowsMethod(alteredRows);
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
        setCardsMethod(cards.filter(c => c.id !== card.id))
    }

    const rowCards = (rowId) => cards.filter(card => rowId === card.rowId)

    return (
        <div className={`doc${userIsDragging ? " doc--is-dragging" : null}`}>
            {rows.map((row, i) => <DocRow key={i} row={row} deleteCardMethod={deleteCard} deleteMethod={deleteRow} cards={rowCards(row.id)} />)}
            <div className="text-center">
                <Row className="justify-content-md-center">
                    <Col className="col-md-auto">
                        <AddRowBtn addRowMethod={handleAddRow} />
                    </Col>
                    <Col className="col-md-auto">
                        <PrintBtn />
                    </Col>
                </Row>
            </div>
        </div>
    );
}