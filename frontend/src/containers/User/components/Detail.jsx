import React, { Component } from 'react';
import {connect} from "react-redux";
import {Action} from "../actions";
import {BreadcrumbsItem} from 'react-breadcrumbs-dynamic'
import Pagination from "rc-pagination";
import PropTypes from 'prop-types';
import "rc-pagination/assets/index.css";
import {
    addUrlProps,
    replaceInUrlQuery
} from "react-url-query";
import "react-select/dist/react-select.css";
import { Table, Divider, Card, Avatar } from 'antd';
import moment from 'moment';
const CONST_FORMAT_HOUR = 'DD/MM/YYYY HH:mm';

class Page extends Component {

  render() {
    const { history } = this.props;
    const obj = history.location.state.obj;
    return (
      <div>
          <BreadcrumbsItem to='/'>Detalle de Beneficio</BreadcrumbsItem>
          <Card title={obj.title} bordered={true} className="t-w-700 margin-auto">
            <ul>
              <li><b>Autor:</b> {obj.owner_full_name}</li>
              <li><b>Fecha de creacion:</b> {moment(obj.created_at).format(CONST_FORMAT_HOUR)}</li>
              <li><b>Descripcion:</b> {obj.description}</li>
              <li><b>Fecha de finalizacion:</b> {moment(obj.end_date).format(CONST_FORMAT_HOUR)}</li>

            
              <li><b>Archivo adjunto</b>
              <div>

                <img  style={{ width: 200, height:200 }} src={obj.Attach_file} />
            </div>
            </li>
            </ul>  
          </Card>
      </div>
    )
  }
}

export default Page;

