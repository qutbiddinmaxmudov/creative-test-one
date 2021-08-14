import { GameActionTypes, GameLoadingStatus, MemberInterface } from '../types'

export const FetchRecordsAction = () => ({
  type: GameActionTypes.FETCH_RECORDS,
})

export const AddRecordAction = (payload: MemberInterface) => ({
  type: GameActionTypes.ADD_RECORD,
  payload,
})

export const SetRecordsAction = (payload: MemberInterface[]) => ({
  type: GameActionTypes.SET_RECORDS,
  payload,
})

export const SetRecordsLoadingStatusAction = (payload: GameLoadingStatus) => ({
  type: GameActionTypes.SET_RECORDS_LOADING_STATUS,
  payload,
})

export const AddUsernameAction = (payload: string) => ({
  type: GameActionTypes.ADD_USERNAME,
  payload,
})
