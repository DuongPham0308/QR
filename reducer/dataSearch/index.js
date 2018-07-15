export default (state = [],actions) => {
    switch(actions.type){
        case 'saveDataSearch':
            return {
                value: actions.value, isSearch: actions.isSearch
            }
        default:return state
    }
}