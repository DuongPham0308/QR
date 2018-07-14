import { fork } from 'redux-saga/effects'
import { watchFetchLogin } from './loginSaga/loginSaga'
export default function * rootSaga() {
    yield fork(watchFetchLogin)
}