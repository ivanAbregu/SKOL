import React from 'react';
import {Breadcrumbs} from 'react-breadcrumbs-dynamic'
import {NavLink} from 'react-router-dom';

const BreadCrumb = () => {

    return (
        <div className=" container-fluid container-fixed-lg sm-p-l-0 sm-p-r-0">
            <div className="inner">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <Breadcrumbs
                        container={'li'}
                        item={NavLink}
                        className="breadcrumb-item"
                        finalItem={'a'}

                    />
                </ol>
            </div>
        </div>
    )
}

export default BreadCrumb
