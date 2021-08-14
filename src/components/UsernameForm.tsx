import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AddUsernameAction } from '../store/actions'

const UsernameForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [valid, setValid] = useState(false)
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    setValid(!!e.currentTarget.value)
    setUsername(e.currentTarget.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(AddUsernameAction(username))
    alert(`Привет ${username}`)
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        onInput={handleInputChange}
        className="form__input"
        type="text"
        placeholder="Имя пользователя"
        value={username}
      />
      <button type="submit" className="form__button" disabled={!valid}>
        Подтвердить
      </button>
    </form>
  )
}

export default UsernameForm
