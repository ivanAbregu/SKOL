import React from "react";
import {connect} from "react-redux";
import {Action} from "../actions";
import { Form, Input, Divider, DatePicker, Checkbox} from 'antd';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import {URL_NAME_PLURAL,REDUCER_NAME} from "../Const"
import locale from 'antd/lib/date-picker/locale/es_ES';
const FormItem = Form.Item;
const formatDate = 'DD/MM/YYYY';

function goBack(history){
    history.push(`/${URL_NAME_PLURAL}`);
  };


class NormalForm extends React.Component {
  

  componentDidMount() {
    this.getValueBySelect();
  }

  state = {
    dataBySelect: [],
  };

  getValueBySelect() {
    let objects = [];
   
    fetch("/api/permissions/?limit=999", {  })
      .then(response => {
        return response.json();
      }).then(data => {
        objects = data.results

        this.setState({
          dataBySelect: objects,
        });
      });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAdd(values)
        //this.props.onAdd({...values,end_date:values.end_date.format("YYYY-MM-DDTHH:mm:ss.SSS")});
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

    return (

	    <div>
        <Form onSubmit={this.handleSubmit}>
          <div className="col-md-12 pull-right m-b-20">
              <button className="btn btn-secondary btn-cons pull-right" htmlType="submit">Crear</button>
              <button className="btn btn-link btn-cancel btn-cons pull-right" onClick={() =>goBack(this.props.history)}> Cancelar</button>
          </div>
          <Divider/>
          <div className="card card-default t-w-400 margin-auto">
            <div className="login-form card-block">
              <FormItem label="Nombre">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Este campo es requerido!' }],
                    })(
                      <Input placeholder='Nombre' /> 
                  )}
              </FormItem>
              <FormItem label="Descripcion">
                  {getFieldDecorator('description')(
                      <Input.TextArea 
                        autosize={{ minRows: 2, maxRows: 6 }}
                        placeholder='Descripcion' /> 
                  )}
              </FormItem>
              <FormItem label="Fecha Fin">
                  {getFieldDecorator('end_date', {
                      rules: [{ required: true, message: 'Este campo es requerido!' }],
                  })(
                      <DatePicker
                        getCalendarContainer={triggerNode => triggerNode} 
                        locale={locale}
                        placeholder="Fecha Fin" 
                        format={formatDate}
                        //value={startValue}
                      />
                  )}
              </FormItem>
              <FormItem >
                {getFieldDecorator('done',{valuePropName: 'checked',
                            initialValue: false,})(
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

const NewForm = Form.create()(NormalForm);

const mapStateToProps = state => {
    return {
        REDUCER_NAME: state[REDUCER_NAME],
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAdd: (text) => {
            return dispatch(Action.onAdd(text));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewForm);