import { defaultCards } from "../misc/defaults";
import Setup from "./settingsPane/Setup";
import CardsBank from "./settingsPane/CardsBank";
import CardSettings from "./settingsPane/CardSettings";

export default function SettingsPane({ settings, setSettings, userIsDragging, editCardSettings, setEditCardSettings, cards, setCardSettingsData}) {

    const renderDefaultView = () => {
        return (
        <>
            <Setup settings={settings} setSettings={setSettings} />
            <hr />
            <div className="mt-4">
                <CardsBank cards={defaultCards} userIsDragging={userIsDragging} />
            </div>
        </>
        )    
    }

    const renderCardSettings = () => {
        const card = cards.find(c => c.id === editCardSettings.cardId);
        const close = () => setEditCardSettings({...editCardSettings, visible: false});

        return <CardSettings card={card} closeFunc={close} submitSettings={setCardSettingsData}/>
    }

    return (
        <div className={`settings-pane ${userIsDragging ? "settings-pane--disabled" : ""}`}>
            {editCardSettings.visible ? renderCardSettings() : renderDefaultView()}
        </div>
    )
}