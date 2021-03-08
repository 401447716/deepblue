import React, { Component } from 'react'
import './index.scss'
import { Input, Form, Checkbox, InputNumber, Button } from 'element-react';

class multiple extends Component {
  constructor () {
    super ()
    this.state = {
      multiple: {
        defalutNum: 0,
        list: []
      },
      activeName: ['1']
    }
    this.addMultiple = this.addMultiple.bind(this)
    this.delMultiple = this.delMultiple.bind(this)
    this.upDateMultiple = this.upDateMultiple.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
  }
  onChangeMultiple(key, value) {
    this.state.multiple[key] = value;
    this.forceUpdate()
  }
  addMultiple () {
    this.state.multiple.list.push({
      text: '',
      A: '',
      B: '',
      C: '',
      D: '',
      num: this.state.multiple.defalutNum || 0,
      answer: []
    })
    this.forceUpdate()
  }
  upDateMultiple (index, key, value) {
    this.state.multiple.list[index][key] = value
    this.forceUpdate()
  }
  delMultiple (index) {
    this.state.multiple.list.splice(index,1)
    this.forceUpdate()
  }
  render () {
    return (
      <div className='multiple'>
        <p className='title'>多选题</p>
        <div className='indexModule'>
          <span>默认分数:</span>
          <Input size='small' type='number' value={this.state.multiple.defalutNum} onChange={this.onChangeMultiple.bind(this, 'defalutNum')}></Input>
        </div>
        <div className='question'>
          {
            this.state.multiple.list.map((item, index) => {
              return (
                <div className='questionBox' key={index}>
                  <Form model={item} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                    <Form.Item label={'第' + (index + 1) + '问'}>
                      <Input value={item.text} onChange={(val) => this.upDateMultiple(index, 'text', val)}></Input>
                    </Form.Item>
                    <Form.Item label='选项'>
                      <div className='selectBox'>
                        <span>A</span><Input value={item.A} onChange={(val) => this.upDateMultiple(index, 'A', val)} className='inputBox'></Input>
                        <span>B</span><Input value={item.B} onChange={(val) => this.upDateMultiple(index, 'B', val)} className='inputBox'></Input>
                        <span>C</span><Input value={item.C} onChange={(val) => this.upDateMultiple(index, 'C', val)} className='inputBox'></Input>
                        <span>D</span><Input value={item.D} onChange={(val) => this.upDateMultiple(index, 'D', val)} className='inputBox'></Input>
                      </div>
                    </Form.Item>
                    <Form.Item label="答案">
                      <Checkbox.Group value={item.answer} onChange={(val) => this.upDateMultiple(index, 'answer', val)}>
                        <Checkbox value='A'>A</Checkbox>
                        <Checkbox value='B'>B</Checkbox>
                        <Checkbox value='C'>C</Checkbox>
                        <Checkbox value='D'>D</Checkbox>
                      </Checkbox.Group>
                    </Form.Item>
                    <Form.Item label='分数'>
                      <InputNumber
                        defaultValue={item.num}
                        onChange={(val) => this.upDateMultiple(index, 'num', val)}
                        min="0" size="small"
                        className="numInput">
                      </InputNumber>
                      <Button size='small' type="danger" className='delBtn' onClick={() => this.delMultiple(index)}>删除</Button>
                    </Form.Item>
                  </Form>
                </div>
              )
            })
          }
        </div>
        <Button size='small' type="primary" onClick={this.addMultiple}>添加</Button>
      </div>
    )
  }
}

export default multiple
