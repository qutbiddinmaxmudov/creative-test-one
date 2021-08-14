import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import { WatchingCardsInterface } from './Game'

interface GameCardProps {
  icon: IconDefinition
  number: number
  handler: (props: WatchingCardsInterface) => void
  deleted?: boolean
  opened?: boolean
}

const GameCard: React.FC<GameCardProps> = ({ icon, deleted, opened, number, handler }) => {
  const handleClick = () => handler({ number, icon })

  return (
    <div onClick={handleClick} className={`game__card ${deleted ? 'deleted' : ''} ${opened ? 'opened' : ''}`}>
      <FontAwesomeIcon icon={icon} />
    </div>
  )
}

export default GameCard
