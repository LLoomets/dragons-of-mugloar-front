import "./Shop.css";

export default function Shop({ items, onBuy }) {
    if (!items || items.length === 0) {
        return null
    }

    return (
        <div>
            <h2>Item shop</h2>
            <table className="shop-table">
                <thead>
                    <tr>
                        <th>Item name</th>
                        <th>Cost</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((i) => (
                        <tr key={i.id}>
                            <td>{i.name}</td>
                            <td>{i.cost} gold</td>
                            <td><button onClick={() => onBuy(i.id)}>Buy</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}