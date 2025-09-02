import { useState } from "react";
import { startGame as apiStartGame, getMessages, getReputation, getShopItems } from "../../api/gameApi";
import Messageboard from "../Messageboard/Messageboard";
import ReputationBoard from "../ReputationBoard/ReputationBoard";
import Shop from "../Shop/Shop";

export default function StartGameButton() {
    const [game, setGame] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reputation, setReputation] = useState(null);
    const [shopItems, setShopItems] = useState([]);

    const startGame = async () => {
        console.log("Starting game...");

        try {
            const newGame = await apiStartGame();
            setGame(newGame);
            console.log("Game has started", newGame);

            const msgs = await getMessages(newGame.gameId);
            setMessages(msgs);
            console.log("Messages fetched: ", msgs);

            const rep = await getReputation(newGame.gameId);
            setReputation(rep);
            console.log("Reputation fetched: ", rep);

            const items = await getShopItems(newGame.gameId);
            setShopItems(items);
            console.log("Items fetched: ", items);
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
            <ReputationBoard reputation={reputation} />
            <Shop items={shopItems} />
        </div>
    );
}

