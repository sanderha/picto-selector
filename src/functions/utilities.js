import { CARD_BORDER_COLOR_DEFAULT, CARD_TITLE_ABOVE } from "../misc/constants";

export const createRowObj = (id) => {
    return {
        id: id,
        cardsIds: []
    }
}

export const createCardObj = ({ id, name, rowId, originalId, img, meta }) => {
    return {
        id: id,
        name: name,
        rowId: rowId,
        originalId: originalId,
        img: img,
        title: null,
        titlePosition: CARD_TITLE_ABOVE,
        border: 0,
        borderColor: CARD_BORDER_COLOR_DEFAULT,
        meta: meta
    }
}

export const incrementId = (items) => {
    let highestId = 0;
    items.forEach(item => {
        if (item.id && item.id > highestId) {
            highestId = item.id;
        }
    });

    return highestId + 1;
};

export const reorderItems = (items, oldIndex, newIndex, newItem) => {
    let reordered = [...items];
    if (oldIndex) {
        reordered.splice(oldIndex, 1);
    }

    reordered.splice(newIndex, 0, newItem);
    return reordered;
}

export const rowIdFromDroppableId = (droppableId) => {
    const val = droppableId.split('row-');

    return +(val[1]) || null;
}

export const cardIdFromDraggableId = (draggableId) => {
    const val = draggableId.split('card-');

    return +(val[1]) || null;
}

export const cardOriginalIdFromDraggableId = (draggableId) => {
    const val = draggableId.split('card-org-id-');

    return +(val[1]) || null;
}

export const updateCardInList = (card, cardsList) => {
    let indexToUpdate = null;
    for (const [index, existingCard] of cardsList.entries()) {
        if (existingCard.id === card.id) {
            indexToUpdate = index;
            break;
        }
    }
    cardsList[indexToUpdate] = card;

    return cardsList;
}