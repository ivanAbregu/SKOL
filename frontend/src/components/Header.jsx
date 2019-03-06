 import {NavLink} from 'react-router-dom';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter}  from 'react-router-dom';

class Header extends Component {
    
    render() {
        let Li = ({url, title} ) => (<li>
                    <NavLink exact activeClassName={"active"} to={url}>
                        <span className={title}>{title}</span>
                    </NavLink>
                </li>)

        return (
        <div className="block">
            <div className="header">
                <a href="" className="btn-link toggle-sidebar hidden-lg-up pg pg-menu" data-toggle="sidebar">
                </a>
                <div className="col-sm-2 inline"></div>
                <div className="col-sm-8  brand inline">
                </div>
                <div className="col-sm-2 d-flex inline align-items-center">
                    <a href="/accounts/logout/" className="clearfix">
                        <span className="pull-right m-t-15">
                            <img src="/static/assets/img/ic_logout.png" className="m-r-10" alt="Cerrar Sesión" />
                            Cerrar Sesión
                        </span>
                    </a>
                </div>
            </div>

            <div className="sub-nav">
                <div className="container full-height">
                    <div className="menu-bar full-height align-items-center">
                        <ul className="full-height">
                            <Li url={"/"} title={"HOME"} />
                            <Li url={"/about"} title={"ABOUT"} />
                            <Li url={"/team"} title={"TEAM"} />
                            <Li url={"/tasks"} title={"TASKS"} />
                            <Li url={"/contact"} title={"CONTACT"} />
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.user
    }
};

export default withRouter(connect(mapStateToProps)(Header));