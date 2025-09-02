export default function ReputationBoard({ reputation }) {
    if (!reputation) {
        return null
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