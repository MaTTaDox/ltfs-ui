import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import authReducer from "../reducers/authReducer";
import fileReducer from "../reducers/fileReducer";
import userReducer from "../reducers/userReducer";

export default (history) => combineReducers({
    auth: authReducer,
    files: fileReducer,
    user: userReducer,
    router: connectRouter(history),
});