import { FETCH_PRODUCT_SUCCEEDED, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_FAILED } from '../../actions/productActions/actionTypes'
import { put, takeLatest } from 'redux-saga/effects'
import { Api } from '../Api'

function * fetchProduct(action) {
    try {
        const receivedData = yield Api.getProduct(action.params)
        
        yield put({ type: FETCH_PRODUCT_SUCCEEDED, receivedData })
    } catch (error) {
        yield put({ type: FETCH_PRODUCT_FAILED, error })
    }
}

export function * watchFetchProduct() {
    yield takeLatest(FETCH_PRODUCT_REQUEST, fetchProduct)
}