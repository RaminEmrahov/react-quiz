import React from 'react'

function Progress({ initialIndex, numQuestions, points, maxPossiblePoints, answer }) {
    return (
        <header className='progress'>
            <progress max={numQuestions} value={initialIndex + Number(answer !== null)}></progress>

            <p>Question <strong>{initialIndex + 1}</strong> / {numQuestions}</p>

            <p><strong>{points}</strong> / {maxPossiblePoints}</p>
        </header>
    )
}

export default Progress