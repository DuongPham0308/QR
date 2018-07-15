import { FETCH_LOGIN_SUCCEEDED, FETCH_LOGIN_FAILED } from '../../actions/loginActions/actionTypes'

const logReducer = (state = [], actions) => {
    switch(actions.type) {
        case FETCH_LOGIN_SUCCEEDED:
            return actions.receivedData
        case FETCH_LOGIN_FAILED:
            return []
        default:
            return state
    }
}

//Redux persist
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const config = {
    key: "root",
    storage,
    debug: true
}
const loginReducer = persistReducer(config, logReducer)

export { loginReducer }