export default function BottomAd({ show }) {

    if (show === false) {
        return null;
    }

    return (
        <div className="bottom-awt">
            <span>(ad here)</span>

        </div>
    )
}