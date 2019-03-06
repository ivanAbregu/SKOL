import React, { Component } from 'react';

import {connect} from "react-redux";
import {Action}  from "./containers/Auth/actions";
import { withRouter } from 'react-router-dom';
import { RouterToUrlQuery } from 'react-url-query';
//import Sidebar from "./components/Navigation/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
//import BreadCrumb from "./components/BreadCrumb";
import PagesRouter from './components/Navigation/PagesRouter'



class App extends Component {

    componentDidMount() {
        this.props.setCurrentUser(this.props.backendContext.user);
    }

    render() {
        return (
            <div className="full-height">
                <Header />
                <div className="page-container">
                    <div className="page-content-wrapper">
                        <div className="content">
                            <div className="container-fluid">
                                <RouterToUrlQuery>
                                    <PagesRouter/>
                                </RouterToUrlQuery>
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.user
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setCurrentUser: (user) => {
            dispatch(Action.setCurrentUser(user));
        },

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
