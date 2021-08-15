import { Action } from 'redux'

export interface MemberInterface {
  id?: number
  name: string
  time: number
}

export enum GameLoadingStatus {
  NEVER = 'NEVER',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR',
}

export interface GameStateInterface {
  username: string
  members: MemberInterface[]
  status: GameLoadingStatus
}

export enum GameActionTypes {
  FETCH_RECORDS = 'FETCH_RECORDS',
  ADD_RECORD = 'ADD_RECORD',
  SET_RECORDS = 'SET_RECORDS',
  ADD_USERNAME = 'ADD_USERNAME',
  SET_RECORDS_LOADING_STATUS = 'SET_RECORDS_LOADING_STATUS',
}

export interface FetchRecordsActionInterface extends Action<GameActionTypes> {
  type: GameActionTypes.FETCH_RECORDS
}

export interface SetRecordsLoadingStatusActionInterface extends Action<GameActionTypes> {
  type: GameActionTypes.SET_RECORDS_LOADING_STATUS
  payload: GameLoadingStatus
}

export interface AddRecordActionInterface extends Action<GameActionTypes> {
  type: GameActionTypes.ADD_RECORD
  payload: MemberInterface
}
export interface SetRecordsActionInterface extends Action<GameActionTypes> {
  type: GameActionTypes.SET_RECORDS
  payload: MemberInterface[]
}

export interface AddUsernameActionInterface extends Action<GameActionTypes> {
  type: GameActionTypes.ADD_USERNAME
  payload: string
}

export type GameActions =
  | FetchRecordsActionInterface
  | AddRecordActionInterface
  | AddUsernameActionInterface
  | SetRecordsLoadingStatusActionInterface
  | SetRecordsActionInterface
