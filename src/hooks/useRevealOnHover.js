import {useState} from 'react'

export default function useRevealOnHover(){
    const sharedStyles = {
        transition: '.25s ease'
    }

    const hiddenStyle = {
        ...sharedStyles,
        opacity: 0,
        pointerEvents: 'none'
    }

    const visibleStyle = {
        ...sharedStyles,
        opacity: 1,
        pointerEvents: 'auto'
    }
    const [styleObj, setBtnStyles] = useState(visibleStyle);



    const handleHover = () => {
        setBtnStyles(visibleStyle);
    }

    const handleHoverLeave = () => {
        setBtnStyles(hiddenStyle);
    }

    return {styleObj, handleHover, handleHoverLeave};
}