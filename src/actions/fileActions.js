import {CALL_API} from '../middleware/api'

export const FILES_REQUEST = 'FILES_REQUEST';
export const FILES_SUCCESS = 'FILES_SUCCESS';
export const FILES_FAILURE = 'FILES_FAILURE';


export function fetchFiles() {
    return {
        [CALL_API]: {
            endpoint: 'files',
            method: 'GET',
            types: [FILES_SUCCESS, FILES_FAILURE, FILES_REQUEST]
        }
    }
}

