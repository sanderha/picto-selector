export const createRowObj = (id) => {
    return {
        id: id,
        cardsIds: []
    }
}

export const createCardObj = ({ id, name, rowId, originalId, img }) => {
    return {
        id: id,
        name: name,
        rowId: rowId,
        originalId: originalId,
        img: img
    }
}

export const incrementId = (items) => {
    let highestId = 0;
    items.forEach(item => {
        if (item.id > highestId) {
            highestId = item.id;
        }
    })

    return highestId + 1;
}

export const reorderItems = (items, oldIndex, newIndex, newItem) => {
    let reordered = [...items];
    if(oldIndex){
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