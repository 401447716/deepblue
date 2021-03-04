import React, { Component } from 'react'
import './index.scss'
import { Input, Form, Checkbox, Radio, InputNumber, Button, Collapse } from 'element-react';
import Signle from './signle/index'
import Multiple from './multiple/index'
import Fill from './fill/index'

class topicBox extends Component {
  constructor () {
    super ()
    this.state = {
      topicSetting: {
        name: '',
        type: '',
        desc: '',
        setTime: '1',
        time: 60,
        share: ''
      },
      points: {
        haveLimit: '1',
        all: 100,
        type: ['3']
      },
      single: {
        defalutNum: 0,
        list: []
      },
      activeName: ['3']
    }
    this.addSingle = this.addSingle.bind(this)
    this.delSingle = this.delSingle.bind(this)
    this.upDateSingle = this.upDateSingle.bind(this)
  }
  onSubmit(e) {
    e.preventDefault()
  }
  onChange(key, value) {
    this.state.topicSetting[key] = value;
    this.forceUpdate()
  }
  onChangePoints(key, value) {
    this.state.points[key] = value;
    this.forceUpdate()
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
      <div className='topicBox'>
        <Collapse value={this.state.activeName} onChange={ (val) => this.state.activeName = val }>
          <Collapse.Item title="题目设置" name="1">
            <div className='top'>
              <p className='title'>1、题目设置</p>
              <Form model={this.state.topicSetting} labelWidth="80" onSubmit={this.onSubmit.bind(this)} className='settingBox'>
                <Form.Item label="题目名称">
                  <Input value={this.state.topicSetting.name} onChange={this.onChange.bind(this, 'name')}></Input>
                </Form.Item>
                <Form.Item label="题目类型">
                    <Radio.Group value={this.state.topicSetting.type} onChange={this.onChange.bind(this, 'type')}>
                      <Radio value='1'>公共基础</Radio>
                      <Radio value="2">计算机</Radio>
                      <Radio value="3">高等数学</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="简要描述">
                  <Input value={this.state.topicSetting.desc} onChange={this.onChange.bind(this, 'desc')}></Input>
                </Form.Item>
                <Form.Item label="时间限制">
                    <Radio.Group value={this.state.topicSetting.setTime} onChange={this.onChange.bind(this, 'setTime')}>
                      <Radio value="1">不限时</Radio>
                      <Radio value="2">限时</Radio>
                    </Radio.Group>
                    <InputNumber
                      defaultValue={this.state.topicSetting.time}
                      onChange={this.onChange.bind(this, 'setTime')}
                      min="0" size="small" disabled={this.state.topicSetting.setTime==='1'}
                      className="timeInput">
                    </InputNumber>
                    <span> (单位：分钟)</span>
                </Form.Item>
                <Form.Item label="分享设置">
                    <Radio.Group value={this.state.topicSetting.share} onChange={this.onChange.bind(this, 'share')}>
                      <Radio value="1">公共</Radio>
                      <Radio value="2">独立</Radio>
                    </Radio.Group>
                </Form.Item>
              </Form>
            </div>
          </Collapse.Item>
          <Collapse.Item title="题型设置" name="2">
            <div className='topicTypeSetting'>
              <p className='title'>2、题型设置</p>
              <Form model={this.state.points} labelWidth="80" onSubmit={this.onSubmit.bind(this)} className='settingBox'>
                <Form.Item label="分数上限">
                  <Radio.Group value={this.state.points.haveLimit} onChange={this.onChangePoints.bind(this, 'haveLimit')}>
                    <Radio value="1">无上限</Radio>
                    <Radio value="2">有上限</Radio>
                  </Radio.Group>
                  <InputNumber
                    defaultValue={this.state.points.all}
                    onChange={this.onChangePoints.bind(this, 'all')}
                    min="0" size="small" disabled={this.state.points.haveLimit==='1'}
                    className="numInput">
                  </InputNumber>
                </Form.Item>
                <Form.Item label="题型">
                    <Checkbox.Group value={this.state.points.type} onChange={this.onChangePoints.bind(this, 'type')}>
                      <Checkbox value='1'>单选题</Checkbox>
                      <Checkbox value='2'>多选题</Checkbox>
                      <Checkbox value='3'>填空题</Checkbox>
                      <Checkbox value='4'>主观题</Checkbox>
                    </Checkbox.Group>
                </Form.Item>
              </Form>
            </div>
          </Collapse.Item>
          <Collapse.Item title="题目设置" name="3">
            <div className='topicSetting'>
              <p className='title'>3、题目设置</p>
              { this.state.points.type.includes('1') && <Signle /> }
              { this.state.points.type.includes('2') && <Multiple /> }
              { this.state.points.type.includes('3') && <Fill /> }
            </div>
          </Collapse.Item>
        </Collapse>
      </div>
    )
  }
}

export default topicBox
