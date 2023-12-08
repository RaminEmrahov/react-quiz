import React from 'react'

function NextButton({ dispatch, answer, initialIndex, numQuestions }) {
    if (answer === null) return null;

    if (initialIndex < numQuestions - 1) return (
        <button className='btn btn-ui' onClick={() => dispatch({ type: 'nextQuestion' })}>Next</button>
    )

    if (initialIndex === numQuestions - 1) return (
        <button className='btn btn-ui' onClick={() => dispatch({ type: 'finish' })}>Finish</button>
    )
}

export default NextButton