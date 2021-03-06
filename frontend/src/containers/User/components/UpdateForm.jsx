import React from "react";
import {connect} from "react-redux";
import {Action} from "../actions";
import {Action as ActionDiscipline} from "../../Discipline/actions";
import {Action as ActionCategory} from "../../Category/actions";
import {Action as ActionSocioType} from "../../SocioType/actions";
import {Action as ActionRole} from "../../Role/actions";
import { Form,
          Input,
          InputNumber,
          Upload,
          Button,
          Divider,
          Icon,
          message,
          DatePicker,
          Select,
          Checkbox
        } from 'antd';

import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import locale from 'antd/lib/date-picker/locale/es_ES';
import {NAME_PLURAL,URL_NAME_PLURAL,REDUCER_NAME} from "../Const"

const Option = Select.Option;
const {TextArea} = Input;
const CONST_FORMAT_HOUR = 'DD/MM/YYYY HH:mm';
const FormItem = Form.Item;

function goBack(history){
    history.push(`/${URL_NAME_PLURAL}`);
  };


class NormalForm extends React.Component {
  

  componentDidMount() {
    this.props.onFetchRole(('?limit=999'));
    this.props.onFetchAll(('?limit=999'));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let id = this.props.location.state.obj.id;
        this.props.onUpdate(values,id);
        goBack(this.props.history)
      }
    });
  }
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    
    const { getFieldDecorator } = this.props.form;

    let obj = this.props.location.state.obj;

    let { 
        role,
        discipline,
        category,
        socio_type,
         } = [[],[],[],[]];
    let currentRole = "";
    if(this.props.Discipline){
      discipline= this.props.Discipline.results;
    }
    if(this.props.Category){
      category = this.props.Category.results;
    }
    if(this.props.SocioType){
      socio_type = this.props.SocioType.results;
    }
    if(this.props.role.results){
      role= this.props.role.results;
      currentRole = role.find(function(rol) {
        return rol.name ===obj.groups;
      });
      currentRole = currentRole ? currentRole.id: "";
      
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <div className="col-md-12 pull-right m-b-20">
              <button className="btn btn-secondary btn-cons pull-right" htmlType="submit">Actualizar</button>
              <button className="btn btn-link btn-cancel btn-cons pull-right" onClick={() =>goBack(this.props.history)}> Cancelar</button>
          </div>
          <Divider/>
          <div className="card card-default t-w-400 margin-auto">
            <div className="login-form card-block">
                <FormItem>
                  {getFieldDecorator('first_name', {
                    rules: [{ required: true, message: 'Este campo es requerido!' }],
                    initialValue: obj.first_name
                  })(
                    <Input placeholder='Nombre' /> 
                 )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('last_name', {
                    rules: [{ required: true, message: 'Este campo es requerido!' }],
                    initialValue: obj.last_name
                  })(
                    <Input placeholder='Apellido' /> 
                 )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true, message: 'Este campo es requerido!' }],
                    initialValue: obj.email
                  })(
                    <Input placeholder='Email' />
                 )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('role', {
                    rules: [{ required: true, message: 'Este campo es requerido!' }],
                    initialValue: currentRole
                  })(
                    <Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder='Roles'>
                      {role.map(function (obj, id) {
                        return <Option value={obj.id}>{obj.name}</Option>;
                      })}
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('approved', )(
                    <Checkbox defaultChecked={obj.approved} >¿Aprobado?</Checkbox>
                 )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('discipline', {initialValue: obj.discipline})(
                    <Select getPopupContainer={triggerNode => triggerNode.parentNode} mode="multiple" placeholder='Disciplinas'>
                      {discipline.map(function (obj, id) {
                        return <Option value={obj.id}>{obj.name}</Option>;
                      })}
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('category', {initialValue: obj.category})(
                    <Select getPopupContainer={triggerNode => triggerNode.parentNode} mode="multiple" placeholder='Categorias'>
                      {category.map(function (obj, id) {
                        return <Option value={obj.id}>{obj.name}</Option>;
                      })}
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('socio_type', {initialValue: obj.socio_type})(
                    <Select getPopupContainer={triggerNode => triggerNode.parentNode} placeholder='Typos de socio'>
                      {socio_type.map(function (obj, id) {
                        return <Option value={obj.id}>{obj.name}</Option>;
                      })}
                    </Select>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('socio_number', {initialValue: obj.socio_number})(
                    <Input placeholder='Numero de socio' />
                 )}
                </FormItem>
              </div>
          </div>
        </Form>
      </div>
    );
  }
}

const UpdateForm = Form.create()(NormalForm);

const mapStateToProps = state => {
    return {
        REDUCER_NAME: state[REDUCER_NAME],
        role: state.Role,
        Discipline: state.Discipline,
        Category: state.Category,
        SocioType: state.SocioType
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAdd: (text) => {
            return dispatch(Action.onAdd(text));
        },
        onFetchRole: (params) => {
            dispatch(ActionRole.onFetch(params));
        },
        onFetchAll: (params) => {
            dispatch(ActionDiscipline.onFetch(params));
            dispatch(ActionCategory.onFetch(params));
            dispatch(ActionSocioType.onFetch(params));
        },
        onUpdate: (obj,id) => {
            return dispatch(Action.update(obj,id));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);
