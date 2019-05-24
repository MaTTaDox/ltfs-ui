import React, {Component, Fragment} from 'react';
import Navigation from "./Navigation";
import {Route, Switch} from "react-router";
import FileList from "../Files/FileList";
import Settings from "../Settings/Settings";

class Router extends Component {

    render() {


        return (
            <Fragment>
                <Navigation/>
                <div className='container'>
                    <Switch>
                        <Route path={this.props.match.url + 'settings'} exact component={Settings}/>
                        <Route path={this.props.match.url} exact component={FileList}/>
                        <Route render={() => (<div>Page not found</div>)}/>
                    </Switch>
                </div>
            </Fragment>
        );
    }
}


export default Router;