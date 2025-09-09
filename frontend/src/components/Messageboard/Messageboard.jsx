import { useState } from "react";
import "./Messageboard.css";

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
            <table className="messages-table">
                <thead>
                    <tr>
                        <th>Message</th>
                        <th>Reward</th>
                        <th>Expires in</th>
                        <th>Probability</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {messages.map((msg) => (
                        <tr key={msg.adId}>
                            <td>{decodeMessage(msg.message)}</td>
                            <td>{msg.reward} gold</td>
                            <td>{msg.expiresIn} turns</td>
                            <td>{decodeMessage(msg.probability)}</td>
                            <td><button onClick={() => handleSolve(msg.adId)}>{solving[msg.adId] ? "..." : "Solve"}</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}