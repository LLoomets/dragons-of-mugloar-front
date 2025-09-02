import Messageboard from "../Messageboard/Messageboard";
import ReputationBoard from "../ReputationBoard/ReputationBoard";
import Shop from "../Shop/Shop";
import useGame from "../../hooks/useGame";

export default function StartGameButton() {
    const { game, messages, reputation, shopItems, startGame, handleSolve } = useGame();

    return (
        <div>
            <button onClick={startGame}>Start game</button>

            {game && (
                <div>
                    <p>Game id: {game.gameId}</p>
                    <p>Lives: {game.lives}</p>
                    <p>Gold: {game.gold}</p>
                    <p>Level: {game.level}</p>
                    <p>Score: {game.score}</p>
                    <p>Turn: {game.turn}</p>
                </div>
            )}

            <Messageboard messages={messages} gameId={game?.gameId} onMessageSolved={handleSolve} />
            <ReputationBoard reputation={reputation} />
            <Shop items={shopItems} />
        </div>
    );
}

