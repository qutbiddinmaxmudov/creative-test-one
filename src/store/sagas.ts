import { call, put, takeEvery } from 'redux-saga/effects'
import { flatsApi } from '../services/gameApi'
import { GameActionTypes, GameLoadingStatus, MemberInterface } from '../types'
import { SetRecordsAction, SetRecordsLoadingStatusAction } from './actions'

export function* FetchRecordsRequest() {
  try {
    yield put(SetRecordsLoadingStatusAction(GameLoadingStatus.LOADING))
    const data: MemberInterface[] = yield call(flatsApi.fetchFlats)
    yield put(SetRecordsAction(data))
    yield put(SetRecordsLoadingStatusAction(GameLoadingStatus.LOADED))
  } catch (error) {
    yield put(SetRecordsLoadingStatusAction(GameLoadingStatus.ERROR))
  }
}

export function* watchGameActions() {
  yield takeEvery(GameActionTypes.FETCH_RECORDS, FetchRecordsRequest)
} 
