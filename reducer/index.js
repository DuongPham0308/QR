import {combineReducers} from 'redux'
import navigate from './reducerState'
import saveCart from './numberCart'
import saveDataSearch from './dataSearch'
import savePointData from './reducerSavePoint'
import saveQuantityData from './reducerSaveQuantity'
import { loginReducer } from './loginReducer/loginReducer'
import navigationReducer from './navigationReducer/navigationReducer'
export default combineReducers({
    stack:navigate,
    numberCart:saveCart,
    dataSearch:saveDataSearch,savePointData,saveQuantityData,
    loginReducer,
    navigationReducer
})