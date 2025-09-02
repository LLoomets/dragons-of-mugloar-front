import { useState } from "react";
import { startGame as apiStartGame, getMessages, getReputation, getShopItems } from "../api/gameApi";

export default function useGame() {
    const [game, setGame] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reputation, setReputation] = useState(null);
    const [shopItems, setShopItems] = useState([]);

    const startGame = async () => {
        try {
            const newGame = await apiStartGame();
            setGame(newGame);

            const [mgs, rep, items] = await Promise.all([
                getMessages(newGame.gameId),
                getReputation(newGame.gameId),
                getShopItems(newGame.gameId),
            ]);

            setMessages(mgs);
            setReputation(rep);
            setShopItems(items);
        } catch (error) {
            console.log(error);
        }
    }
    return { game, messages, reputation, shopItems, startGame };
}