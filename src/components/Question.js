import React from 'react'
import Option from './Options';


function Question({ question, dispatch, answer }) {
  console.log(question);
  return (
    <div>
      <h1>{question.question}</h1>

      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Question