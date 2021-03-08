import React, { Component } from 'react'
import './index.scss'
import { Input, InputNumber, Button } from 'element-react';

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
    this.onChangeSubjective = this.onChangeSubjective.bind(this)
    this.addSubjective = this.addSubjective.bind(this)
    this.updateSubjectiveText = this.updateSubjectiveText.bind(this)
    this.updateSubjectiveNum = this.updateSubjectiveNum.bind(this)
    this.delSubjective = this.delSubjective.bind(this)
  }
  onChangeSubjective (key, value) {
    this.state.subjective[key] = value;
    this.forceUpdate()
  }
  updateSubjectiveText (index, val) {
    this.state.subjective.list[index].text = val
    this.forceUpdate()
  }
  updateSubjectiveNum (index, val) {
    this.state.subjective.list[index].num = val
    this.forceUpdate()
  }
  delSubjective (index) {
    this.state.subjective.list.splice(index, 1)
    this.forceUpdate()
  }
  addSubjective () {
    this.state.subjective.list.push({
      text: '',
      num: this.state.subjective.defalutNum
    })
    this.forceUpdate()
  }
  render () {
    return (
      <div className='subjective'>
        <p className='title'>主观题</p>
        <div className='indexModule'>
          <span>默认分数:</span>
          <Input size='small' type='number' value={this.state.subjective.defalutNum} onChange={this.onChangeSubjective.bind(this, 'defalutNum')}></Input>
        </div>
        <div className='question'>
          {
            this.state.subjective.list.map((item, index) => {
              return (
                <div className='questionBox' key={index}>
                  <div className='settingBox'>
                    <span>第{index + 1}题</span>
                    <span>分值：</span>
                    <InputNumber
                      defaultValue={item.num}
                      onChange={(val) => this.updateSubjectiveNum(index, val)}
                      min="0" size="small">
                    </InputNumber>
                  </div>
                  <Input
                    type="textarea"
                    autosize={{ minRows: 3 }}
                    placeholder="请输入题目"
                    value={item.text}
                    onChange={val => this.updateSubjectiveText(index, val) }
                  />
                  <Button size='small' type="danger" onClick={() => this.delSubjective(index)}>删除</Button>
                </div>
              )
            })
          }
        </div>
        <Button size='small' type="primary" onClick={this.addSubjective}>添加</Button>
      </div>
    )
  }
}

export default subjective
