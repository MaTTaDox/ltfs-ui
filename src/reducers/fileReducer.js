import {
    FILES_FAILURE, FILES_REQUEST, FILES_SUCCESS
} from '../actions/fileActions'

function fileReducer(state = {
    isFetching: false,
    files: []
}, action) {
    switch (action.type) {
        case FILES_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FILES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                files: action.response
            });
        case FILES_FAILURE:
            return Object.assign({}, state, {
                error: action.error,
                isFetching: false,
            });
        default:
            return state
    }
}

export default fileReducer