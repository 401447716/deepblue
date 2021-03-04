import React, { Component } from 'react'
import './index.scss'
import { Input, Alert, Button, InputNumber } from 'element-react'

class fill extends Component {
  constructor () {
    super ()
    this.state = {
      fill: {
        defalutNum: 0,
        list: []
      }
    }
    this.onChangeFill = this.onChangeFill.bind(this)
    this.addFill = this.addFill.bind(this)
    this.delFill = this.delFill.bind(this)
    this.updateFill = this.updateFill.bind(this)
    this.updateFillAnswer = this.updateFillAnswer.bind(this)
  }
  onChangeFill(key, value) {
    this.state.fill[key] = value
    this.forceUpdate()
  }
  addFill () {
    this.state.fill.list.push({
      text: '',
      num: this.state.fill.defalutNum || 0,
      answer: []
    })
    this.forceUpdate()
  }
  delFill (index) {
    this.state.fill.list.splice(index,1)
    this.forceUpdate()
  }
  updateFillText (index, val) {
    this.state.fill.list[index].text = val
    let num = val.split('[-]').length - 1
    if (num < this.state.fill.list[index].answer.length) {
      this.state.fill.list[index].answer.length = num
    } else {
      while(this.state.fill.list[index].answer.length < num) {
        this.state.fill.list[index].answer.push('')
      }
    }
    this.forceUpdate()
  }
  updateFill (index, key, val) {
    this.state.fill.list[index][key] = val
    this.forceUpdate()
  }
  updateFillAnswer (index1, index2, val) {
    this.state.fill.list[index1].answer[index2] = val
    this.forceUpdate()
  }
  render () {
    return (
      <div className='fill'>
        <p className='title'>填空题</p>
        <Alert title="请在合适的地方输入 [-] 创建填空" type="success" closable={false} />
        <div className='indexModule'>
          <span>默认分值:</span>
          <Input size='small' type='number' value={this.state.fill.defalutNum} onChange={this.onChangeFill.bind(this, 'defalutNum')}></Input>
        </div>
        {
          this.state.fill.list.map((item, index) => {
            return (
              <div className='fillBox' key={index}>
                <div className='inputBox'>
                  <span>{index + 1}、</span>
                  <Input value={item.text} onChange={ val => this.updateFillText(index, val) }></Input>
                  <Button size='small' type="danger" onClick={ index => this.delFill(index) }>删除</Button>
                </div>
                {
                  item.answer.map((item2, index2) => {
                    return (
                    <div className='answerBox' key={index + '' + index2}>
                      <span>{index2 + 1}:</span>
                      <Input size='small' className='answerInput' onChange={val => this.updateFillAnswer(index, index2, val)}></Input>
                      <span>分值:</span>
                      <InputNumber
                        defaultValue={+this.state.fill.defalutNum}
                        onChange={(val) => this.updateFill(index, 'num', val)}
                        min="0" size="small"
                        className="numInput">
                      </InputNumber>
                    </div>
                    )
                  })
                }
              </div>
            )
          })
        }
        <Button size='small' type="primary" onClick={this.addFill}>添加</Button>
      </div>
    )
  }
}

export default fill
