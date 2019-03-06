import React, {Component} from "react";
import {connect} from "react-redux";
import {Action} from "./actions";
import {BreadcrumbsItem} from "react-breadcrumbs-dynamic";
import Pagination from "rc-pagination";
import PropTypes from 'prop-types';
import "rc-pagination/assets/index.css";
import {
    decode, addUrlProps,
    UrlQueryParamTypes,
    replaceInUrlQuery
} from "react-url-query";
import "react-select/dist/react-select.css";

import { Table, Form, Divider,  Input  } from 'antd';
import {NAME_SINGLE,NAME_PLURAL,REDUCER_NAME, PERM_NAME} from "./Const"
import moment from 'moment';


const CONST_FORMAT_HOUR = 'DD/MM/YYYY HH:mm';

const FormItem = Form.Item;



const expandedRowRender = false;
const showHeader = true;
const footer = false;
const pagination = { position: 'none' };


function goDetailRow(history, obj) {
    history.push(`detail-${NAME_SINGLE}`,{obj:obj});
};

function goUpdateRow(history, obj) {
    history.push(`update-${NAME_SINGLE}`,{obj:obj});
};

function goPageNewForm(history) {
    history.push(`new-${NAME_SINGLE}`);
};


class Page extends Component {
    static propTypes = {
        page: PropTypes.number,
        title: PropTypes.string,
        onChangePage: PropTypes.func,
    }


    columns = [
      {
        title: 'Nombre',
        dataIndex: 'first_name',
        key: 'first_name',
      },
      {
        title: 'Apellido',
        dataIndex: 'last_name',
        key: 'last_name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Status',
        dataIndex: 'approved',
        key: 'approved',
        render: text => {
            return text?"Aprobado":"No Aprobado" ;
        },
      },
      {
        title: 'Rol',
        dataIndex: 'groups',
        key: 'groups',
      },

      { 
        title: 'Accion',
        key: 'action',
        width: 150,
        render: (text, record) => {
          const BtnUpdate = this.props.permissions.wrappers[`editar_${PERM_NAME}`]( ()=>
                             (<a className="dropdown-item" onClick={() => goUpdateRow(this.props.history, record)} >Editar</a>))        
          const BtnEliminar = this.props.permissions.wrappers[`eliminar_${PERM_NAME}`]( ()=>
                             (<a className="dropdown-item" onClick={() => this.onDelete(record)}>Eliminar</a>))
          
          return (
            <div class="dropdown dropdown-default">
              <button className="btn btn-link dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Opciones</button>
                <div className="dropdown-menu dropdown-link">
                  { BtnUpdate ? <BtnUpdate /> :"" }
                  { BtnEliminar ? <BtnEliminar /> :"" }
                </div>
            </div>

        )}
      }
      ];

    state = {
        data : [],
        bordered: false,
        loading: false,
        pagination,
        size: 'middle',
        expandedRowRender,
        title: undefined,
        showHeader,
        footer,
        rowSelection: false,
        scroll: undefined,
      }
    


    componentDidMount() {
        if(this.props.location){
            this.props.onFetch(this.props.location.search);
        }
    };

     onDelete = (row) =>{
        this.setState({ data: this.state.data.filter(item => item !== row) });
        this.props.onDelete(row,row.id);

        if(this.props.location){
            this.props.onFetch(this.props.history.location.search);
        }
    }


    render() {
        const { list_obj, page, onChangePage, history, permissions } = this.props;
        const state = this.state;
        state.data = [];
        let BtnAgregar = null; 
        if(permissions.wrappers){
          BtnAgregar = permissions.wrappers[`agregar_${PERM_NAME}`](() => (
                                                <button 
                                                  className="btn btn-secondary btn-cons pull-right m-b-20" 
                                                  onClick={() => goPageNewForm(history) }
                                                >Nuevo
                                                </button>

          ));
        }

        let show = null;
        if (list_obj.results.length !==0) {
            show = <div className="data-table">
                       <Divider/>
                       <div >
                          <div className="components-table-demo-control-bar">
                          </div>
                          <Table pagination={false}
                          history = {history} {...this.state}
                          rowKey={record => record.id }
                          columns={this.columns}
                          dataSource={list_obj.results}
                          //onRowClick={(record) => goDetailRow(this.props.history, record)}
                          />
                       </div>
                       <Pagination
                          className="pagination col-md-12 p-l-20 m-t-20"
                          showTitle={false}
                          onChange={onChangePage}
                          current={page}
                          total={list_obj.count}
                          showLessItems
                          />
                    </div>;   
        }
        else{
          show = <div className="divPopUp"><h3> No existen {NAME_PLURAL} aún. </h3></div>;   
        }

        return (
            <div>
                {BtnAgregar ? <BtnAgregar/> : ''}
                {show}
            </div>           
        );
    }
}


const mapStateToProps = state => {
    return {
        list_obj: state[REDUCER_NAME],
        permissions: state.Permission
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onDelete: (obj,index) => {
            dispatch(Action.onDelete(obj,index));
        },
        onFetch: (params) => {
            dispatch(Action.onFetch(params));
        },
    }
};

function mapUrlToProps(url, props) {
    return {
        title: decode(UrlQueryParamTypes.string, url.title),
        page: url.page !== null ? Number(url.page) : 1
    };
}

/**
 * Manually specify how to deal with changes to URL query param props.
 * We do this since we are not using a urlPropsQueryConfig.
 */
function mapUrlChangeHandlersToProps(props) {
    return {
        onChangePage: (value) => replaceInUrlQuery('page', value)
    }
}
/**
 * Use the addUrlProps higher-order component to hook-in react-url-query.
 */

export default addUrlProps({ mapUrlToProps, mapUrlChangeHandlersToProps })(connect(mapStateToProps, mapDispatchToProps)(Page));
