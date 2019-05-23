import React from 'react';
import {Provider} from 'react-redux'
import App from './components/App';
import {history, store} from './core'
import ReactDOM from 'react-dom';

import './i18n';
import './core/fontAwesome';

const render = () => { // this function will be reused
    ReactDOM.render(
            <Provider store={store}>
                <App history={history}/> { /* pass history object as props */}
            </Provider>,
        document.getElementById('root')
    )
};

render();