import { createRowObj, createCardObj } from "../functions/utilities";
import putonclothes_c_l from '../picto-images/putonclothes_c_l.jpg';
import putonshoes_c_l from '../picto-images/putonshoes_c_l.jpg';
import putondress_c_l from '../picto-images/putondress_c_l.jpg';
import putoncoat_c_l from '../picto-images/putoncoat_c_l.jpg';

export const defaultCards = [
    createCardObj({ name: "card1", originalId: 1, img: putonclothes_c_l }),
    createCardObj({ name: "card2", originalId: 2, img: putoncoat_c_l }),
    createCardObj({ name: "card3", originalId: 3, img: putondress_c_l }),
    createCardObj({ name: "card4", originalId: 4, img: putonshoes_c_l }),
];

export const defaultRows = [
    createRowObj(1),
    createRowObj(2),
    createRowObj(3),
]

export const defaultDocSettings = {
    title: null
}