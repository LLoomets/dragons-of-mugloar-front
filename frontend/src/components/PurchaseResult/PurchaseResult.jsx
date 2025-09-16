import "./PurchaseResult.css";

export default function PurchaseResult({ result, onClose }) {
    if (!result) return null;

    return (
        <div className="overlay" onClick={onClose}>
            <div className="content" onClick={(e) => e.stopPropagation()}>
                <h2>Puchase {result.shoppingSuccess ? "Successful!" : "Failed"}</h2>
                {result.shoppingSuccess && (
                    <div>
                        <p>Gold: {result.gold}</p>
                        <p>Lives: {result.lives}</p>
                        <p>Level: {result.level}</p>
                        <p>Turn: {result.turn}</p>
                    </div>
                )}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}