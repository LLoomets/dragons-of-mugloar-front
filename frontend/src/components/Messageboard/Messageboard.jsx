import { solveMessage } from "../../api/gameApi"

export default function Messageboard({ messages, gameId, onMessageSolved }) {
    const handleSolve = async (adId) => {
        try {
            const result = await solveMessage(gameId, adId);
            console.log("Message solved: ", result);

            if (onMessageSolved) onMessageSolved(result);
        } catch (error) {
            console.log("failed to solve message: ", error);
        }
    }

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