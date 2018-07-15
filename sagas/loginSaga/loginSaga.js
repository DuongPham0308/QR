import { FETCH_LOGIN_SUCCEEDED, FETCH_LOGIN_REQUEST, FETCH_LOGIN_FAILED } from '../../actions/loginActions/actionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { Api } from '../Api'

function * fetchLogin(action) {
    try {
        const receivedData = yield Api.login(action.params)

        if (receivedData.ketqua === true) {
            yield put({ type: FETCH_LOGIN_SUCCEEDED, receivedData })
        } else {
            yield put({ type: FETCH_LOGIN_FAILED })
            alert('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại, xin cảm ơn!')
        }
    } catch (error) {
        yield put({ type: FETCH_LOGIN_FAILED, error })
        alert('Tên đăng nhập hoặc mật khẩu không chính xác. Vui lòng thử lại, xin cảm ơn!')
    }
}

export function * watchFetchLogin() {
    yield takeLatest(FETCH_LOGIN_REQUEST, fetchLogin)
}