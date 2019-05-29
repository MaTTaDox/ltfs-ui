import {push} from "connected-react-router";
import fetch from 'fetch-retry';

const BASE_URL = '/api/';

export default class Rest {

    // Now you can write your own methods easily
    static fetch(options, dispatch) {

        const {endpoint, method = 'GET', parameter = {}, header = {}, body, auth = true} = options;

        const token = localStorage.getItem('token') || null;

        let config = {
            method: method
        };

        if (auth && token) {
            header.Authorization = `Bearer ${token}`
        } else if (auth) {
            dispatch(push('/login'));
        }


        header['Accept'] = 'application/json';

        if (typeof body !== 'undefined') {
            config.body = JSON.stringify(body);
            header['Content-Type'] = 'application/json';
        }

        config.headers = header;

        let params = '';
        if (Object.keys(parameter).length) {
            for (const key in parameter) {
                if (typeof parameter[key] !== 'object') {
                    continue;
                }

                for (const objectKey in  parameter[key]) {
                    if (typeof parameter[key][objectKey] === 'undefined') {
                        continue;
                    }

                    parameter[key + '[' + objectKey + ']'] = parameter[key][objectKey];
                }

                delete parameter[key];
            }

            params = '?' + (new URLSearchParams(parameter));
        }

        config.retryDelay = 10000;
        config.retryOn = (attempt, error, response) => {
            if (response.status === 503) {
                dispatch({
                    type: 'START_UP'
                });

                return true

            } else {
                dispatch({
                    type: 'NO_START_UP'
                });

                return false;
            }
        };

        return fetch(BASE_URL + endpoint + params, config)
            .then(response => {
                return response.json().then((text) => ({text, response}), (e) => {
                    dispatch({
                        type: 'ADD_ALERT',
                        message: e.message,
                        code: response.status,
                        style: 'danger'
                    });

                    return Promise.reject({
                        message: e.message,
                        code: response.status,
                        header: response.header
                    })
                })
            }).then(({text, response}) => {
                if (response.status === 401 && auth) {
                    dispatch(push('/login'));
                }

                if (!response.ok) {

                    let errorText = text.error.message;
                    if (!errorText) {
                        errorText = "Ein Fehler ist aufgetreten";
                    }

                    if (response.status === 403) {
                        errorText = 'Du hast keine Berechtigung für diese Aktion'
                    }

                    dispatch({
                        type: 'ADD_ALERT',
                        message: errorText,
                        code: response.status,
                        style: 'danger'
                    });

                    return Promise.reject({
                        message: errorText,
                        raw: text,
                        code: response.status,
                        header: response.header
                    })
                }

                return {
                    response: text,
                    header: response.header
                }
            })
    }


};