import produce, { Draft } from 'immer'
import { GameActions, GameActionTypes, GameLoadingStatus, GameStateInterface } from '../types'

const initialGameState: GameStateInterface = {
  username: '',
  members: [],
  status: GameLoadingStatus.NEVER,
}

export const gameReducer = produce((draft: Draft<GameStateInterface>, action: GameActions) => {
  switch (action.type) {
    case GameActionTypes.SET_RECORDS:
      draft.members = action.payload
      break
    case GameActionTypes.ADD_RECORD:
      draft.members.push(action.payload)
      break
    case GameActionTypes.ADD_USERNAME:
      draft.username = action.payload
      break
    case GameActionTypes.SET_RECORDS_LOADING_STATUS:
      draft.status = action.payload
      break
    default:
      break
  }
}, initialGameState)
