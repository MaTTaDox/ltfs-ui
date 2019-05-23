import {applyMiddleware, compose, createStore} from 'redux'
import createRootReducer from './reducers'
import {routerMiddleware} from 'connected-react-router'
import thunkMiddleware from 'redux-thunk'
import history from './history';
import {api} from '../middleware/api'

const initialState = {};

const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
        applyMiddleware(
            routerMiddleware(history),
            thunkMiddleware,
            api
        ),
    )
);

export default store;
