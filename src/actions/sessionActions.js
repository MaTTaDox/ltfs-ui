import {push} from 'connected-react-router';
import Rest from "../core/Rest";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESET = 'LOGIN_RESET';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        token: user.token
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message: message
    }
}

export function loginUser(creds, redirect = '/') {

    return dispatch => {

        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));

        return Rest.fetch({
            endpoint: 'api/google_login',
            method: 'POST',
            body: creds,
        }, dispatch).then(
            response => {
                const user = response.response;
                localStorage.setItem('token', user.token);
                // Dispatch the success action
                dispatch(receiveLogin(user));
                if (!redirect) {
                    redirect = '/';
                }

                dispatch({
                    type: 'REMOVE_ALL_ALERT',
                });

                dispatch(push(redirect))
            },
            error => {
                dispatch(loginError(error.message));

            }
        ).catch(err => {
            dispatch(loginError(err.message))
        });
    }
}

export function resetLogin() {
    return dispatch => dispatch({
        type: LOGIN_RESET
    });
}
