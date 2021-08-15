import { defaultCards } from "../misc/defaults";
import Setup from "./settingsPane/Setup";
import CardsBank from "./settingsPane/CardsBank";
import CardSettings from "./settingsPane/CardSettings";
import { updateCardInList } from "../functions/utilities";

export default function SettingsPane({ settings, setSettings, userIsDragging, editCardSettings, setEditCardSettings, cards, setCards}) {
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
        const submit = (data) => {
            const updatedCard = {...card, ...data};
            const updatedCards = updateCardInList(updatedCard, cards);
            setCards(updatedCards);
        };

        return <CardSettings card={card} closeFunc={close} submitSettings={submit}/>
    }

    return (
        <div className={`settings-pane ${userIsDragging ? "settings-pane--disabled" : ""}`}>
            {editCardSettings.visible ? renderCardSettings() : renderDefaultView()}
        </div>
    )
}