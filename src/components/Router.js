import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import OverviewRouter from "./Dashboard/Router";
import Login from "./Login/Login";

class Router extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={OverviewRouter}/>
                    <Route render={() => (<div>Page not found</div>)}/>
                </Switch>
            </div>
        );
    }
}


export default Router;