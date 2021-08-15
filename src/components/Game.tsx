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
  faGitAlt,
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
  faGitAlt,
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
  const [blockClick, setBlockClick] = useState(false)

  const handleCardClick = (card: WatchingCardsInterface) => {
    // Если уже открыто 2 карточки то больше не открываются или если нажатие заблокировано
    if (openedCards.length >= 2 || blockClick) return
    // Добавляем в state карту на которую нажали
    setOpenedCards([...openedCards, card])
    // setTimeout(() => setOpenedCards(openedCards.filter((cardNum) => cardNum !== number)), 5000)
  }

  useEffect(() => {
    if (blockClick && deletedCards.length !== 36) setTimeout(() => setBlockClick(false), 1000)
  }, [blockClick, deletedCards])

  useEffect(() => {
    // Ставим не большую задержку что бы мы успевали увидить карточку
    setTimeout(() => {
      // Если 2 карты открыто то сравниваем их между собой
      if (openedCards.length === 2) {
        const [cardOne, cardTwo] = openedCards
        // Если карты равны то
        if (cardOne.icon === cardTwo.icon) {
          // Добавляем их в массив удалённых
          setDeletedCards([...deletedCards, cardOne.icon])
          // Блокируем нажатие
          setBlockClick(true)
        }
        // И очищаем массив открытых карточек
        setOpenedCards([])
      }

      // Если в массиве уже 36 элементов то заканчиваем игру
      if (deletedCards.length === 36) finish()
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openedCards, deletedCards])

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
