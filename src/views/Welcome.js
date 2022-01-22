export default function Welcome({ setShowWelcome }) {
    return <div>
        <h1>Web Picto Selector</h1>
        <p>Welcome to Web Picto Selector. Here you can create visual schemas with images, text and more.</p>
        <p>Create simple picto sheets by adding pictures to the rows on the screen.</p>
        <p>You can modify pictures by hovering over them and clicking the edit button</p>
        <p>When you are done, click on the Print button</p>
        <p>
            This application was inspired by the desktop software for windows: <a rel="noreferrer" href="https://www.pictoselector.eu/" title="go to https://www.pictoselector.eu/" target="_blank">Picto Selector</a>
        </p>
        <a href="#okgotit" className="btn btn-sm btn-success" onClick={(e) => setShowWelcome(false)}>OK, got it!</a>
        <hr />
    </div>
}