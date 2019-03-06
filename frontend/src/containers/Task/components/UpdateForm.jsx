import React from "react";
import {connect} from "react-redux";
import {Action} from "../actions";
import { Form, Input, Divider, DatePicker, Checkbox} from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import locale from 'antd/lib/date-picker/locale/es_ES';
import {URL_NAME_PLURAL,REDUCER_NAME} from "../Const"
import moment from 'moment';
const FormItem = Form.Item;
const formatDate = 'DD/MM/YYYY';


moment.locale('es_ES') // returns the new locale, in this case 'de'

function goBack(history){
    history.push(`/${URL_NAME_PLURAL}`);
  };


class NormalForm extends React.Component {
  

  componentDidMount() {
    //this.getValueBySelect();
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
    let {obj} = this.props.location.state;
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
                <FormItem label="Nombre">
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: 'Este campo es requerido!' }],
                      initialValue: obj.name
                      })(
                        <Input placeholder='Nombre' /> 
                    )}
                </FormItem>
                <FormItem label="Descripcion">
                  {getFieldDecorator('description',{initialValue: obj.description})(
                      <Input.TextArea 
                        autosize={{ minRows: 2, maxRows: 6 }}
                        placeholder='Descripcion' /> 
                  )}
              </FormItem>
              <FormItem label="Fecha Fin">
                  {getFieldDecorator('end_date', {
                      rules: [{ required: true, message: 'Este campo es requerido!' }],
                      initialValue:moment(obj.end_date)})(
                      <DatePicker
                        getCalendarContainer={triggerNode => triggerNode} 
                        locale={locale}
                        placeholder="Fecha Fin" 
                        format={formatDate}
                      />
                  )}
              </FormItem>
              <FormItem >
                {getFieldDecorator('done',{ 
                  valuePropName: 'checked',
                  initialValue: obj.done,})(
                  
                  <Checkbox>¿Realizada?</Checkbox>
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
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUpdate: (obj,id) => {
            return dispatch(Action.update(obj,id));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm);