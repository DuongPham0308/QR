import { FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCEEDED, FETCH_LOGIN_FAILED } from './actionTypes'

const fetchLoginAction = (params) => {
    return {
        type: FETCH_LOGIN_REQUEST,
        params
    }
}

const fetchLoginSuccessAction = (receivedData) => {
    return {
        type: FETCH_LOGIN_SUCCEEDED,
        receivedData
    }
}

const fetchLoginFailedAction = (error) => {
    return {
        type: FETCH_LOGIN_FAILED,
        error
    }
}

export { fetchLoginAction, fetchLoginSuccessAction, fetchLoginFailedAction }