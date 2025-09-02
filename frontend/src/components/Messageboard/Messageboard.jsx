import { useState } from "react";

export default function Messageboard({ messages, gameId, onMessageSolved }) {
    const [solving, setSolving] = useState({});

    const handleSolve = async (adId) => {
        if (solving[adId]) return;

        setSolving((prev) => ({ ...prev, [adId]: true }));
        try {
            await onMessageSolved(adId);
        } catch (error) {
            console.error("Failed to solve message:", error);
        } finally {
            setSolving((prev) => ({ ...prev, [adId]: false }));
        }
    };

    if (!messages || messages.length === 0) {
        return null
    }

    return (
        <div>
            <h2>Messages</h2>
            <ul>
                {messages.map((msg) => (
                    <li key={msg.adId}>
                        <span>{msg.message}</span>
                        <span>Reward: {msg.reward}</span>
                        <span>Expires in: {msg.expiresIn} turns</span>
                        <span>Probability: {msg.probability}</span>
                        <button onClick={() => handleSolve(msg.adId)}>Solve</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}