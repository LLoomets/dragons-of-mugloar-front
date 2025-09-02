import { useState } from "react";
import { startGame as apiStartGame, getMessages } from "../../api/gameApi";
import Messageboard from "../Messageboard/Messageboard";

export default function StartGameButton() {
    const [game, setGame] = useState(null);
    const [messages, setMessages] = useState(null);

    const startGame = async () => {
        console.log("Starting game...");

        try {
            const newGame = await apiStartGame();
            setGame(newGame);
            console.log("Game has started", newGame);

            const msgs = await getMessages(newGame.gameId);
            setMessages(msgs);
            console.log("Messages fetched: ", msgs);
        } catch (error) {
            console.log("Starting game failed:", error);
        }
    }

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

            <Messageboard messages={messages} />
        </div>
    );
}

