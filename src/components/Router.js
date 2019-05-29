import React, {Component} from 'react';
import {Route, Switch} from "react-router";
import OverviewRouter from "./Dashboard/Router";
import Login from "./Login/Login";
import {compose} from "redux";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";
import StartUp from "./StartUp";

class Router extends Component {
    render() {

        if(this.props.startUp.isStartUp)
        {
            return <StartUp />
        }

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


function mapStateToProps(state) {

    let {startUp} = state;

    if(typeof startUp == 'undefined')
    {
        startUp = {};
    }

    return {startUp}
}

export default compose(
    withTranslation(),
    connect(mapStateToProps, null))(Router);