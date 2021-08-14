import React from 'react'
import { MemberInterface } from '../types'

interface MemberProps extends MemberInterface {
  place: number
}

const formatTime = (time: string) => {
  const addZero = (num: number) => (num < 10 ? '0' + Math.trunc(num) : Math.trunc(num))
  const noMS = +time / 1000
  const minutes = addZero(noMS / 60)
  const seconds = addZero(noMS % 60)
  const ms = +time % 1000
  return `${minutes}:${seconds}:${ms}`
}

const Member: React.FC<MemberProps> = ({ place, name, time }) => {
  return (
    <div className="member">
      <span className="member__place">{place+1}</span>
      <span className="member__name">{name}</span>
      <span className="member__time">{formatTime(time)}</span>
    </div>
  )
}

export default Member
