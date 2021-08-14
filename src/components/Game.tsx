import React, { useEffect, useState } from 'react'
import GameCard from './GameCard'
import {
  faNodeJs,
  faReact,
  faAngular,
  faVuejs,
  faHtml5,
  faCss3,
  faGulp,
  faJs,
  faGit,
  faGithub,
  faStackOverflow,
  faAutoprefixer,
  faBootstrap,
  faChrome,
  faFigma,
  faFontAwesome,
  faSass,
  faUbuntu,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons'

const icons = [
  faNodeJs,
  faReact,
  faAngular,
  faVuejs,
  faHtml5,
  faCss3,
  faGulp,
  faJs,
  faGit,
  faGithub,
  faStackOverflow,
  faAutoprefixer,
  faBootstrap,
  faChrome,
  faFigma,
  faFontAwesome,
  faSass,
  faUbuntu,
]

const getRandomNum = (max: number, min = 0) => Math.floor(Math.random() * (max - min + 1) + min)

const randomCardsGenerator = () => {
  const allIcons = [...icons, ...icons]
  const generatedIcons: IconDefinition[] = []
  while (allIcons.length) {
    const iconNum = getRandomNum(allIcons.length - 1)
    const randomlyTakedIcon = allIcons.splice(iconNum, 1)
    generatedIcons.push(randomlyTakedIcon[0])
  }
  return generatedIcons
}

export interface WatchingCardsInterface {
  icon: IconDefinition
  number: number
}

interface gameProps {
  finish: () => void
}

const Game: React.FC<gameProps> = ({ finish }) => {
  const [gameIcons] = useState(randomCardsGenerator())
  const [deletedCards, setDeletedCards] = useState<IconDefinition[]>([])
  const [openedCards, setOpenedCards] = useState<WatchingCardsInterface[]>([])

  const handleCardClick = (card: WatchingCardsInterface) => {
    // Если уже открыто 2 карточки то больше не открываются
    if (openedCards.length >= 2) return
    // Добавляем в state карту на которую нажали
    setOpenedCards([...openedCards, card])

    // setTimeout(() => setOpenedCards(openedCards.filter((cardNum) => cardNum !== number)), 5000)
  }

  useEffect(() => {
    setTimeout(() => {
      if (openedCards.length === 2) {
        const [cardOne, cardTwo] = openedCards
        if (cardOne.icon === cardTwo.icon) {
          setDeletedCards([...deletedCards, cardOne.icon])
          setOpenedCards([])
        } else {
          setOpenedCards([])
        }
      }
      if (deletedCards.length === 18) finish()
    }, 1000)
  }, [openedCards, deletedCards, finish])

  return (
    <div className="game__board">
      {gameIcons.map((icon, i) => (
        <GameCard
          icon={icon}
          key={i}
          number={i}
          opened={openedCards.some((item) => item.number === i)}
          deleted={deletedCards.includes(icon)}
          handler={handleCardClick}
        ></GameCard>
      ))}
    </div>
  )
}

export default Game
