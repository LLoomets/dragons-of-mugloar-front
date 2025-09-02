export default function Messageboard({ messages }) {
    if (!messages || messages.length === 0) {
        return <p>There's no messages available</p>
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
                    </li>
                ))}
            </ul>
        </div>
    )
}