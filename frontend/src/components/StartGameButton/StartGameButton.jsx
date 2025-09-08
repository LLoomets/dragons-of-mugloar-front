import Messageboard from "../Messageboard/Messageboard";
import ReputationBoard from "../ReputationBoard/ReputationBoard";
import Shop from "../Shop/Shop";
import useGame from "../../hooks/useGame";

export default function StartGameButton() {
    const { game, messages, reputation, shopItems, loading, isGameOver, startGame, handleSolve, handleBuyItem, handleInvestigateReputation, showReputation } = useGame();

    return (
        <div>
            {(!game || isGameOver) && (
                <button onClick={startGame} disabled={loading}>
                    {loading ? "Starting..." : isGameOver ? "Restart Game" : "Start Game"}
                </button>
            )}

            {game && !isGameOver && (
                <div>
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
                    <Shop items={shopItems} onBuy={handleBuyItem} />
                </div>
            )}
            
        </div>
    );
}

