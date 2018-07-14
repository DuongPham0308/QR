import { fork } from 'redux-saga/effects'
import { watchFetchLogin } from './loginSaga/loginSaga'
import { watchFetchProduct } from './productSaga/productSaga'

export default function * rootSaga() {
    yield fork(watchFetchLogin)
    yield fork(watchFetchProduct)
}