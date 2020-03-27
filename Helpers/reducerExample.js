function monReducer (state, action) {
    let nextState
    switch(action.type) {
        case 'ACTION_1':
            nextState = {
                ...state,
                value: action.value
            }
            return nextState
        case 'ACTION_2':
            nextState = {
                ...state,
                value: action.value
            }
            return nextState
        //...
        default:
            return state
    }
}
