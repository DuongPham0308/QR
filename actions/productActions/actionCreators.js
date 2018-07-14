import { FETCH_PRODUCT_SUCCEEDED, FETCH_PRODUCT_REQUEST, FETCH_PRODUCT_FAILED } from './actionTypes'

const fetchProductAction = (params) => {
    return {
        type: FETCH_PRODUCT_REQUEST,
        params
    }
}

const fetchProductSuccessAction = (receivedData) => {
    return {
        type: FETCH_PRODUCT_SUCCEEDED,
        receivedData
    }
}

const fetchProductFailedAction = (error) => {
    return {
        type: FETCH_PRODUCT_FAILED,
        error
    }
}

export { fetchProductAction, fetchProductSuccessAction, fetchProductFailedAction }