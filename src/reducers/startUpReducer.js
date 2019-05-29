
function startUpReducer(state = {
    isFetching: false,
    user: null
}, action) {
    switch (action.type) {
        case 'START_UP':
            return Object.assign({}, state, {
                isStartUp: true
            });
        case 'NO_START_UP':
            return Object.assign({}, state, {
                isStartUp: false
            });
        default:
            return state
    }
}

export default startUpReducer