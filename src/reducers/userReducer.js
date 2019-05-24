import {USER_FAILURE, USER_REQUEST, USER_SUCCESS} from '../actions/userActions'

function userReducer(state = {
    isFetching: false,
    user: null
}, action) {
    switch (action.type) {
        case USER_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case USER_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                user: action.response
            });
        case USER_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
            });
        default:
            return state
    }
}

export default userReducer