
export const BoardScore = ({ scores, user }) => {

    if (typeof scores === 'undefined') {
        return null
    } else if (scores.length === 0) {
        return null
    }

    if(!scores){
        return (
            <div className="bg-danger boardScore">
                <p>No hay ningun registro que mostrar</p>
            </div>
        )
    }
    
    return (
        <>
            <div className="bg-danger boardScore">
                <ol>
                    {scores.sort((a, b) => b.score - a.score).map(score => <li key={score.id} className={user.username === score.user.username ? 'text-warning' : ''} >{`${score.user.username}: ${score.score}`}</li>)}
                </ol>
            </div>
        </>
    )
};