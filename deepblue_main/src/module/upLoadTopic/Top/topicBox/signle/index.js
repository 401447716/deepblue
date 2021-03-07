import React, { Component } from 'react'
import './index.scss'
import { Input, Form, Radio, InputNumber, Button } from 'element-react';

class single extends Component {
  constructor () {
    super ()
    this.state = {
      single: {
        defalutNum: 0,
        list: []
      },
      activeName: ['1']
    }
    this.addSingle = this.addSingle.bind(this)
    this.delSingle = this.delSingle.bind(this)
    this.upDateSingle = this.upDateSingle.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
  }
  onChangeSingle(key, value) {
    this.state.single[key] = value;
    this.forceUpdate()
  }
  addSingle () {
    this.state.single.list.push({
      text: '',
      A: '',
      B: '',
      C: '',
      D: '',
      num: this.state.single.defalutNum || 0,
      answer: ''
    })
    this.forceUpdate()
  }
  upDateSingle (index, key, value) {
    this.state.single.list[index][key] = value
    this.forceUpdate()
  }
  delSingle (index) {
    this.state.single.list.splice(index,1)
    this.forceUpdate()
  }
  render () {
    return (
      <div className='single'>
        <p className='title'>单选题</p>
        <div className='indexModule'>
          <span>默认分数:</span>
          <Input size='small' type='number' value={this.state.single.defalutNum} onChange={this.onChangeSingle.bind(this, 'defalutNum')}></Input>
        </div>
        <div className='question'>
          {
            this.state.single.list.map((item, index) => {
              return (
                <div className='questionBox' key={index}>
                  <Form model={item} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label={'第' + (index + 1) + '问'}>
                      <Input value={item.text} onChange={(val) => this.upDateSingle(index, 'text', val)}></Input>
                    </Form.Item>
                    <Form.Item label='选项'>
                      <div className='selectBox'>
                        <span>A</span><Input value={item.A} onChange={(val) => this.upDateSingle(index, 'A', val)} className='inputBox'></Input>
                        <span>B</span><Input value={item.B} onChange={(val) => this.upDateSingle(index, 'B', val)} className='inputBox'></Input>
                        <span>C</span><Input value={item.C} onChange={(val) => this.upDateSingle(index, 'C', val)} className='inputBox'></Input>
                        <span>D</span><Input value={item.D} onChange={(val) => this.upDateSingle(index, 'D', val)} className='inputBox'></Input>
                      </div>
                    </Form.Item>
                    <Form.Item label="答案">
                      <Radio.Group value={item.answer} onChange={(val) => this.upDateSingle(index, 'answer', val)}>
                        <Radio value="A">A</Radio>
                        <Radio value="B">B</Radio>
                        <Radio value="C">C</Radio>
                        <Radio value="D">D</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item label='分数'>
                      <InputNumber
                        defaultValue={item.num}
                        onChange={(val) => this.upDateSingle(index, 'num', val)}
                        min="0" size="small"
                        className="numInput">
                      </InputNumber>
                      <Button size='small' type="danger" className='delBtn' onClick={() => this.delSingle(index)}>删除</Button>
                    </Form.Item>
                  </Form>
                </div>
              )
            })
          }
        </div>
        <Button size='small' type="primary" onClick={this.addSingle}>添加</Button>
      </div>
    )
  }
}

export default single
