import React, { Component } from 'react'
import './index.scss'
import { Input, Form, Checkbox, Radio, InputNumber, Button } from 'element-react';

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
        type: ['1']
      },
      single: {
        defalutNum: 0,
        list: []
      }
    }
    this.addSingle = this.addSingle.bind(this)
  }
  onSubmit(e) {
    e.preventDefault();
  }
  onChange(key, value) {
    this.state.topicSetting[key] = value;
    this.forceUpdate();
  }
  onChangePoints(key, value) {
    this.state.points[key] = value;
    this.forceUpdate();
  }
  onChangeSingle(key, value) {
    this.state.single[key] = value;
    this.forceUpdate();
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
    this.forceUpdate();
  }
  render () {
    return (
      <div className='topicBox'>
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
        <div className='topicSetting'>
          <p className='title'>3、题目设置</p>
          <div className='topicData'>
            {
              this.state.points.type.includes('1') && (
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
                          <div className='questionBox'>
                            <Form model={item} labelWidth="80" onSubmit={this.onSubmit.bind(this)}>
                              <Form.Item label={'第' + (index + 1) + '问'}>
                                <Input></Input>
                              </Form.Item>
                              <Form.Item label='选项'>
                                <Form model={item} labelWidth="80" inline className='selectBox'>
                                  <Form.Item label='A'>
                                    <Input className='inputBox'></Input>
                                  </Form.Item>
                                  <Form.Item label='B'>
                                    <Input className='inputBox'></Input>
                                  </Form.Item>
                                  <Form.Item label='C'>
                                    <Input className='inputBox'></Input>
                                  </Form.Item>
                                  <Form.Item label='D'>
                                    <Input className='inputBox'></Input>
                                  </Form.Item>
                                </Form>
                              </Form.Item>
                              <Form.Item label="答案">
                                <Radio.Group value={item.answer}>
                                  <Radio value="A">A</Radio>
                                  <Radio value="B">B</Radio>
                                  <Radio value="C">C</Radio>
                                  <Radio value="D">D</Radio>
                                </Radio.Group>
                              </Form.Item>
                              <Form.Item label='分数'>
                                <InputNumber
                                  defaultValue={item.num}
                                  // onChange={this.onChangePoints.bind(this, 'all')}
                                  min="0" size="small"
                                  className="numInput">
                                </InputNumber>
                                <Button size='small' type="danger" className='delBtn'>删除</Button>
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
          </div>
        </div>
      </div>
    )
  }
}

export default topicBox
