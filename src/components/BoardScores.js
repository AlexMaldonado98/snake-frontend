export const BoardScore = ({ scores }) => {

    if (typeof scores === 'undefined') {
        return null
    } else if (scores.length === 0) {
        return null
    }

    return (
        <>
            <div className="bg-danger boardScore">
                <ol>
                    {scores.sort((a, b) => b.score - a.score).map(score => <li key={score.id}>{`${score.user.username}: ${score.score}`}</li>)}
                </ol>
            </div>
        </>
    )
};