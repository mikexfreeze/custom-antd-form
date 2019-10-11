/* create by Micheal Xiao 2019/10/11 10:15 */
import React, {Component} from 'react';
import {Input, Col, Row, Form} from "antd";

const blockDict = {
  ablock: 0,
  bblock: 1,
  cblock: 2,
  dblock: 3,
}

export default class IpInput extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ablock: '',
      bblock: '',
      cblock: '',
      dblock: '',
      valiating: false,
    }
  }
  
  initialized = false
  
  hdlInputChange = (e, block) => {
    let ipAdressArr = [this.state.ablock, this.state.bblock, this.state.cblock, this.state.dblock]
    let value = e.target.value
    this.setState({[`${block}block`]: value})
    ipAdressArr[blockDict[block]] = value
    this.props.onChange({target: {value: ipAdressArr.join('.')}})
  }
  
  componentDidUpdate(prevProps) {
    let dataField = this.props["data-__field"]
    
    if(dataField.value !== [this.state.ablock, this.state.bblock, this.state.cblock, this.state.dblock].join('.') && !this.initialized){
      this.initialized = true
      let ipAdressArr = dataField.value.split('.')
      this.setState({
        ablock: ipAdressArr[0],
        bblock: ipAdressArr[1],
        cblock: ipAdressArr[2],
        dblock: ipAdressArr[3],
      })
    }
    
    if(dataField.errors && !prevProps["data-__field"].errors){
      // valitor 函数触发报错
      this.setState({valiating: true})
    }
    if(!dataField.errors && prevProps["data-__field"].errors){
      // valitor 函数触发清除报错
      this.setState({valiating: false})
    }
  }
  
  render() {
    return (
      <div>
        <Row gutter={4}>
          <Col span={6}>
            <FromItemValidatorWarpper valiating={this.state.valiating}>
              <Input value={this.state.ablock} onChange={(e)=>{this.hdlInputChange(e, 'a')}} />
              <span className='quota'>.</span>
            </FromItemValidatorWarpper>
          </Col>
          <Col span={6}>
            <FromItemValidatorWarpper valiating={this.state.valiating}>
              <Input value={this.state.bblock} onChange={(e)=>{this.hdlInputChange(e, 'b')}} />
              <span>.</span>
            </FromItemValidatorWarpper>
          </Col>
          <Col span={6}>
            <FromItemValidatorWarpper valiating={this.state.valiating}>
              <Input value={this.state.cblock} onChange={(e)=>{this.hdlInputChange(e, 'c')}} />
              <span>.</span>
            </FromItemValidatorWarpper>
          </Col>
          <Col span={6}>
            <FromItemValidatorWarpper valiating={this.state.valiating}>
              <Input value={this.state.dblock} onChange={(e)=>{this.hdlInputChange(e, 'd')}} />
            </FromItemValidatorWarpper>
          </Col>
          
        </Row>
      </div>
    );
  }
}

class FromItemValidatorWarpper extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      validateStatus: ''
    }
  }
  
  componentDidMount () {}
  
  componentDidUpdate (prevProps, prevState) {
    if(this.props.valiating && prevProps.validating !== this.props.valiating){
      // form 触发的 validating
      
      let validateStatus = ''
      if(!this.getChildProp("value")){
        validateStatus = 'error'
      }
      if(this.state.validateStatus !== validateStatus){
        this.setState({validateStatus})
      }
      
    }
  }
  
  getChildProp(prop) {
    let child = this.props.children
    if(Array.isArray(this.props.children)){
      child = this.props.children[0]
    }
    return child && child.props && child.props[prop];
  }
  
  render() {
    return (
      <Form.Item
        validateStatus={this.state.validateStatus}
      >
        {this.props.children}
      </Form.Item>
    )
  }
}

