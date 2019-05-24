import {CALL_API} from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILURE = 'USER_FAILURE';


export function fetchUser() {
    return {
        [CALL_API]: {
            endpoint: 'user',
            method: 'GET',
            types: [USER_SUCCESS, USER_FAILURE, USER_REQUEST]
        }
    }
}

export function saveUser(body) {
    return {
        [CALL_API]: {
            endpoint: 'user',
            method: 'PATCH',
            body: body,
            types: [USER_SUCCESS, USER_FAILURE, USER_REQUEST]
        }
    }
}

