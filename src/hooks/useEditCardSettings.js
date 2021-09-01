import {useState, useEffect} from 'react'

export default function useEditCardSettings(){
    const [editCardSettings, setEditCardSettings] = useState({ visible: false, cardId: null });
    const [cardSettingsData, setCardSettingsData] = useState({});

    useEffect(() => {
        // RESET
        if (!editCardSettings.visible && editCardSettings.cardId !== null) {
            setEditCardSettings({ ...editCardSettings, cardId: null });
            setCardSettingsData({});
        }
    }, [editCardSettings]);

    return [editCardSettings, setEditCardSettings, cardSettingsData, setCardSettingsData];
}