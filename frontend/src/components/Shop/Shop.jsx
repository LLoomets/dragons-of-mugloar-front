export default function Shop({ items }) {
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
                    </li>
                ))}
            </ul>
        </div>
    )
}