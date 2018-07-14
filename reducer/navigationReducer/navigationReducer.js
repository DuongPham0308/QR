import  AppStack from '../../screen/Router'
import { NavigationActions } from 'react-navigation'
import { FETCH_LOGIN_SUCCEEDED } from '../../actions/loginActions/actionTypes'

const thirdAction = AppStack.router.getActionForPathAndParams('Main')
const tempNavState = AppStack.router.getStateForAction(thirdAction)

const initialNavState = AppStack.router.getStateForAction(
  tempNavState
)

function navigationReducer(state = initialNavState, action) {
  let nextState
  switch (action.type) {
    case FETCH_LOGIN_SUCCEEDED:
      nextState = AppStack.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      )
      break
    default:
      nextState = AppStack.router.getStateForAction(action, state)
      break
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state
}

export default navigationReducer