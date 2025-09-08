export default function Shop({ items, onBuy }) {
    if (!items || items.length === 0) {
        return null
    }

    return (
        <div>
            <h2>Item shop</h2>
            <ul>
                {items.map((i) => (
                    <li key={i.id}>
                        <span>Name: {i.name}</span>
                        <span>Cost: {i.cost}</span>
                        <button onClick={() => onBuy(i.id)}>Buy</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}