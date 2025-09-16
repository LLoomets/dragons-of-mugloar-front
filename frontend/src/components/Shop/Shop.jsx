import "./Shop.css";

export default function Shop({ items, onBuy }) {
    if (!items || items.length === 0) {
        return null
    }

    const getEffect = (cost) => {
        if (cost === 50) return "+1 life";
        if (cost === 100) return "+1 level";
        if (cost === 300) return "+2 level";
    }

    return (
        <div>
            <h2>Item shop</h2>
            <table className="shop-table">
                <thead>
                    <tr>
                        <th>Item name</th>
                        <th>Cost</th>
                        <th>Effect</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((i) => (
                        <tr key={i.id}>
                            <td>{i.name}</td>
                            <td>{i.cost} gold</td>
                            <td>{getEffect(i.cost)}</td>
                            <td><button onClick={() => onBuy(i.id)}>Buy</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}