import Rest from '../core/Rest';

const CALL_API = Symbol('Call API');

const api = store => next => action => {

    const callAPI = action[CALL_API];

    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let {endpoint, types, method = 'GET', parameter = {}, body, header = {}, identifier = null} = callAPI;

    const [successType, errorType, requestType] = types;

    store.dispatch({
        type: requestType,
        identifier: identifier,
    });

    return Rest.fetch({
        endpoint: endpoint,
        method: method,
        parameter: parameter,
        body: body,
        header: header
    }, store.dispatch).then(
        response => {
            return next({
                response: response.response,
                header: response.header,
                identifier: identifier,
                type: successType
            })
        },
        error => {

            let errorText = error.message;

            return next({
                error: errorText || 'There was an error.',
                code: error.code,
                identifier: identifier,
                type: errorType
            });
        }
    )
};

export {CALL_API, api}