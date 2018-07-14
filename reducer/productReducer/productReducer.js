import { FETCH_PRODUCT_SUCCEEDED, FETCH_PRODUCT_FAILED } from '../../actions/productActions/actionTypes'

const productReducer = (state = [], actions) => {
    switch(actions.type) {
        case FETCH_PRODUCT_SUCCEEDED:
            return actions.receivedData
        case FETCH_PRODUCT_FAILED:
            return []
        default:
            return state
    }
}

export { productReducer }