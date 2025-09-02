export default function ReputationBoard({ reputation }) {
    if (!reputation) {
        return <p>No reputation data</p>
    }

    return (
        <div>
            <h2>Reputation</h2>
            <ul>
                <li>People: {reputation.people}</li>
                <li>State: {reputation.state}</li>
                <li>Underworld: {reputation.underworld}</li>
            </ul>
        </div>
    )
}