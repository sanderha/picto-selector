import axios from "axios";
import { createCardObj } from "../functions/utilities";
import { defaultCards } from "../misc/defaults";

export function resolveFile(url) {
    return `${process.env.REACT_APP_FILE_URL}/${url}`;
}

export async function allCards(){
    const data = await axios.get(`${process.env.REACT_APP_API_URL}/all-pictos`)
    // TODO error handling
    .then(r => r.data).catch(e => null);

    if(!data || !data.length){
        // if no cards from backend, output some defaults for now
        return defaultCards;
    }

    return data.map(card => createCardObj({
        name: card.name,
        meta: card,
        originalId: card.id,
        img: resolveFile(card.full_path)
    }))
}

