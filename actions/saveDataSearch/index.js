saveDataSearch = (navigate, params) => {
    return {
        type:'saveDataSearch',
        value:navigate,
        isSearch: params
    }
}

export {saveDataSearch}