import React, { Component } from 'react';
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'


class Users extends Component {

    render() {
        return (
            <div>
                <BreadcrumbsItem to='/usuarios'>Usuarios</BreadcrumbsItem>
                <h3>Usuarios</h3>
            </div>
        )
    }
}

export default Users
