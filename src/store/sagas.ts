import { call, put, takeEvery } from 'redux-saga/effects'
import { gameApi } from '../services/gameApi'
import { AddRecordActionInterface, GameActionTypes, GameLoadingStatus, MemberInterface } from '../types'
import { FetchRecordsAction, SetRecordsAction, SetRecordsLoadingStatusAction } from './actions'

export function* FetchRecordsRequest() {
  try {
    yield put(SetRecordsLoadingStatusAction(GameLoadingStatus.LOADING))
    const data: MemberInterface[] = yield call(gameApi.fetchRecords)
    yield put(SetRecordsAction(data))
    yield put(SetRecordsLoadingStatusAction(GameLoadingStatus.LOADED))
  } catch (error) {
    yield put(SetRecordsLoadingStatusAction(GameLoadingStatus.ERROR))
  }
}

export function* AddRecordRequest({ payload }: AddRecordActionInterface) {
  try {
    yield put(SetRecordsLoadingStatusAction(GameLoadingStatus.LOADING))
    yield call(gameApi.addNewRecord, payload)
    yield put(FetchRecordsAction())
  } catch (error) {
    yield put(SetRecordsLoadingStatusAction(GameLoadingStatus.ERROR))
  }
}

export function* watchGameActions() {
  yield takeEvery(GameActionTypes.FETCH_RECORDS, FetchRecordsRequest)
  yield takeEvery(GameActionTypes.ADD_RECORD, AddRecordRequest)
}
