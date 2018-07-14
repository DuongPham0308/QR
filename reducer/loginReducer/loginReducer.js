import { FETCH_LOGIN_SUCCEEDED, FETCH_LOGIN_FAILED } from '../../actions/loginActions/actionTypes'

const loginReducer = (state = [], actions) => {
    switch(actions.type) {
        case FETCH_LOGIN_SUCCEEDED:
            return actions.receivedData
        case FETCH_LOGIN_FAILED:
            return []
        default:
            return state
    }
}

export { loginReducer }