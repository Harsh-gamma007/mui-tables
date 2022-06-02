import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_USERS_SUCCESS,
  GET_USERS_FAILED, 
  GET_USERS_REQUESTED } from "../actions/constant";
import getUserDataService from '../services/user';

function* fetchUsers(action) {
  try {
    const users = yield call(getUserDataService);
    yield put({ type: GET_USERS_SUCCESS, users: users})
  } catch(e) {
    yield put({type: GET_USERS_FAILED, message: e.message})
  }
}

function* userSaga() {
  yield takeEvery(GET_USERS_REQUESTED, fetchUsers)
}

export default userSaga