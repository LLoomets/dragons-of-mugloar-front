import { useState } from "react";

const isBase64 = (str) => {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}

const decodeMessage = (msg) => {
    if(isBase64(msg)) {
        return atob(msg);
    }
    return msg;
}

export default function Messageboard({ messages, gameId, onMessageSolved }) {
    const [solving, setSolving] = useState({});

    const handleSolve = async (adId) => {
        if (solving[adId]) return;

        setSolving((prev) => ({ ...prev, [adId]: true }));
        try {
            console.log("Solving adId:", adId, "gameId:", gameId);
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
                        <span>{decodeMessage(msg.message)}</span>
                        <span>Reward: {msg.reward}</span>
                        <span>Expires in: {msg.expiresIn} turns</span>
                        <span>Probability: {decodeMessage(msg.probability)}</span>
                        <button onClick={() => handleSolve(msg.adId)}>Solve</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}