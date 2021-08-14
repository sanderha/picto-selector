export default function Setup({settings, setSettings}) {
    return (
        <div className="setup">
            <div className="form-group">
                <label htmlFor="title">Document title</label>
                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" value={settings.title || ''} onChange={e => setSettings({ ...settings, title: e.target.value })} />
                <small id="titleHelp" className="form-text text-muted">This title will appear at the top of the document</small>
            </div>
        </div>
    )
}