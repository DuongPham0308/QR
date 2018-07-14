var axios = require('axios')
var querystring = require('qs')

const baseURL = 'http://125.253.123.20/managedevice/group.php'

function * login(params) {
    const response = yield axios.post(baseURL, 
        querystring.stringify(
            params
        ), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    const result = yield response.status === 200 ? response.data : []
    return result
}

function * getProduct(params) {
    const response = yield axios.post(baseURL, 
        querystring.stringify(
            params
        ), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    const result = yield response.status === 200 ? response.data : []
    return result
}

export const Api = {
    login,
    getProduct
}