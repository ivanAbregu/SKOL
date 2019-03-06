import React, { Component } from 'react';

import {Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import NotFound from "../NotFound";

import Task_page from "../../containers/Task/Page"
import Task_new from "../../containers/Task/components/NewForm"
import Task_detail from "../../containers/Task/components/Detail"
import Task_update from "../../containers/Task/components/UpdateForm"

import {connect} from "react-redux";
import {userIsAuthenticated} from "../../containers/Auth/auth";

class PagesRouter extends Component {

    render() {
        return (
            <Switch>
                <Route exact
                       path="/tasks"
                       component={userIsAuthenticated(Task_page)} />
                <Route exact
                       path="/detail-task"
                       component={userIsAuthenticated(Task_detail)} />
                <Route exact
                       path="/new-task"
                       component={userIsAuthenticated(Task_new)} />
                <Route exact
                       path="/update-task"
                       component={userIsAuthenticated(Task_update)} />
                

                <Route component={NotFound} />
            </Switch>
      );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.user
    }
};

export default withRouter(connect(mapStateToProps)(PagesRouter));
