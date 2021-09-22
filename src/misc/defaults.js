import { createRowObj, createCardObj } from "../functions/utilities";
import putonclothes_c_l from '../picto-images/putonclothes_c_l.jpg';
import putonshoes_c_l from '../picto-images/putonshoes_c_l.jpg';
import putondress_c_l from '../picto-images/putondress_c_l.jpg';
import putoncoat_c_l from '../picto-images/putoncoat_c_l.jpg';
import { CARD_BORDER_COLOR_ALERT, CARD_BORDER_COLOR_DEFAULT, CARD_BORDER_COLOR_SUCCESS, CARD_BORDER_COLOR_WARN, CARD_BORDER_SOLID, CARD_BORDER_DASHED, CARD_TITLE_ABOVE, CARD_TITLE_ABOVE_INSIDE, CARD_TITLE_BELOW, CARD_TITLE_BELOW_INSIDE } from "./constants";

export const defaultCards = [
    createCardObj({ name: "card1", originalId: 1, img: putonclothes_c_l }),
    createCardObj({ name: "card2", originalId: 2, img: putoncoat_c_l }),
    createCardObj({ name: "card3", originalId: 3, img: putondress_c_l }),
    createCardObj({ name: "card4", originalId: 4, img: putonshoes_c_l }),
];

export const defaultRows = [
    createRowObj(1),
    createRowObj(2)
]

export const defaultDocSettings = {
    title: null
}

// CARD SETTINGS FORM FIELDS DEFAULTS
export const cardTitleFieldValues = [
    {value: CARD_TITLE_ABOVE, label: "Title above"},
    {value: CARD_TITLE_BELOW, label: "Title below"},
    {value: CARD_TITLE_ABOVE_INSIDE, label: "Title above, inside border"},
    {value: CARD_TITLE_BELOW_INSIDE, label: "Title below, inside border"}
];

export const cardBorderFieldValues = [
    {value: 0, label: "No border"},
    {value: CARD_BORDER_SOLID, label: "Solid"},
    {value: CARD_BORDER_DASHED, label: "Dashed"}
];

export const cardBorderColorFieldValues = [
    CARD_BORDER_COLOR_DEFAULT, 
    CARD_BORDER_COLOR_ALERT,
    CARD_BORDER_COLOR_WARN,
    CARD_BORDER_COLOR_SUCCESS
];