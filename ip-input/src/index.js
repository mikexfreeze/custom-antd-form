import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import {Form, Button} from 'antd';
import IpInput from './IpInput.js'

class IpInputForm extends React.Component {
  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({
      ip: '255.255.255.0'
    })
  }
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  
  render() {
    const {getFieldDecorator} = this.props.form;
    
    return (
      <div className="container">
        <Form onSubmit={this.handleSubmit}>
          {getFieldDecorator('ip', {
            rules: [
              {required: true, message: 'Please input your ip!'},
              {
                pattern: /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
                message: 'Please finish your ip!'
              }
            ],
          })(
            <IpInput/>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(IpInputForm);

ReactDOM.render(<WrappedHorizontalLoginForm/>, document.getElementById("root"));
