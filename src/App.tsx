import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Game from './components/Game'
import Member from './components/Member'
import UsernameForm from './components/UsernameForm'
import { FetchRecordsAction } from './store/actions'
import { GameLoadingStatus, GameStateInterface } from './types'

type gameState = 'start' | 'playing' | 'finished'

function App() {
  const dispatch = useDispatch()
  const { members, status } = useSelector((state: GameStateInterface) => state)

  const [state, setState] = useState<gameState>('start')

  useEffect(() => {
    dispatch(FetchRecordsAction())
  }, [dispatch])

  const handleStart = () => setState('playing')
  const handleFinish = () => setState('finished')
  const handleReturn = () => setState('start')

  return (
    <div className="wrapper">
      <div className="game">
        <h1 className="title">Игра Память</h1>
        <UsernameForm />
        {state === 'start' && (
          <button className="game__button" onClick={handleStart}>
            Начать
          </button>
        )}
        
        {state === 'playing' && (
          <Game finish={handleFinish} />
        )}
        
        {state === 'finished' && (
          <button className="game__button" onClick={handleReturn}>
            Ок
          </button>
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
