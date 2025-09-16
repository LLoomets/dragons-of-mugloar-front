import Messageboard from "../Messageboard/Messageboard";
import ReputationBoard from "../ReputationBoard/ReputationBoard";
import Shop from "../Shop/Shop";
import PurchaseResult from "../PurchaseResult/PurchaseResult";
import useGame from "../../hooks/useGame";
import "./StartGameButton.css";
import { useState } from "react";

export default function StartGameButton() {
    const { game, messages, reputation, shopItems, loading, isGameOver, startGame, handleSolve, handleBuyItem, handleInvestigateReputation, showReputation } = useGame();
    const [purchaseResult, setPurchaseResult] = useState(null);

    const handleBuy = async (itemId) => {
    const result = await handleBuyItem(itemId);
    setPurchaseResult(result);
}

    return (
        <div className="game-container">
            <div className="logo-container">
                <img src="/logo.png" alt="logo" className="game-logo" />
            </div>
            <div className="game-panel">
                {(!game || isGameOver) && (
                    <div className="start-btn-container">
                        <button className="start-btn" onClick={startGame} disabled={loading}>
                            {loading ? "Starting..." : isGameOver ? "Restart Game" : "Start Game"}
                        </button>
                    </div>
                )}

                {game && !isGameOver && (
                    <div className="user-data">
                        <p>Game id: {game.gameId}</p>
                        <p>Lives: {game.lives}</p>
                        <p>Gold: {game.gold}</p>
                        <p>Level: {game.level}</p>
                        <p>Score: {game.score}</p>
                        <p>Turn: {game.turn}</p>
                    </div>
                )}

                {isGameOver && (
                    <div>
                        <p>Game over</p>
                    </div>
                )}

                {!isGameOver && (
                    <div>
                        <Messageboard messages={messages} gameId={game?.gameId} onMessageSolved={handleSolve} />
                        <ReputationBoard reputation={reputation} game={game} onInvestigate={handleInvestigateReputation} showReputation={showReputation} />
                        <Shop items={shopItems} onBuy={handleBuy} />
                        <PurchaseResult result={purchaseResult} onClose={() => setPurchaseResult(null)} />
                    </div>
                )}
            </div>
        </div>
    );
}

