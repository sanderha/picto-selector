import {useState, useEffect} from 'react'

export default function useEditCardSettings(){
    const [editCardSettings, setEditCardSettings] = useState({ visible: false, cardId: null });
    const [cardSettingsData, setCardSettingsData] = useState({});

    useEffect(() => {
        if (!editCardSettings.visible && editCardSettings.cardId !== null) {
            setEditCardSettings({ ...editCardSettings, cardId: null });
        }
    }, [editCardSettings]);

    return [editCardSettings, setEditCardSettings, cardSettingsData, setCardSettingsData];
}