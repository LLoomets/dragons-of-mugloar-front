export default function ReputationBoard({ game, reputation, onInvestigate }) {
    if (!game) return null;

    return (
        <div>
            <h2>Run an investigation about your reputation</h2>
            {!reputation ? (
                <button onClick={onInvestigate}>Investigate reputation</button>
            ): (
                <ul>
                    <li>People: {reputation.people}</li>
                    <li>State: {reputation.state}</li>
                    <li>Underworld: {reputation.underworld}</li>
                </ul>
            )}
            
        </div>
    )
}