import { defaultCards } from "../misc/defaults";
import Setup from "./settingsPane/Setup";
import CardsBank from "./settingsPane/CardsBank";

export default function SettingsPane({ settings, setSettings, userIsDragging, editCardSettings, setEditCardSettings}) {
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
        return '(TODO: card settings)' + editCardSettings.cardId
    }

    return (
        <div className={`settings-pane ${userIsDragging ? "settings-pane--disabled" : ""}`}>
            {editCardSettings.visible ? renderCardSettings() : renderDefaultView()}
        </div>
    )
}