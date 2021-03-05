import React, { Component } from 'react'
import './index.scss'
// import { Input, Form, Checkbox, Radio, InputNumber, Button } from 'element-react';

class subjective extends Component {
  constructor () {
    super ()
    this.state = {
      subjective: {
        defalutNum: 0,
        list: []
      },
      activeName: ['1']
    }
  }
  render () {
    return (
      <div>主观题</div>
    )
  }
}

export default subjective
