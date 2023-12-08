import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';

const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active', 'finished'
  status: 'loading',
  initialIndex: 0,
  answer: null,
  points: 0,
  highscore: 0
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready'
      };
    case 'dataFailed':
      return {
        ...state,
        status: 'error'
      }
    case 'start':
      return {
        ...state,
        status: 'active'
      }
    case 'newAnswer':
      const question = state.questions.at(state.initialIndex);

      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points : state.points
      }
    case 'nextQuestion':
      return {
        ...state,
        initialIndex: state.initialIndex + 1,
        answer: null
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      }
    default:
      throw new Error('Action unknown')
  }
}

function App() {
  const [{ questions, status, initialIndex, answer, points, highscore }, dispatch] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(function () {
    fetch('http://localhost:7000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === 'active' && (
          <>
            <Progress
              initialIndex={initialIndex}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[initialIndex]}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              initialIndex={initialIndex}
            />
          </>
        )}
        {status === 'finished' && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} />}
      </Main>
    </div>
  );
}

export default App;