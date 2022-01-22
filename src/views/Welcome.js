export default function Welcome({ setShowWelcome }) {
    return <div>
        <h1>Welcome to Simple Picto-selector Online</h1>
        <p>Create simple picto sheets by adding pictures to the rows on the screen.</p>
        <p>You can modify pictures by hovering over them and clicking the edit button</p>
        <a className="btn btn-sm btn-success" onClick={(e) => setShowWelcome(false)}>OK, got it!</a>
        <hr />
    </div>
}