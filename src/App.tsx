import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Game from './components/Game'
import Member, { formatTime } from './components/Member'
import UsernameForm from './components/UsernameForm'
import { AddRecordAction, FetchRecordsAction } from './store/actions'
import { GameLoadingStatus, GameStateInterface } from './types'

type gameState = 'start' | 'playing' | 'finished'

function App() {
  const dispatch = useDispatch()
  const { members, status, username } = useSelector((state: GameStateInterface) => state)

  const [state, setState] = useState<gameState>('start')
  const [time, setTime] = useState(0)
  useEffect(() => {
    dispatch(FetchRecordsAction())
  }, [dispatch])

  useEffect(() => {
    if (state === 'playing') setTime(Date.now())
    if (state === 'finished') setTime(Date.now() - time)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

  const handleStart = () => setState('playing')
  const handleFinish = () => {
    setState('finished')
  }
  const handleReturn = () => {
    setState('start')
    dispatch(
      AddRecordAction({
        name: username,
        time,
      })
    )
  }

  return (
    <div className="wrapper">
      <div className="game">
        <h1 className="title">Игра Память</h1>
        {state === 'start' && <UsernameForm />}
        {state === 'start' && (
          <button className="game__button" onClick={handleStart} disabled={!username}>
            Начать
          </button>
        )}
        {state === 'playing' && <Game finish={handleFinish} />}
        {state === 'finished' && (
          <>
            <h3 className="game__end-title">Поздравляю вы прошли игру!</h3>
            <p className="game__end-text">Время прохождения игры состовляет: {formatTime(time)}</p>
            <button className="game__button" onClick={handleReturn}>
              Ок
            </button>
          </>
        )}
      </div>
      <div className="leaderboard">
        <h2 className="title">Таблица лидеров</h2>
        {status === GameLoadingStatus.LOADED ? (
          members.map((member, i) => <Member key={`${member.name}-${i}`} place={i} {...member} />)
        ) : (
          <p className="leaderboard__preload">Данные загружаются</p>
        )}
      </div>
    </div>
  )
}

export default App
