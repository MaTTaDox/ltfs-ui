import React, {Suspense} from 'react'
import {ConnectedRouter} from 'connected-react-router'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createMuiTheme} from "@material-ui/core";
import Router from "./Router";

import '../styles/style.css';


const theme = createMuiTheme({
    palette: {
        type: 'dark',
    }
});

const App = ({history}) => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Suspense fallback="loading">
            <ConnectedRouter history={history}>
                <Router/>
            </ConnectedRouter>
        </Suspense>
    </MuiThemeProvider>
);

export default App