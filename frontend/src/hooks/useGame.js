import { useState } from "react";
import { startGame as apiStartGame, getMessages, getReputation, getShopItems, solveMessage, buyItem } from "../api/gameApi";

export default function useGame() {
    const [game, setGame] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reputation, setReputation] = useState(null);
    const [shopItems, setShopItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [showReputation, setShowReputation] = useState(false);

    const fetchGameData = async (gameId) => {
        const [mgs, items] = await Promise.all([
            getMessages(gameId),
            getShopItems(gameId),
        ]);

        setMessages(mgs);
        setShopItems(items);
    }

    const startGame = async () => {
        setLoading(true);
        try {
            const newGame = await apiStartGame();

            setReputation(null);
            setGame(newGame);
            setIsGameOver(false);
            await fetchGameData(newGame.gameId);
        } catch (error) {
            console.log("failed to start game: ",error);
        } finally {
            setLoading(false);
        }
    }

    const handleSolve = async (adId) => {
        if (!game.gameId || isGameOver) return;

        setLoading(true);
        try {
            const result = await solveMessage(game.gameId, adId);
            console.log("Message solved:", result);

            setGame((prev) => {
                const updated = {
                    ...prev,
                    lives: result.lives,
                    gold: result.gold,
                    score: result.score,
                    turn: result.turn,
                };
                if (updated.lives <= 0) {
                    setIsGameOver(true);
                }
                return updated;
            });
            
            const updatedMessages = await getMessages(game.gameId);
            setMessages(updatedMessages);

            setShowReputation(false);
        } catch (error) {
            console.error("Failed to solve message:", error.response?.data || error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuyItem = async (itemId) => {
        if (!game.gameId || isGameOver) return;

        setLoading(true);
        try {
            const result = await buyItem(game.gameId, itemId);
            console.log("Item bought: ", result);

            setGame((prev) => ({
                    ...prev,
                    lives: result.lives,
                    gold: result.gold,
                    level: result.level,
                    turn: result.turn,
            }));

            const updatedMessages = await getMessages(game.gameId);
            setMessages(updatedMessages);

            setShowReputation(false);
            return result;
        } catch (error) {
            console.error("failed to buy item: ", error.response?.data || error);
        }
    }

    const handleInvestigateReputation = async () => {
        if (!game.gameId || isGameOver) return;

        setLoading(true);
        try {
            const result = await getReputation(game.gameId);
            console.log("Reputation: ", result);

            setGame((prev) => ({
                ...prev,
                turn: prev.turn + 1,
            }))

            setReputation(result);
            setShowReputation(true);

            const updatedMessages = await getMessages(game.gameId);
            setMessages(updatedMessages);
        } catch (error) {
            console.error("failed to get reputation: ", error);
        } finally {
            setLoading(false);
        }
    }

    return { game, messages, reputation, shopItems, isGameOver, startGame, handleSolve, handleBuyItem, handleInvestigateReputation, showReputation };
}