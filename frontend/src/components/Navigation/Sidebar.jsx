import {Link} from 'react-router-dom';
import { Icon } from 'antd';
import React, { Component } from 'react';
import {connect} from "react-redux";
import {Route, Switch,withRouter } from 'react-router-dom';


import {visibleOnlyCAorA,visibleExcludeDistributor} from "../../containers/Auth/auth";

const UsuariosLink = visibleOnlyCAorA(() => (
    <div>
    <li className="menu-section block-section">
    <span>Configuraciones</span>
    </li>
     <li>
        <span className="icon-thumbnail "><i data-feather="users"></i></span>
        <Link to="/usuarios" className="detailed" >
            <span className="title">Usuarios</span>
        </Link>
    </li></div>
));

class Sidebar extends Component {
    render() {
        let Li = ({url, title} ) => (<li>
                    <span className="icon-thumbnail "><Icon type="schedule" /></span>
                    <Link to={url} className="detailed" >
                        <span className="title">{title}</span>
                    </Link>
                </li>)
    return (
        <nav className="page-sidebar" data-pages="sidebar">
            <div className="sidebar-overlay-slide from-top" id="appMenu">
            </div>
            <div className="sidebar-header logo-pm">
            </div>
            <div className="sidebar-menu p-t-40">
                <ul className="menu-items">
                    <li className="menu-section first">
                        <span>Actividad</span>
                    </li>
                    
                    <Li url={"/"} title={"apto medico"} />

                    <li>
                        <a href="/accounts/logout/" className="clearfix bg-master-lighter dropdown-item logout">
                            <span className="icon-thumbnail "><i data-feather="log-out"></i></span>
                            <span className="pull-left">Cerrar Sesión</span>
                        </a>
                    </li>
                </ul>
                <div className="clearfix"></div>
            </div>
        </nav>
    )
}
}
const mapStateToProps = state => {
    return {
        auth: state.user
    }
};

export default withRouter(connect(mapStateToProps)(Sidebar));

