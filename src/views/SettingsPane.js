import Setup from "./settingsPane/Setup";
import CardsBank from "./settingsPane/CardsBank";
import CardSettings from "./settingsPane/CardSettings";

export default function SettingsPane({ settings, setSettings, userIsDragging, editCardSettings, setEditCardSettings, cards, setCardSettingsData, bankCards}) {

    const renderDefaultView = () => {
        return (
        <>
            <Setup settings={settings} setSettings={setSettings} />
            <hr />
            <div className="mt-4">
                <CardsBank cards={bankCards.slice(0,25)} userIsDragging={userIsDragging} />
            </div>
        </>
        )    
    }

    const renderCardSettings = () => {
        const card = cards.find(c => c.id === editCardSettings.cardId);
        if(!card){
            return;
        }
        const close = () => setEditCardSettings({...editCardSettings, visible: false});
        const submit = data => setCardSettingsData(data);

        return <CardSettings card={card} closeFunc={close} submitSettings={submit}/>
    }

    return (
        <div className={`settings-pane ${userIsDragging ? "settings-pane--disabled" : ""}`}>
            {editCardSettings.visible ? renderCardSettings() : renderDefaultView()}
        </div>
    )
}