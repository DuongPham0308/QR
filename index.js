import { AppRegistry } from 'react-native'
import AppStack from './screen/Router'
import React, { Component } from 'react'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer'
import {
  Platform,
  StyleSheet,
  Text, TouchableOpacity,
  View,
  Image, Dimensions, TextInput, StatusBar
} from 'react-native'
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import rootSaga from './sagas/rootSaga'
import { createLogger } from 'redux-logger'
import { connect } from 'react-redux'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true,
})

const navigationMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.navigationReducer,
  )
const AppNavi = reduxifyNavigator(AppStack, 'root')

const mapStateToProps = state => ({
    state: state.navigationReducer,
})

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, applyMiddleware(
    sagaMiddleware,
    navigationMiddleware,
    logger
))

const AppNavigation = connect(mapStateToProps)(AppNavi)

sagaMiddleware.run(rootSaga)

class BigScreen extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Provider store = {store}>
                <AppNavigation/>
            </Provider>
        )
    }
}
AppRegistry.registerComponent('QR', () => BigScreen);
