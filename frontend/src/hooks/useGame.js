import { useState } from "react";
import { startGame as apiStartGame, getMessages, getReputation, getShopItems, solveMessage } from "../api/gameApi";

export default function useGame() {
    const [game, setGame] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reputation, setReputation] = useState(null);
    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const startGame = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    const handleSolve = async (adId) => {
        setLoading(true);
        try {
            const result = await solveMessage(game.gameId, adId);
            console.log("Message solved:", result);

            setGame((prev) => ({
                ...prev,
                lives: result.lives,
                gold: result.gold,
                score: result.score,
                turn: result.turn,
            }));

            const [updatedMessages, updatedReputation] = await Promise.all([
                getMessages(game.gameId),
                getReputation(game.gameId),
            ]);

            setMessages(updatedMessages);
            setReputation(updatedReputation);
        } catch (error) {
            console.error("Failed to solve message:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    return { game, messages, reputation, shopItems, startGame, handleSolve };
}