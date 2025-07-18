import { useContext, useEffect } from 'react'

import { QuizContext } from './store/context';
import type { QuizContextType } from './types/store';

import reactLogo from '/react.svg'
import './App.css'
import { formatTime } from './utils/timer';

function WelcomeScreen() {
  const { dispatch } = useContext<QuizContextType>(QuizContext);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>React Quiz</h1>
      </div>
      <div className="card">
        <button onClick={() => dispatch({ type: "start-quiz", payload: true })}>
          Start The Quiz
        </button>
      </div>
    </>
  );
}

function App() {
  const { state, dispatch } = useContext<QuizContextType>(QuizContext);

  useEffect(() => {
    if(!state.started || state.roundEnded) return;

    const id = setInterval(() => {
      dispatch({ type: "set-time", payload: Math.max(0, state.time - 1000) });
    }, 1000);

    return () => clearInterval(id);
  }, [dispatch, state.roundEnded, state.started, state.time]);

  useEffect(() => {
    if(state.time > 0) return;
    if(state.roundEnded) return;

    dispatch({ type: "set-score", payload: state.score - 1 });
    dispatch({ type: "set-round-ended", payload: true });
  }, [dispatch, state.currentQuestion, state.roundEnded, state.score, state.time]);

  function chooseOption(index: number) {
    const isRight = state.questions[state.currentQuestion].correctAnswerIndex === index;

    dispatch({ type: "set-score", payload: state.score + (isRight ? 1 : -1) });
    dispatch({ type: "set-round-ended", payload: true });
  }
  
  function onNextQuestion() {
    const isLast = state.currentQuestion === state.questions.length - 1;

    if(!isLast) {
      dispatch({ type: "set-time", payload: 60 * 1000 });
      dispatch({ type: "set-current-question", payload: state.currentQuestion + 1 });
      dispatch({ type: "set-round-ended", payload: false });
    }
  }

  return (
    <section>
      {state.started ? (
        <>
          <header className='topbar'>
            <div>
              Time: {formatTime(state.time)}
            </div>
            <div>
              Score: {state.score}
            </div>
          </header>
          <div className="card">
            <h1>{state.questions[state.currentQuestion].question}</h1>
            <div className='holder'>
              {state.questions[state.currentQuestion].options.map((o, id) => (
                <button disabled={state.roundEnded} className={state.roundEnded ? (id === state.questions[state.currentQuestion].correctAnswerIndex ? "success" : "error") : undefined} onClick={() => chooseOption(id)}>
                  {o}
                </button>
              ))}
            </div>
            {state.roundEnded && (
              <div className='footer'>
                <button onClick={onNextQuestion}>Next Question</button>
              </div>
            )}
          </div>
        </>
      ) : (
        <WelcomeScreen />
      )}
    </section>
  )
}

export default App
